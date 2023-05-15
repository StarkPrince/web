import os

folder_path = r"C:\Users\Administrator\Downloads\Compressed\Photos_2"

for filename in os.listdir(folder_path):
    if os.path.isfile(os.path.join(folder_path, filename)):
        new_filename = "day2_" + filename
        os.rename(os.path.join(folder_path, filename),
                  os.path.join(folder_path, new_filename))
