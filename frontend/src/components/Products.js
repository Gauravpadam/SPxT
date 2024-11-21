import React, { useState, useEffect } from 'react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    product_description: '',
    itc_hs: '',
  });
  // Sample product data
  // const sampleProducts = Array.from({ length: 5 }, (_, index) => ({
  //   name: `Product ${index + 1}`,
  //   desc: `Description of Product ${index + 1}`,
  //   hs6: `HS6-${index + 1000}`,
  // }));

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    
    try {
      const token = localStorage.getItem("access_token");
      // const user_id = localStorage.getItem("user_id");
      const response = await fetch('http://localhost:8000/add-product',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify({ 
          name:newProduct.product_name,
          description:newProduct.product_description,
          hs6:newProduct.itc_hs,
          // user_id:user_id
        }),
      })
      
      if(response.ok){
        const data = await response.json()
        alert(data.message)
      }
      setProducts((prev) => [newProduct,...prev]);
      setNewProduct({ product_name: '', product_description: '', itc_hs: '' });
    } catch (error) {
      alert(error.message)
      console.log(error.message);
    }
    setShowForm(false);
  };

  useEffect(() => {
    const fetchProducts = async()=>{ 
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch('http://localhost:8000/get-product-list',{ 
          method:'GET',
          headers:{
            'Authorization':`Bearer ${token}`
          }
        })
        if(response.ok){ 
          const data = await response.json();
          console.log(data);
          setProducts(data);
        }

      } catch (error) {
        console.log("Error ",error)
      }
    }
    fetchProducts();
    
  }, []);

  return (
    <>

    {/* Header section */}
    <div className="header-container">
        <button className="add-product-btn" onClick={handleAddProduct}>
          Add Product
        </button>
    </div>
      
      <h1>Products</h1>

    <div className="products-container">
      
      
      {/* Product list section */}
      <div className="products-list">
      
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <h2>{product.product_name}</h2>
            <p>{product.product_description}</p>
            <p>
              <strong>HS6 Code:</strong> {product.itc_hs}
            </p>
          
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
                <label>Name</label>
                <input
                  type="text"
                  name="product_name"
                  value={newProduct.product_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="product_description"
                  value={newProduct.product_description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>HS6 Code</label>
                <input
                  type="text"
                  name="itc_hs"
                  value={newProduct.itc_hs}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Products;
