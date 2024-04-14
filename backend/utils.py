import pymorphy2
from bs4 import BeautifulSoup
import re, requests
def has_same_root(key, text):
    morph = pymorphy2.MorphAnalyzer()
    key_lemma = morph.parse(key)[0].normal_form
    words = text.split()  # Split text into words
    for word in words:
        word_lemma = morph.parse(word)[0].normal_form
        if word_lemma == key_lemma:
            return True
    return False

def find_and_extract_divs(url, keyword, visited):
    """
    Find all divs containing the keyword and extract their text content.
    """
    try:
        html = requests.get(url)
    except:
        return 
    soup = BeautifulSoup(html.text, "html.parser")
    # visited = []
    def recurse(source):
        results = []
        divs = source.find_all("div")
        print(source.url)
        if divs:
            for div in divs:
                if div not in visited:
                # print(div.text)
                    results.extend(recurse(div))
                    visited.append(div)
        else:
            if has_same_root(keyword,source.text):

                # Extract text content recursively from this div and its children
                div_text = source.text
                
                # print(div_text)
                sentences = re.split(r'\n+|\s{2,}', div_text)
                for sentence in sentences:
                    if sentence not in results and not (sentence == "" or sentence == "/n" or sentence == " "):
                        results.append(sentence.strip())
        return results
    return recurse(soup)
