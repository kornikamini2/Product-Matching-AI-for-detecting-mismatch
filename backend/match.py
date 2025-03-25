from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch

model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

def match_image_title(image_path):
    image = Image.open(image_path)
    texts = ["Shirt", "Shoes", "Bag", "Watch", "Dress", "Sunglasses"]
    inputs = processor(text=texts, images=image, return_tensors="pt", padding=True)

    with torch.no_grad():
        outputs = model(**inputs)
        logits_per_image = outputs.logits_per_image
        predicted_idx = logits_per_image.argmax().item()

    return texts[predicted_idx]
