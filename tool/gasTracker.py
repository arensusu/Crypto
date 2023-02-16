import requests
import json
import time

apiKey = ''
api = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=' + apiKey

gasHistory = [0] * 5
count = 0
while (True):
    response = requests.get(api)
    data = json.loads(response.text)
    gasHistory[count % 5] = int(data['result']['ProposeGasPrice'])
    count += 1
    print(max(gasHistory))
    if (count > len(gasHistory)):
        pass
    time.sleep(300)