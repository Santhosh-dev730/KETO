import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const AdminProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formProduct, setFormProduct] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    stock: "",
    image: "",
    imageName: "",
  });

  const getAllProducts = async () => {
    try {
      const res = await axios.get("https://keto-ja9n.vercel.app/products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      toast.warning("Please login as admin");
      navigate("/AdminLogin");
      return;
    }
    getAllProducts();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormProduct({ ...formProduct, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormProduct({
          ...formProduct,
          image: reader.result,
          imageName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("https://keto-ja9n.vercel.app/products", formProduct);
      toast.success("Product added successfully!");
      closeModal();
      getAllProducts();
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  const handleEditProduct = (product) => {
    setFormProduct({
      ...product,
      imageName: "Existing Image",
    });
    setEditingProductId(product.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.patch(`https://keto-ja9n.vercel.app/products/${editingProductId}`, formProduct);
      toast.success("Product updated successfully!");
      closeModal();
      getAllProducts();
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingProductId(null);
    setFormProduct({
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      stock: "",
      image: "",
      imageName: "",
    });
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://keto-backend-two.vercel.app/products/${id}`);
        toast.success("Product deleted successfully!");
        getAllProducts();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const getFilteredProducts = () => {
    if (filterCategory === "All") return products;
    if (filterCategory === "Most Selling Products") {
      return [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 5);
    }
    return products.filter((p) =>
      p.category.toLowerCase().includes(filterCategory.toLowerCase())
    );
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container is-fluid mb-4">
        <div className='columns'>
          <div className="column is-5">
            <div className="block has-text-centered mb-4">
              {["All", "Smartphones", "Laptops", "Most Selling Products"].map((cat) => (
                <button
                  key={cat}
                  className={`button is-small mr-4 is-link is-light is-rounded ${filterCategory === cat ? 'is-primary' : ''}`}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className='column is-5'></div>
          <div className="column is-2">
            <button
              className="button is-link"
              onClick={() => {
                setIsModalOpen(true);
                setIsEditing(false);
                setFormProduct({
                  title: "",
                  description: "",
                  price: "",
                  brand: "",
                  category: "",
                  stock: "",
                  image: "",
                  imageName: "",
                });
              }}
            >
              + Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="table-container px-5">
        <table className="table is-fullwidth is-striped is-hoverable is-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Sold</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredProducts().map((prod, index) => (
              <tr key={prod.id}>
                <td>{index + 1}</td>
                <td>{prod.title}</td>
                <td>₹{prod.price}</td>
                <td>{prod.brand}</td>
                <td>{prod.category}</td>
                <td>{prod.stock}</td>
                <td>{prod.sold || 0}</td>
                <td>
                  <button
                    className="button is-small is-info mr-2"
                    onClick={() => handleEditProduct(prod)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-edit"></i>
                    </span>
                  </button>
                  <button
                    className="button is-small is-danger"
                    onClick={() => handleDeleteProduct(prod.id)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{isEditing ? "Edit Product" : "Add New Product"}</p>
            <button className="delete" aria-label="close" onClick={closeModal}></button>
          </header>
          <section className="modal-card-body">
            {["title", "description", "price", "brand", "category", "stock"].map((field) => (
              <div className="field" key={field}>
                <label className="label">{field[0].toUpperCase() + field.slice(1)}</label>
                <div className="control">
                  <input
                    className="input"
                    type={field === "price" ? "number" : "text"}
                    name={field}
                    value={formProduct[field]}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            ))}

            <div className="field">
              <label className="label">Upload Image</label>
              <div className={`file has-name ${formProduct.imageName ? 'is-success' : ''}`}>
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">Choose a file…</span>
                  </span>
                  <span className="file-name">
                    {formProduct.imageName || "No file selected"}
                  </span>
                </label>
              </div>
              {formProduct.image && (
                <figure className="image is-128x128 mt-3">
                  <img src={formProduct.image} alt="preview" />
                </figure>
              )}
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-link"
              onClick={isEditing ? handleUpdateProduct : handleAddProduct}
            >
              {isEditing ? "Update" : "Save"}
            </button>
            <button className="button" onClick={closeModal}>Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
