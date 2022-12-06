import React from "react";
import { useState } from "react";

const AddArtworkForm = ({ user, handleAddArt }) => {
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);

  function handleArtworkSubmit(e) {
    e.preventDefault(e);
    const newArt = {
      title: title,
      style: style,
      year: parseInt(year),
      image: image,
      likes: 0,
      user_id: user.id,
    };
    console.log(user.id);
    fetch("/artworks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArt),
    }).then((res) => {
      if (res.ok) {
        res.json().then((art) => {
          handleAddArt(art);
          setTitle("");
          setStyle("");
          setYear("");
          setImage("");
          setErrors([]);
        });
      } else {
        res.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }
  return (
    <div className="addArtworkForm">
      <h3 className="uploadTitle">Upload New Artwork</h3>
      <form onSubmit={handleArtworkSubmit}>
        <div className="input">
          <label className="input-label"></label>
          <input
            value={title}
            type="text"
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          ></input>
        </div>
        <div className="input">
          <label className="input-label"></label>
          <input
            value={style}
            type="text"
            placeholder="Style..."
            onChange={(e) => setStyle(e.target.value)}
            className="input-field"
          ></input>
        </div>
        <div className="input">
          <label className="input-label"></label>
          <input
            value={year}
            type="number"
            placeholder="Year..."
            onChange={(e) => setYear(e.target.value)}
            className="input-field"
          ></input>
        </div>
        <div className="input">
          <label className="input-label"></label>
          <input
            value={image}
            type="text"
            placeholder="Image URL..."
            onChange={(e) => setImage(e.target.value)}
            className="input-field"
          ></input>
        </div>

        <button classname="submitArtworkBtn" type="submit">
          Upload
        </button>
      </form>
      {errors ? errors.map((e) => <div key={e}>{e[1]}</div>) : null}
    </div>
  );
};

export default AddArtworkForm;
