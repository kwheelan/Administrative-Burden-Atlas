import csv
import json

def csv2json(csv_file_path, json_file_path):

    # Read the CSV and convert it into a nested dictionary as you described
    data = {}

    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        
        for row in csv_reader:
            # Assuming first column is the state identifier
            state = row['State']
            m_data = {k.split(": ")[1]: v for k, v in row.items() if k.startswith("M:")}
            t_data = {k.split(": ")[1]: v for k, v in row.items() if k.startswith("T:")}
            
            data[state] = {"M": m_data, "T": t_data}

    # Write the nested dictionary to a JSON file
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json_file.write(json.dumps(data, indent=4))