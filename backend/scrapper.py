from selenium import webdriver
from selenium.webdriver.common.by import By
import utils
from bs4 import BeautifulSoup
import re, requests
bad_words = ["signin","register","shop","login","youtube","pay","job","facebook","instagram","vk","twitter", "linkedin","https://ok.ru/kaspi.kz","ok.ru/kaspi.kz"]
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
from selenium.common.exceptions import StaleElementReferenceException

def is_element_stale(element, driver):
    if element == driver:
        return False
    try:
        # Try to access a property of the element
        _ = element.is_displayed()
        # If successful, the element is not stale
        return False
    except StaleElementReferenceException:
        # If StaleElementReferenceException is raised, the element is stale
        return True

class Scrapper():
    def __init__(self,keyword):
        self.driver = webdriver.Chrome()
        self.all_text = []
        self.keyword = "бонус"
        self.urls = []
        self.visited = []
        self.max = 4
    def parsing(self, initial_url):
        def find_links(lvl):
            links = self.driver.find_elements(by=By.TAG_NAME,value='a')
            new_urls = []
            for link in links:
                    if is_element_stale(link, self.driver):
                        continue
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
        def recurse(source):
            results = []
            if is_element_stale(source, self.driver):
                return
            divs = source.find_elements(By.TAG_NAME,"div")
            # print(source.url)
            if divs:
                for div in divs:
                    if div not in self.visited:
                    # print(div.text)
                        result = recurse(div)
                        if result:
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