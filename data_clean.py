import pandas as pd


def clean_split_dates(row):
    # Initial date contains the current value for the Date column
    initial_date = str(row['Date'])

    # Split initial_date into two elements if "-" is found
    split_date = initial_date.split('-')

    # If a "-"  is found, split_date will contain a list with at least two items
    if len(split_date) > 1:
        final_date = split_date[0]
    # If no "-" is found, split_date will just contain 1 item, the initial_date
    else:
        final_date = initial_date

    return final_date


# with open("Artworks.csv", "r") as artwork_csv:
#     df = pd.read_csv(artwork_csv)

#     df['Date'] = df.apply(lambda row: clean_split_dates(row), axis=1)

#     df['Date'] = df['Date'].str.replace(r'\D', '')
#     print(df['Date'].value_counts())

#     df.to_csv('Artworks_new.csv', encoding="utf-8-sig")

with open("Artworks_temp.csv") as artwork_csv:
    df = pd.read_csv(artwork_csv)

    df_clean = df[df['Date'] != "unreplaceable"]
    df_clean.to_csv('Artworks_working_file.csv', encoding="utf-8-sig")