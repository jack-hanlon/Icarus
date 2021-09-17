import os, json, requests
import matplotlib.pyplot as plt

base_url = r"https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,T2MDEW,T2MWET,TS,T2M_RANGE,T2M_MAX,T2M_MIN&community=RE&longitude={longitude}&latitude={latitude}&start=20150101&end=20150305&format=JSON"

class ApiCall():
    def __init__(self,lon = 32.929, lat=-95.770):
        self.lon = lon
        self.lat = lat
                
    def fetch_data(self):
        '''Makes a req to api returns dict'''
        api_req_url = base_url.format(longitude=self.lon, latitude=self.lat)
        response = requests.get(url=api_req_url, verify= True, timeout=45.00)
        content = json.loads(response.content.decode('utf-8'))
        
        return content

    def unpack_data(self):
        '''looks at the dict obtained from api call, extract temp data + dates'''
        raw_data = self.fetch_data()
        temp_data = list(raw_data['properties']['parameter']['T2M'].values())
        dates = list(raw_data['properties']['parameter']['T2M'].keys())
        return temp_data, dates
    
    
