import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import './View.css';

function ViewPost() {
  const { firebase } = useContext(FirebaseContext);
  const { postDetiles } = useContext(PostContext);
  const [userDetiles, setUserDetiles] = useState(null);

  useEffect(() => {
    if (postDetiles) {
      const { userId } = postDetiles;
      firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
        res.forEach(doc => {
          setUserDetiles(doc.data());
        });
      }).catch(error => {
        console.error("Error fetching user details:", error);
      });
    }
  }, [firebase, postDetiles]);

  if (!postDetiles) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetiles.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetiles.price}</p>
          <span>{postDetiles.name}</span>
          <p>{postDetiles.category}</p>
          <span>{new Date(postDetiles.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        
        {userDetiles && (
            <div className="contactDetails">
              <p>Seller Details:</p>
              <p>Name: {userDetiles.username}</p>
              <p>Contact: {userDetiles.phone}</p>
            </div>
          )}
      </div>
    </div>
  );
}

export default ViewPost;




