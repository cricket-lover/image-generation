import React, { useState } from "react";
import "./App.css";
import "./loader.css";

const defaultImageChoices = { prompt: "", size: "small", count: 1 };

function App() {
  const [imageChoices, setImageChoices] = useState(defaultImageChoices);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setImageChoices((choices) => ({
      ...choices,
      prompt: e.target.value,
    }));
    setError("");
  };

  const handleClick = async () => {
    if (imageChoices.prompt.trim() === "") {
      setError("Please enter the description");
      return;
    }

    if (isNaN(imageChoices.count)) {
      setError("Please enter a valid number");
      return;
    }

    setIsLoading(true);
    setImages([]);
    try {
      const response = await fetch("/generateImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imageChoices),
      });

      if (!response.ok) {
        throw new Error("Server Error");
      }
      const imageUrls = await response.json();
      setImages(imageUrls);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="prompt-container">
        <h1>Generate Images with a Description</h1>
        <div className="input-container">
          <label htmlFor="prompt-input" className="prompt-label">
            Description:
          </label>
          <input
            type="text"
            value={imageChoices.prompt}
            name="prompt-input"
            id="prompt-input"
            className="prompt-input"
            placeholder="A white cat dancing on a wall with red hat"
            onChange={handleChange}
          />
        </div>
        <div className="flex-column">
          <div className="input-container">
            <label htmlFor="sizes" className="prompt-label">
              Size:
            </label>
            <select
              name="sizes"
              id="sizes"
              onChange={(e) =>
                setImageChoices((choices) => ({
                  ...choices,
                  size: e.target.value,
                }))
              }
              className="size-dropdown"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="count" className="prompt-label">
              Number of Images:
            </label>
            <input
              name="count"
              id="count"
              type="text"
              value={imageChoices.count}
              onChange={(e) =>
                setImageChoices((choices) => ({
                  ...choices,
                  count: e.target.value,
                }))
              }
              className="prompt-input-count"
            />
          </div>
        </div>
        <button className="generate-image-btn" onClick={handleClick}>
          Generate Image
        </button>
      </div>
      <div className="error-container">{error}</div>
      <div className={isLoading ? "loading" : "none"}></div>
      <div className="images-container">
        {images.map(({ url }, id) => {
          return <img src={url} key={id} alt={imageChoices.prompt} />;
        })}
      </div>
    </div>
  );
}

export default App;
