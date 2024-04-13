from selenium import webdriver
from selenium.webdriver.common.by import By
import utils
bad_words = []
def no_bad_words(word):
    for w in bad_words:
        if word.find(w) != -1:
            return False
        elif word.find(".pdf") != -1:
            return False
    return True

class my_url():
    
    def __init__(self,url,lvl):
        self.url = url
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
        if murl in self.urls:
            return
        if murl.lvl == self.max:
            return
        print(murl.url)
        self.urls.append(murl)
        self.driver.get(murl.url)
        links = self.driver.find_elements(by=By.TAG_NAME,value='a')
        news = []
        for link in links:
            new_url = link.get_attribute("href")
           
                
            if new_url and no_bad_words(new_url.lower()) and new_url.find("kaspi") != -1:
                # print(new_url)
                news.append(new_url)
        for ni in news:
            new_url = my_url(ni,murl.lvl+1)
            # new_url = link.get_attribute("href")
            if new_url not in self.urls:
                self.parse(new_url)
                self.driver.get(murl.url)
                self.urls.append(new_url)
        self.get_all(murl.url)
        
    def quit(self):
        self.driver.quit()
        
    def get_all(self,url):
        results = utils.find_and_extract_divs(url,self.keyword,self.visited)
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