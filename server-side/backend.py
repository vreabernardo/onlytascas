from flask import Flask, request, jsonify
import json
from flask_cors import CORS
from dotenv import load_dotenv
import os
from geopy.geocoders import Nominatim
import requests


# api key os.getenv('API_KEY')

def configure():
    load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route('/makeMap', methods=['POST'])
def makeMap():
    print("Request received")
    request_data = request.get_data()
    json_data = json.loads(request_data)
    print("Data received:", json_data)
    
    response_data = getPlaces(json_data['radius'], json_data['nplaces'], json_data['location'], json_data['food'])
    
    #response_data = {'places': [{'location': {'latitude': 38.716191599999995, 'longitude': -9.138308499999999}, 'googleMapsUri': 'https://maps.google.com/?cid=15249334754847528624', 'displayName': {'text': 'The Queen Ale - Craft Beer Bar', 'languageCode': 'es'}}, {'location': {'latitude': 38.709498499999995, 'longitude': -9.1318081}, 'googleMapsUri': 'https://maps.google.com/?cid=16161826482985014755', 'displayName': {'text': 'Crafty Corner', 'languageCode': 'en'}}, {'location': {'latitude': 38.7139252, 'longitude': -9.141045799999999}, 'googleMapsUri': 'https://maps.google.com/?cid=13711079965472434222', 'displayName': {'text': 'The Beer Station', 'languageCode': 'en'}}]}
    new_json = []
    for place in response_data['places']:
        new_json.append([{"lat":place['location']['latitude'], "lng":place['location']['longitude']}, place['displayName']['text'], place['googleMapsUri']])
    return new_json, 200


def get_api_key():
    return os.getenv('API_KEY')

def getPlaces(radius, nplaces, location, foodType):
    try:
        coordinates = get_coordinates(location)
    except:
        return {"error": "invalid location"}
        
    latitude, longitude = coordinates
    textQuery = foodType
    textSearch_endpoint = "https://places.googleapis.com/v1/places:searchText"
    
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": get_api_key(),
        "X-Goog-FieldMask": "places.displayName,places.location,places.googleMapsUri"
    }
    
    data = {
        "textQuery": textQuery,
        "maxResultCount": nplaces,
        "locationBias": {
            "circle": {
                "center": {"latitude": latitude, "longitude": longitude},
                "radius": radius
            }
        }
    }

    response = requests.post(textSearch_endpoint, json=data, headers=headers)
    print("Request sent to Google Places API, status respose:", response.status_code)
    result = response.json()
    print(result)
    return result

def get_coordinates(place_name):
    geolocator = Nominatim(user_agent="Geolocation")
    location = geolocator.geocode(place_name, timeout=1000)
    
    if location:
        return location.latitude, location.longitude
    else:
        return None

if __name__ == '__main__':
    configure()
    app.run(port=5000)


