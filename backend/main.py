from selenium import webdriver
from selenium.webdriver.common.by import By
import requests
from bs4 import BeautifulSoup
import re
# Create a WebDriver instance (e.g., Chrome)
driver = webdriver.Chrome()

# Navigate to the initial webpage
initial_url = 'https://guide.kaspi.kz/client/ru'
driver.get(initial_url)

# Find all links on the webpage
links = driver.find_elements(by=By.TAG_NAME,value='a')
urls = []
for l in links:
    url = l.get_attribute("href")
    if url and url.startswith(initial_url):
        urls.append(url)
driver.quit()
all_text = []
def get_text(url):
        # print(el.text.strip())
        response = requests.get(url)

# Parse the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')

# Extract and print all text content
        text_content = soup.get_text()
        sentences = re.findall(r'\S+.*?(?=[.!?])', text_content)
        for sentence in sentences:
            if sentence not in all_text and not (sentence == "" or sentence == "/n" or sentence == " "):
                all_text.append(sentence.strip())
get_text(initial_url)
# Iterate through each link
for url in urls:
    # Get the URL of the link
    # url = link.get_attribute('href')
    if url == "https://kaspi.kz/":
        # driver.get(initial_url)
        continue
    # Navigate to the URL
    # driver.get(url)
    
    # Fetch data from the current page (replace this with your data scraping logic)
    get_text(url)
    # Navigate back to the initial webpage to continue looping
    # driver.get(initial_url)

# Close the WebDriver
with open('output.txt', 'w') as file:
    # Write each sentence to the file
    for sentence in all_text:
        file.write(sentence + '.')