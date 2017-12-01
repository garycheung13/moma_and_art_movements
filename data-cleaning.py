import pandas
import re
artworks = pandas.read_csv("Artworks.csv")
# artworks = pandas.read_csv("Artwoks.csv")
# artworks_a = filter()
artworks_100 = artworks.head(100)
# print artworks_100
# print artworks_100['Date'].value_counts()

# def clean_split_dates(row):
#     # Initial date contains the current value for the Date column
#     initial_date = str(row['Date'])
#
#     # Split initial_date into two elements if "-" is found
#     split_date = initial_date.split('-')
#     # If a "-"  is found, split_date will contain a list with at least two items
#     if len(split_date) > 1:
#         final_date = split_date[0]
#     # If no "-" is found, split_date will just contain 1 item, the initial_date
#     else:
#         final_date = initial_date
#
#     return final_date
#
# def clean_c_dates(row):
#     # Initial date contains the current value for the Date column
#     initial_date = str(row['Date'])
#
#     # Split initial_date into two elements if "-" is found
#     split_date = initial_date.split(' ')
#
#     # If a "-"  is found, split_date will contain a list with at least two items
#     if len(split_date) > 1:
#         final_date = split_date[1]
#     # If no "-" is found, split_date will just contain 1 item, the initial_date
#     else:
#         final_date = initial_date
#
#     return final_date
#
# def clean_split_dates_2(row):
#     # Initial date contains the current value for the Date column
#     initial_date = str(row['Date'])
#
#     # Split initial_date into two elements if "-" is found
#     split_date = initial_date.split('/')
#
#     # If a "-"  is found, split_date will contain a list with at least two items
#     if len(split_date) > 1:
#         final_date = split_date[0]
#     # If no "-" is found, split_date will just contain 1 item, the initial_date
#     else:
#         final_date = initial_date
#
#     return final_date

def clean_c_dates_2(row):
    # Initial date contains the current value for the Date column
    initial_date = str(row['Date'])
    # .*([1-3][0-9]{3})
    temp = re.match(r'.*([1-3][0-9]{3})',initial_date)
    if temp is not None:
        final_date = temp.group(1)
    else:
        final_date = "unreplaceable"
    return final_date
# Assign the results of "clean_split_dates" to the 'Date' column.
# We want Pandas to go row-wise so we set "axis=1". We would use "axis=0" for column-wise.
# artworks['Date'] = artworks.apply(lambda row: clean_split_dates(row), axis=1)
# artworks['Date'] = artworks.apply(lambda row: clean_split_dates_2(row), axis=1)
# artworks['Date'] = artworks.apply(lambda row: clean_c_dates(row), axis=1)
artworks['Date'] = artworks.apply(lambda row: clean_c_dates_2(row), axis=1)
# print artworks['Date'].value_counts()
# print artworks
artworks.to_csv('Artworks_temp.csv',encoding="utf-8-sig")
