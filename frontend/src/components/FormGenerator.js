import React, { useState, useEffect } from "react";
import "./FormGenerator.css";
import ProductForm from "./ProductForm";

const FormGenerator = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [forms, setForms] = useState([]);

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
      const response = await fetch("http://localhost:8000/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
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
    <div className="products-container">
      {!selectedProduct ? (
        <>
          <h1>Products</h1>
          <div className="products-list">
            {products.map((product) => (
              <div key={product.id} className="product-card">
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
          </div>
        </>
      ) : (
        <>
          <h1>Selected Product</h1>
          <div className="product-card">
            <h2>{selectedProduct.product_name}</h2>
            <p>{selectedProduct.product_description}</p>
          </div>
          {forms.length === 0 ? (
            <ProductForm
              productId={selectedProduct.id}
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
          )}
        </>
      )}
    </div>
  );
};

export default FormGenerator;
