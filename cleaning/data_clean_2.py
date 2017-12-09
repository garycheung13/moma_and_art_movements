import pandas as pd

with open("moma.csv") as artwork_csv:
    df = pd.read_csv(artwork_csv)
    df = df.dropna(how='all')  # remove the trailing empty rows
    df["Nationality"] = df["Nationality"].str.replace(r'\(|\)', '')
    df['Nationality'] = df['Nationality'].str.split().str[0]
    # df.to_csv('Artworks_working_file.csv', encoding="utf-8-sig")

    print(df['Nationality'].value_counts())
