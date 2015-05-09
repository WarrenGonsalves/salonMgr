#!/usr/bin/python

import csv
import urllib

#BASE_URL = "http://localhost:5000"
BASE_URL = "http://Bumblebee-champitest.rhcloud.com"
#BASE_URL = "http://Handz-api.elasticbeanstalk.com"

def upload():

    csvReader = csv.DictReader(open('product.csv',mode='rU'))
    for row in csvReader:
        params = urllib.urlencode(row)
        params.encode('utf16')
        httpPost = urllib.urlopen(BASE_URL + "/admin/data/product",params)
        httpPost.read()
        print(row)

if __name__ == '__main__':
    upload()