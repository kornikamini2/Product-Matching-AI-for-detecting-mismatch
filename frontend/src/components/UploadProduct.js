import React, { useState } from "react";
import axios from "axios";

const UploadProduct = () => {
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [matchScore, setMatchScore] = useState(null);
    const [description, setDescription] = useState("");

    const handleMatch = async () => {
        if (!title || !imageUrl) {
            alert("Please enter both Product Title and Image URL");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:5000/match", { 
                title, 
                image_url: imageUrl 
            });
            setMatchScore(response.data.match_score);
        } catch (error) {
            console.error("Error checking match:", error);
            alert("Failed to check match. Please try again.");
        }
    };

    const handleDescription = async () => {
        if (!title) {
            alert("Please enter a Product Title");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:5000/generate_description", {
                name: title,
                category: "Clothing",
                sub_category: "Shirt"
            });
            setDescription(response.data.description);
        } catch (error) {
            console.error("Error generating description:", error);
            alert("Failed to generate description. Please try again.");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}>
            <h2>Upload Product</h2>
            <input 
                type="text" 
                placeholder="Product Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                style={{ width: "100%", padding: "8px", margin: "5px 0", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input 
                type="text" 
                placeholder="https://rabanizz.com/wp-content/uploads/2025/01/Maroon_front-1.jpg" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                style={{ width: "100%", padding: "8px", margin: "5px 0", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            {imageUrl && (
                <img 
                    src={imageUrl} 
                    alt="Uploaded Product" 
                    style={{ width: "100%", height: "auto", marginTop: "10px", borderRadius: "5px" }} 
                />
            )}
            <button 
                onClick={handleMatch} 
                style={{ width: "100%", padding: "10px", margin: "10px 0", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
                Check Match
            </button>
            <button 
                onClick={handleDescription} 
                style={{ width: "100%", padding: "10px", margin: "10px 0", backgroundColor: "#28A745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
                Generate Description
            </button>
            {matchScore !== null && (
                <p style={{ marginTop: "10px", fontWeight: "bold" }}>Match Score: {matchScore}%</p>
            )}
            {description && (
                <p style={{ marginTop: "10px", fontStyle: "italic" }}>Description: {description}</p>
            )}
        </div>
    );
};

export default UploadProduct;
