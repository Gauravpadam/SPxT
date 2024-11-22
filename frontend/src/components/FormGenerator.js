import React, { useState, useEffect } from "react";
import "./FormGenerator.css";
import ProductForm from "./ProductForm";
import { fetchWithAuth, clearAuthTokens } from './auth';
import { useNavigate } from 'react-router-dom';
import { Shield, User } from 'lucide-react';

const FormGenerator = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [forms, setForms] = useState([]);
  const handleLogout = () => {
    clearAuthTokens();
    navigate('/login');
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch("http://localhost:8000/get-product-list", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          console.log(data)
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:8000/get-form", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
      });

      if (response.ok) {
        const data = await response.json();
        setForms(data); // Replace product list with form names
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <div style={{width:"100vw",height:"100vh"}}>
  <nav className="navbar">
        <div className="logo">
          <Shield size={24} />
          <span className="logo-text">BorderlessBiz</span>
        </div>
        <div className="nav-links">
          <a href="/dashboard" >Dashboard</a>
          <a href="/products">Products</a>
          <a href="/notifications">Notifications</a>
          <a href="/generator" className="active">Document Generator</a>
        </div>
        <div className="profile">
          <div className="profile-menu" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <User size={24} />
            <span>Logout</span>
          </div>
        </div>
      </nav>

  <div>
 
 
      {!selectedProduct ? (
       
         <div className="products-container my-important-style" >
           <h1>Products</h1>
          <div className="products-list">
            {products.map((product) => (
              <div key={product.product_id} className="product-card">
                <h2>{product.product_name}</h2>
                <p>{product.product_description}</p>
                <button
                  onClick={() => handleProductSelect(product)}
                  className="select-product-btn"
                >
                  Select Product
                </button>
              </div>
            ))}
            {products.length === 0 && <p>No products yet!</p>}
          </div>
        </div>
      ) : (
        <>
       
        
        <div className="parent-div">

          <div className="selected-product">
              <h2>{selectedProduct.product_name}</h2>
              <p>{selectedProduct.product_description}</p>
          </div>

          <div className="child-2">
          {forms.length === 0 ? (
          <ProductForm
            productId={selectedProduct.product_id}
            onSubmit={handleFormSubmit}
          />
        ) : (
          <div className="forms-list">
            <h2>Forms</h2>
            {forms.map((form, index) => (
              <div key={index} className="form-item">
                <p>{form["form-name"]}</p>
              </div>
            ))}
          </div>
        )
        }
          </div>

        </div>
          
          
        </>
      )}
  
  </div>
  </div>
    
  );
};

export default FormGenerator;
