import redis 
import json
port = 6379
redis_client = redis.Redis(host='localhost', port=port, decode_responses=True)

# Retrieve offer names from Redis
offer_names = redis_client.lrange('offers', 0, -1)

# Retrieve offer details from Redis and convert to JSON format
json_list = []
for offer_name in offer_names:
    offer_details_json = json.dumps(redis_client.get(offer_name))
    if offer_details_json:
        json_list.append(offer_details_json.decode('utf-8'))

# Output the JSON list
print(json.dumps(json_list))