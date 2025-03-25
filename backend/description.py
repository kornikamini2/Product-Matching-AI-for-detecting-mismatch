from transformers import pipeline

# Load Meta's LLaMA 2 for text generation
generator = pipeline("text-generation", model="meta-llama/Llama-2-7b-chat-hf")

def generate_description(product_title):
    prompt = f"Write an attractive e-commerce description for a {product_title}."
    result = generator(prompt, max_length=50, num_return_sequences=1)
    return result[0]["generated_text"]
