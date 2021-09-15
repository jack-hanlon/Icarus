from concurrent.futures import ThreadPoolExecutor, wait
from datetime import datetime, timedelta

import os
import xarray as xr
import numpy as np

def Range_Days(Start_Date, End_Date):
    ''' Creates a list of all the days within the time period provided. '''
    Days = []
    for each in range((End_Date - Start_Date).days + 1):
        Days.append(Start_Date + timedelta(days=each))
    return Days

def DataRequest(Collection):
    ''' Creates a pandas dataframe after requesting the data from OPeNDAP using the dimensions as selection criteria. '''
    URL, Parameter, Latitude, Longitude, Times = Collection
    df = xr.open_dataset(URL).sel(lon=Longitude, lat=Latitude, time=Times, method='nearest')[Parameter]
    return df

# More OPeNDAP URLs and Parameter pairs can be added.
List = [
    ("https://opendap.larc.nasa.gov/opendap/hyrax/POWER/daily/power_801_daily_t2m_lst.nc", "T2M"),
    ("https://opendap.larc.nasa.gov/opendap/hyrax/POWER/daily/power_801_daily_t2m_lst.nc", "T2M_MAX"),
    ("https://opendap.larc.nasa.gov/opendap/hyrax/POWER/daily/power_801_daily_t2m_lst.nc", "T2M_MIN"),
]

Latitude  = np.arange(-39.75,  13, .5) # Edit the regional extent.
Longitude = np.arange(-84.75, -34, .5) # Edit the regional extent.
Times = Range_Days(datetime(1981, 1, 1), datetime(1981, 1, 31))

pool = ThreadPoolExecutor(None)

Futures = []
for URL, Parameter in List:
    Collection = (URL, Parameter, Latitude, Longitude, Times)
    Futures.append(pool.submit(DataRequest, Collection))

wait(Futures)

df = xr.merge([Future.result() for Future in Futures])

Output = r'' # if none the location of the script is where the files will be outputted.
df.to_netcdf(path=os.path.join(Output, "FileName.nc"))
