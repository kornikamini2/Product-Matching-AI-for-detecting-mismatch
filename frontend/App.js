import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImageUrl(""); // Clear URL if file is selected
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setFile(null); // Clear file if URL is entered
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    } else if (imageUrl) {
      formData.append("image_url", imageUrl);
    } else {
      alert("Please upload a file or enter an image URL.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData);
      setProduct(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed. Check the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Upload or Enter Image URL</h1>
      
      {/* Upload File */}
      <input type="file" onChange={handleFileChange} style={{ margin: "10px" }} />

      <br />

      {/* Enter Image URL */}
      <input
        type="text"
        placeholder="https://www.yourdesignstore.in/products/info/dense-oversize-t-shirt-260-gsm"
        value={imageUrl}
        onChange={handleUrlChange}
        style={{ padding: "8px", width: "50%", marginTop: "10px" }}
      />

      <br />

      <button
        onClick={handleUpload}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          background: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload"}
      </button>

      {/* Display Processed Image & Details */}
      {product && (
        <div>
          <h2>Generated Details</h2>
          <p><strong>Title:</strong> {product.title}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <img
            src={`http://127.0.0.1:5000/${product.image_url}`}
            alt="Processed"
            style={{ width: "300px", marginTop: "10px", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
