import json
import pandas as pd
output = {}
output['name']='summary'
output['data']=[]
artfile = pd.read_csv('moma_clean.csv')
artfile['countries_with_abbv']=list(zip(artfile.Country,artfile.Abbreviation))
impressionism = artfile.query('1865<=Date<=1914')
cubism = artfile.query('1907<=Date<=1922')
bauhaus = artfile.query('1919<=Date<=1933')
surrealism = artfile.query('1924<=Date<=1942')
abstract = artfile.query('1940<=Date<1960')
pop = artfile.query('1950<=Date<1970')
minimalism = artfile.query('1960<=Date<=1970')
photorealism = artfile.query('1970<Date<=2000')

def makeClassifyDict(era):
    result = []
    classify_dict= era['Classification'].unique()
    classify_count = era['Classification'].value_counts().to_dict()
    for key in classify_dict:
        temp_dict = {}
        temp_dict['name'] = key
        temp_dict['count'] = classify_count[key]
        result.append(temp_dict)
    return result

def makeCountriesDict(era):
    result = []
    country_dict = era['countries_with_abbv'].value_counts().to_dict()
    for key in country_dict.keys():
        temp_dict={}
        temp_dict['name']=key[0]
        temp_dict['abbr']=key[1]
        temp_dict['count']=country_dict[key]
        result.append(temp_dict)
    return result


output['data'].append({'tag':'Impressionism','countries':makeCountriesDict(impressionism),'classification':makeClassifyDict(impressionism)})
output['data'].append({'tag':'Cubism','countries':makeCountriesDict(cubism),'classification':makeClassifyDict(cubism)})
output['data'].append({'tag':'Bauhaus','countries':makeCountriesDict(bauhaus),'classification':makeClassifyDict(bauhaus)})
output['data'].append({'tag':'Surrealism','countries':makeCountriesDict(surrealism),'classification':makeClassifyDict(surrealism)})
output['data'].append({'tag':'Abstract','countries':makeCountriesDict(abstract),'classification':makeClassifyDict(abstract)})
output['data'].append({'tag':'Pop','countries':makeCountriesDict(pop),'classification':makeClassifyDict(pop)})
output['data'].append({'tag':'Minimalism','countries':makeCountriesDict(minimalism),'classification':makeClassifyDict(minimalism)})
output['data'].append({'tag':'Photorealism','countries':makeCountriesDict(photorealism),'classification':makeClassifyDict(photorealism)})

with open('era_json.json', 'w') as outfile:
     json.dump(output, outfile, sort_keys = True, indent = 4,ensure_ascii = False)
