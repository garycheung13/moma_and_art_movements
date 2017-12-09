import pandas as pd

nationality_key = dict()
abbv_key = dict()


with open('demonyms.csv') as csv_file:
    csv_split = csv_file.readlines()
    for row in csv_split:
        row_split = row.split(',')
        nationality_key[row_split[0]] = row_split[1].rstrip()

nationality_key['Russian'] = "Russian Federation"
nationality_key['Costa'] = "Costa Rica"
nationality_key['South'] = "South Africa"
nationality_key['Korean']="Korea, Republic of"

with open('abbrs.csv') as csv_file:
    csv_split = csv_file.readlines()
    for row in csv_split:
        row_split = row.split(',')
        abbv_key[row_split[0]] = row_split[1].rstrip()

# print(abbv_key)


with open("Artworks_working_file.csv") as art_csv:
    outfile = open("moma_with_abbrs.csv", "w")

    csv_split = art_csv.readlines()
    for row in csv_split:
        row_items = row.split(",")
        if row_items[1] in nationality_key:
            if nationality_key[row_items[1]] in abbv_key:
                row = row.rstrip() + "," + nationality_key[row_items[1]]+","+abbv_key[nationality_key[row_items[1]]] + "\n"
        outfile.write(row)
