from celery import Celery, Task
import requests
from celery.signals import worker_process_init, worker_process_shutdown
from bs4 import BeautifulSoup
import logging
import redis
from celery.utils.log import get_task_logger
import pickle
import lzma
import json
import re
import utils
from celery.schedules import crontab
import openai

class BaseTaskWithRetry(Task):
    autoretry_for = (Exception,)
    max_retries = 0
    retry_backoff = True
    retry_backoff_max = 10
    retry_jitter = True

class BaseTaskWithInfRetry(Task):
    autoretry_for = (Exception,)
    max_retries = None
    retry_backoff = True
    retry_backoff_max = 10
    retry_jitter = True
    rate_limit = '10/s'


redis_db = 1
app = Celery('bts_tasks')
app.conf.broker_url = f'redis://127.0.0.1:6379/{redis_db}'
app.conf.result_backend = f'redis://127.0.0.1:6379/{redis_db}'
app.conf.result_backend_transport_options = {
    'retry_policy': {
       'timeout': 5.0
    }
}
app.conf.broker_transport_options = {
    'priority_steps': list(range(4)),
    'sep': ':',
    'queue_order_strategy': 'priority',
}
app.conf.task_default_priority = 5
app.conf.task_default_queue = 'tasks_photos'
app.conf.result_expires = 60
app.conf.task_compression = 'brotli'
app.conf.beat_schedule = {
    "every day at 6 AM": {
        "task": "queueing",
        "schedule": crontab(hour='6', minute=0,)
    }
}

logger = get_task_logger(__name__)

bloom_filter_key = "bts-visited"
redis_client = None

keyword = "бонусы"


# base_url = "https://www.nsopw.gov"

headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'ru',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Origin': 'https://www.missingkids.org',
    'Pragma': 'no-cache',
    'Referer': 'https://www.missingkids.org/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
}

def ifnull(var, val):
    if var is None:
        return val
    return var

@worker_process_init.connect
def init_worker(**kwargs):
    global redis_client
    pool = redis.ConnectionPool(host="127.0.0.1", port=6379, db=redis_db)
    redis_client = redis.Redis(connection_pool=pool)



@app.task(bind=True, ignore_result=True, base=BaseTaskWithRetry)
def select_banks(self):
    for url in [
        "https://guide.kaspi.kz/client/ru",
    ]:
        redis_client.rpush('urls', lzma.compress(pickle.dumps((url, 0))))
        redis_client.execute_command("BF.ADD %s %s" % (bloom_filter_key, url))
    
    # search.apply_async((url, 0), compression='brotli', priority=3)

def checklink(url):
    if url and url.find("guide.kaspi.kz") != -1 and url.find('shop') == -1:
        return True
    return False


@app.task(bind=True, ignore_result=True)
def queueing(self, ):
    redis_client.flushdb()
    for url, bank in [
        ("https://guide.kaspi.kz/client/ru", "kaspi"),
        # ('https://jusan.kz/faq/bank/cashback-bonus/bon-prog/2459', 'jusan')
    ]:
        redis_client.rpush('urls', lzma.compress(pickle.dumps((url, 0))))
        redis_client.execute_command("BF.ADD %s %s" % (bloom_filter_key, url))
        while (redis_client.scard('current')>0 or redis_client.llen('urls')>0):
            if redis_client.llen('urls') > 0:
                url, depth = pickle.loads(lzma.decompress(redis_client.lpop('urls')))
                if checklink(url):
                    redis_client.sadd('current', url)
                    search.apply_async((url, depth), compression='brotli', priority=3)
        logger.info(f"{bank} DONE")
        prompt(bank)
        redis_client.delete('all_text')

def prompt(bank):
    all_text = ''
    while (redis_client.llen('all_text') > 0):
        x = pickle.loads(lzma.decompress(redis_client.lpop('all_text')))
        print(x)
        all_text += x
        all_text += '\n'
    logger.info(f"{bank} CASH")
    with open(f'{bank}_cashbacks.txt', 'w', encoding='utf-8') as f:
        f.write(all_text)
        # json.dump(all_text, f, ensure_ascii=False, indent=4)
    messages = [ {"role": "system", "content":  
              "You will be given a russian FAQ page about a cashback system of {bank} Bank. FAQ may be poorly structured. If cashback category is undefined, make a copies of this cashback with all categories. Your task is to parse information in form of json file. "},
              {"role": "system", "content":""" this is the example json:
              {[
                {"bank": "Jusan",
                "category":"Такси",
                "category_mcc": "4121",
                "category_description":"Услуги по транспортировке пассажиров в автомобилях и службах такси.",
                "cashback_offers": [
                    {
                        "requirement": "",
                        "cashback_value": "7%"
                    },
                    {
                        "requirement": "Elite card",
                        "cashback_value": "15%"
                    }
                ]}
              ]}
              """}]


@app.task(bind=True, ignore_result=True, base=BaseTaskWithRetry)
def search(self, url, depth):
    r = requests.get(url, headers=headers, verify=False)
    if r.status_code == 404:
        logger.error(f"{zip}  not found")
        return False
    if r.status_code != 200:
        logger.error(f"response code {r.status_code}, {url}")
        # self.retry()
    soup = BeautifulSoup(r.text, features='html.parser')
    logger.info(f"{depth} on {url}")
    recurse(soup, url)
    if (depth == 3):
        redis_client.srem('current', url)
        return 1
    for a in soup.select('a'):
        link = a.get('href')
        if redis_client.execute_command("BF.EXISTS %s %s" % (bloom_filter_key, link)) == 0:
            redis_client.rpush('urls', lzma.compress(pickle.dumps((link, depth+1))))
            redis_client.execute_command("BF.ADD %s %s" % (bloom_filter_key, link))
    redis_client.srem('current', url)
    return 1

def recurse(soup, url):
    divs = soup.find_all("div", recursive=False)
    if divs:
        for div in divs:
                recurse(div, url)
    else:
        div_text = soup.get_text()
        logger.info(f"recurs {url}-> {div_text[:50]}")
        if has_same_root(keyword,div_text):
            sentences = re.split(r'\n+|\s{2,}', div_text)
            for sentence in sentences:
                if sentence and not (sentence == "" or sentence == "/n" or sentence == " "):
                    redis_client.rpush('all_text', lzma.compress(pickle.dumps(sentence.strip())))
    return

# import pymorphy2
def has_same_root(key, text):
    # morph = pymorphy2.MorphAnalyzer()
    # key_lemma = morph.parse(key)[0].normal_form
    words = text.split()  # Split text into words
    for word in words:
        if word.find('бонус') != -1 or word.find('Бонус') != -1:
            return True
        # word_lemma = morph.parse(word)[0].normal_form
        # if word_lemma == key_lemma:
        #     return True
    return False
