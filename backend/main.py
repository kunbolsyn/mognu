import scrapper
keyword = "бонус"
file_name = "text.json"
url = "https://kaspi.kz/"
scr = scrapper.Scrapper(keyword)
urli = scrapper.my_url(url,0)
scr.parse(urli)
scr.quit()
scr.json(file_name)
