from selenium import webdriver
from selenium.webdriver.common.by import By
import utils
from bs4 import BeautifulSoup
import re, requests
bad_words = ["signin","register","login","pay","job"]
def no_bad_words(word):
    for w in bad_words:
        if word.find(w) != -1:
            return False
        elif word.find(".pdf") != -1:
            return False
    return True

class my_url():
    
    def __init__(self,url1,lvl):
        self.url = url1
        self.lvl = lvl
        
class Scrapper():
    def __init__(self,keyword):
        self.driver = webdriver.Chrome()
        self.all_text = []
        self.keyword = "бонус"
        self.urls = []
        self.visited = []
        self.max = 4
    def parse(self,murl):
        if murl.url in self.urls:
            return
        if murl.lvl == self.max:
            print(murl.lvl,murl.url)
            return
        # print(murl.url)
        self.urls.append(murl.url)
        self.driver.get(murl.url)
        links = self.driver.find_elements(by=By.TAG_NAME,value='a')
        news = []
        for link in links:
            new_url = link.get_attribute("href")        
            if new_url and no_bad_words(new_url.lower()) and new_url.find("kaspi") != -1:
                if new_url not in self.urls:
                # print(new_url)
                    news.append(my_url(new_url,murl.lvl+1))
        # for n in news:
        #     print(n.url, n.lvl)
        # return
        print(len(news))
        for i, newurl in enumerate(news):
            # newurl = my_url(ni,murl.lvl+1)
            # new_url = link.get_attribute("href")
            
            self.parse(newurl)
            
            self.driver.get(murl.url)
            
            self.urls.append(newurl.url)
            print(murl.url,i)
        self.get_all(murl.url)
    def parsing(self, initial_url):
        def find_links(lvl):
            links = self.driver.find_elements(by=By.TAG_NAME,value='a')
            new_urls = []
            for link in links:
                if link:
                    new_url = link.get_attribute("href")
                    if new_url and no_bad_words(new_url.lower()) and new_url.find("kaspi") != -1:
                        if new_url not in self.urls:
                            new_urls.append(my_url(new_url,lvl+1))
            return new_urls
        queue = [initial_url]

        while queue:
            url = queue.pop(0)
            if url.url in self.urls or url.lvl == 4:
                continue
            self.urls.append(url.url)
            self.driver.get(url.url)
            urls = find_links(url.lvl)
            if urls:
                queue.extend(urls)
            self.get_all(url.url)

        
    def quit(self):
        self.driver.quit()
        
    def get_all(self,url):
        # print(url)
        results = self.find_and_extract_divs(url,self.keyword)
        if results:
            self.all_text.extend(results)
    def json(self,file_name):
        import json
        with open(file_name, 'w', encoding='utf-8') as f:
            json.dump(self.all_text, f, ensure_ascii=False, indent=4)
    
    def reset(self):
        self.urls = []
        self.all_text = []
        self.visited = []
    def find_and_extract_divs(self,url, keyword):
        # divs = self.driver.find_elements(By.TAG_NAME,"div")
        # divs[0].text
        # self.driver.
        # visited = []
        # print(soup.url, 8)
        
        def recurse(source):
            results = []
            divs = source.find_elements(By.TAG_NAME,"div")
            # print(source.url)
            if divs:
                for div in divs:
                    if div not in self.visited:
                    # print(div.text)
                        results.extend(recurse(div))
                        self.visited.append(div)
            else:
                if utils.has_same_root(keyword,source.text):

                    # Extract text content recursively from this div and its children
                    div_text = source.text

                    # print(div_text)
                    sentences = re.split(r'\n+|\s{2,}', div_text)
                    for sentence in sentences:
                        if sentence not in results and not (sentence == "" or sentence == "/n" or sentence == " "):
                            results.append(sentence.strip())
            return results
        return recurse(self.driver)