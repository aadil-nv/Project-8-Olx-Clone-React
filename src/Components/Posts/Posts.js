import React, { useState, useEffect, useContext } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const { setPostDetiles } = useContext(PostContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    firebase.firestore().collection("products").get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        };
      });
      setProducts(allPost);
    });
  }, [firebase]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>

        <div className="grid-container">
          {products.map((product) => (
            <div className="card" key={product.id} onClick={() => {
              setPostDetiles(product);
              navigate('/viewpost');
            }}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrl} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
                <div className="date">{new Date(product.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;