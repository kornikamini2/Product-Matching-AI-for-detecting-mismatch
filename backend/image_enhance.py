import rembg
from PIL import Image
import os

def remove_background(image_path):
    with open(image_path, "rb") as file:
        image_data = file.read()

    result = rembg.remove(image_data)
    output_path = image_path.replace(".jpg", "_processed.png")

    with open(output_path, "wb") as out_file:
        out_file.write(result)

    return output_path
