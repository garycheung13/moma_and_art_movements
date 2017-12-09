with open('moma_with_abbrs.csv') as art_csv:
    f = art_csv.readlines()
    outfile = open("moma_clean.csv", "w")
    for row in f:
        row = ",".join(row.split("\t"))
        outfile.write(row)