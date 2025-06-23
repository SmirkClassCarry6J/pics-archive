import os
import json

BASE_DIR = "Archive"

def scan_directory(path=""):
    """Recursively scans a directory and returns its structure as a nested dictionary."""
    abs_path = os.path.join(BASE_DIR, path)
    
    if os.path.isdir(abs_path):
        items = []
        for item in sorted(os.listdir(abs_path)):
            item_path = os.path.join(abs_path, item)
            if os.path.isdir(item_path):
                items.append({
                    "name": item,
                    "type": "folder",
                    "items": scan_directory(os.path.join(path, item))["items"]
                })
            else:
                items.append({"name": item, "type": "file"})

        return {"type": "folder", "path": path, "items": items}
    
    return None

def generate_json():
    """Generates the file structure and saves it as file-list.json."""
    file_structure = scan_directory("")
    with open("./datasets/file-list.json", "w", encoding="utf-8") as f:
        json.dump(file_structure, f, indent=2)

generate_json()
print("✅ file-list.json has been generated with full recursion!")
