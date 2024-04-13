import re
with open('output.txt', 'r') as file:
    # Read all the text from the file
    text = file.read()
sentences = re.findall(r'\S+.*?(?=[.!?])', text)
for s in sentences:
    print(s)