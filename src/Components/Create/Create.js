import React, { Fragment, useState, useContext } from 'react';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

import './Create.css';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // Validation checks
    if (!name.trim() || name.trim().length < 3) {
      setError("Name should be at least 3 characters");
      return;
    }

    if (!category.trim() || category.trim().length < 3) {
      setError("Category should be at least 3 characters");
      return;
    }

    if (!price.trim() || isNaN(price) || parseFloat(price) < 0) {
      setError("Price should be a non-negative number");
      return;
    }

    if (!image) {
      setError("Please select an image");
      return;
    }

    // Reset error state
    setError("");

    // Upload image and submit product
    const storageRef = firebase.storage().ref(`/images/${image.name}`);
    const uploadTask = storageRef.put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log("URL is ::::", url);
          firebase.firestore().collection('products').add({
            name,
            category,
            price: parseFloat(price),
            imageUrl: url,
            userId: user.uid,
            createdAt: new Date().toISOString()
          }).then(() => {
            console.log("Product added successfully");
            setName("");
            setCategory("");
            setPrice("");
            setImage(null);
            navigate('/');
          }).catch((error) => {
            console.error("Error adding product:", error);
            setError("Error adding product");
          });
        }).catch((error) => {
          console.error("Error getting download URL:", error);
          setError("Error getting download URL");
        });
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            placeholder='Product Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            placeholder='Product Category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <label htmlFor="image">Image</label>
          <br />
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          {image && (
            <img
              alt="Selected Product"
              width="200px"
              height="200px"
              src={URL.createObjectURL(image)}
            />
          )}
          <br />
          {error && <p className="error-message">{error}</p>}
          <button type="button" className="uploadBtn" onClick={handleSubmit}>Upload and Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
