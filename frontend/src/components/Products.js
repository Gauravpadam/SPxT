import React, { useState } from 'react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    desc: '',
    hs6: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts((prev) => [...prev, newProduct]);
    setNewProduct({ id: '', name: '', desc: '', hs6: '' });
    setShowForm(false);
  };

  return (
    <div className="products-container">
      <header className="products-header">
        <h1>Products</h1>
        <button className="add-product-btn" onClick={handleAddProduct}>
          Add Product
        </button>
      </header>

      <div className="products-list">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <h2>{product.name}</h2>
            <p>{product.desc}</p>
            <p><strong>HS6 Code:</strong> {product.hs6}</p>
            <p><strong>ID:</strong> {product.id}</p>
          </div>
        ))}
        {products.length === 0 && <p>No products yet. Click "Add Product" to start!</p>}
      </div>

      {showForm && (
        <div className="product-form-overlay">
          <div className="product-form">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>ID</label>
                <input
                  type="text"
                  name="id"
                  value={newProduct.id}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="desc"
                  value={newProduct.desc}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>HS6 Code</label>
                <input
                  type="text"
                  name="hs6"
                  value={newProduct.hs6}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Add Product</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
