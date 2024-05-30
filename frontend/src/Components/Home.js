import React, { useState } from "react";

const Home = () => {
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:5000/api/category?category=${category}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setProducts(data);
      setCurrentPage(1); // Reset current page to 1 after fetching new data
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ paddingTop: "80px" }}>
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          Category
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={handleSubmit}>
        Fetch
      </button>
      
      <div className="row">
        {currentProducts.map((product, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Rating: {product.rating}</p>
                <p className="card-text">Discount: {product.discount}%</p>
                <p className="card-text">Availability: {product.availability}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((number) => (
            <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(number + 1)} className="page-link">
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Home;
