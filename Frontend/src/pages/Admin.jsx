"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Table,
  Badge,
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaLaptop,
  FaUsers,
  FaShoppingCart,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

const Admin = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingLaptop, setEditingLaptop] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Laptops",
    brand: "",
    originalPrice: "",
    price: "",
    rating: 5,
    image: "",
    hoverImage: "",
    sale: false,
    inStock: true,
    description: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  // API Base URL
  const API_BASE_URL = "https://ailaptopwala.zecdata.com";

  // Fetch all laptops on component mount
  useEffect(() => {
    fetchAllLaptops();
  }, []);

  // Logout function
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear authentication data
      localStorage.removeItem("adminAuthenticated");
      localStorage.removeItem("adminLoginTime");
      sessionStorage.removeItem("adminAuthorized");

      // Redirect to login or home page
      window.location.href = "/admin";
    }
  };

  // API Functions
  const fetchAllLaptops = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products/all`);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data.products);
        setLaptops(data.products);
      } else {
        throw new Error("Failed to fetch laptops");
      }
    } catch (error) {
      console.error("Error fetching laptops:", error);
      showAlertMessage("Failed to fetch laptops", "danger");
    } finally {
      setLoading(false);
    }
  };

  const addLaptop = async (laptopData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(laptopData),
      });
      if (response.ok) {
        const newLaptop = await response.json();
        setLaptops((prev) => [...prev, newLaptop]);
        showAlertMessage("Laptop added successfully!", "success");
        return true;
      } else {
        throw new Error("Failed to add laptop");
      }
    } catch (error) {
      console.error("Error adding laptop:", error);
      showAlertMessage("Failed to add laptop", "danger");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateLaptop = async (id, laptopData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(laptopData),
      });
      if (response.ok) {
        const updatedLaptop = await response.json();
        setLaptops((prev) =>
          prev.map((laptop) => (laptop.id === id ? updatedLaptop : laptop))
        );
        showAlertMessage("Laptop updated successfully!", "success");
        return true;
      } else {
        throw new Error("Failed to update laptop");
      }
    } catch (error) {
      console.error("Error updating laptop:", error);
      showAlertMessage("Failed to update laptop", "danger");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteLaptop = async (id) => {
    if (!window.confirm("Are you sure you want to delete this laptop?")) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setLaptops((prev) => prev.filter((laptop) => laptop.id !== id));
        showAlertMessage("Laptop deleted successfully!", "success");
      } else {
        throw new Error("Failed to delete laptop");
      }
    } catch (error) {
      console.error("Error deleting laptop:", error);
      showAlertMessage("Failed to delete laptop", "danger");
    } finally {
      setLoading(false);
    }
  };

  // Helper Functions
  const showAlertMessage = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Laptops",
      brand: "",
      originalPrice: "",
      price: "",
      rating: 5,
      image: "",
      hoverImage: "",
      sale: false,
      inStock: true,
      description: "",
    });
    setEditingLaptop(null);
  };

  const handleShowModal = (laptop = null) => {
    if (laptop) {
      setFormData({
        name: laptop.name || "",
        category: laptop.category || "Laptops",
        brand: laptop.brand || "",
        originalPrice: laptop.originalPrice || "",
        price: laptop.price || "",
        rating: laptop.rating || 5,
        image: laptop.image || "",
        hoverImage: laptop.hoverImage || "",
        sale: laptop.sale || false,
        inStock: laptop.inStock !== undefined ? laptop.inStock : true,
        description: laptop.description || "",
      });
      setEditingLaptop(laptop);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare data for API
    const laptopData = {
      ...formData,
      originalPrice: Number.parseFloat(formData.originalPrice),
      price: Number.parseFloat(formData.price),
      rating: Number.parseInt(formData.rating),
    };

    let success = false;
    if (editingLaptop) {
      // Update existing laptop
      success = await updateLaptop(editingLaptop.id, laptopData);
    } else {
      // Add new laptop
      success = await addLaptop(laptopData);
    }
    if (success) {
      handleCloseModal();
    }
  };

  const formatPrice = (price) => {
    return `₹${price?.toLocaleString("en-IN")}.00`;
  };

  // Dashboard stats
  const totalLaptops = laptops.length;
  const inStockLaptops = laptops.filter((l) => l.inStock).length;
  const onSaleLaptops = laptops.filter((l) => l.sale).length;
  const avgPrice =
    laptops.length > 0
      ? laptops.reduce((sum, l) => sum + (l.price || 0), 0) / laptops.length
      : 0;

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Sticky Header */}
      <div
        className="bg-teal text-white py-4 mb-4 sticky-top shadow-sm"
        style={{
          zIndex: 1020,
          borderBottom: "3px solid #0d6efd",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col>
              <h1 className="h2 mb-0 fw-bold">
                <FaLaptop className="me-3" />
                AI Laptop Wala - Admin Panel
              </h1>
              <p className="mb-0 opacity-75">Manage your laptop inventory</p>
            </Col>
            <Col xs="auto" className="d-flex align-items-center gap-3">
              <Button
                variant="light"
                size="lg"
                onClick={() => handleShowModal()}
                className="fw-semibold"
                disabled={loading}
              >
                <FaPlus className="me-2" />
                Add New Laptop
              </Button>

              {/* Logout Button */}
              <Button
                variant="outline-light"
                size="lg"
                onClick={handleLogout}
                className="fw-semibold d-flex align-items-center"
                title="Logout from Admin Panel"
              >
                <FaSignOutAlt className="me-2" />
                <span className="d-none d-md-inline">Logout</span>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        {/* Alert */}
        {showAlert && (
          <Alert
            variant={alertType}
            className="mb-4"
            dismissible
            onClose={() => setShowAlert(false)}
          >
            {alertMessage}
          </Alert>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center mb-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading...</p>
          </div>
        )}

        {/* Dashboard Stats */}
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div
                  className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <FaLaptop className="text-primary" size={24} />
                </div>
                <h3 className="fw-bold text-primary">{totalLaptops}</h3>
                <p className="text-muted mb-0">Total Laptops</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div
                  className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <FaShoppingCart className="text-success" size={24} />
                </div>
                <h3 className="fw-bold text-success">{inStockLaptops}</h3>
                <p className="text-muted mb-0">In Stock</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div
                  className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <FaUsers className="text-warning" size={24} />
                </div>
                <h3 className="fw-bold text-warning">{onSaleLaptops}</h3>
                <p className="text-muted mb-0">On Sale</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div
                  className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <FaChartLine className="text-info" size={24} />
                </div>
                <h3 className="fw-bold text-info">
                  {formatPrice(Math.round(avgPrice))}
                </h3>
                <p className="text-muted mb-0">Avg Price</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Laptops Table */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center">
            <h4 className="mb-0 fw-semibold">Laptop Inventory</h4>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={fetchAllLaptops}
              disabled={loading}
            >
              Refresh
            </Button>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 fw-semibold">Image</th>
                    <th className="border-0 fw-semibold">Name</th>
                    <th className="border-0 fw-semibold">Brand</th>
                    <th className="border-0 fw-semibold">Price</th>
                    <th className="border-0 fw-semibold">Status</th>
                    <th className="border-0 fw-semibold">Rating</th>
                    <th className="border-0 fw-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {laptops.map((laptop) => (
                    <tr key={laptop.id}>
                      <td className="align-middle">
                        <img
                          src={laptop.image || "/placeholder.svg"}
                          alt={laptop.name}
                          style={{
                            width: "60px",
                            height: "45px",
                            objectFit: "contain",
                          }}
                          className="rounded"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg";
                          }}
                        />
                      </td>
                      <td className="align-middle">
                        <div>
                          <div className="fw-semibold">{laptop.name}</div>
                          <small className="text-muted">
                            {laptop.category}
                          </small>
                        </div>
                      </td>
                      <td className="align-middle">
                        <Badge bg="secondary" className="px-2 py-1">
                          {laptop.brand}
                        </Badge>
                      </td>
                      <td className="align-middle">
                        <div>
                          <div className="fw-bold text-primary">
                            {formatPrice(laptop.price)}
                          </div>
                          {laptop.originalPrice &&
                            laptop.originalPrice !== laptop.price && (
                              <small className="text-muted text-decoration-line-through">
                                {formatPrice(laptop.originalPrice)}
                              </small>
                            )}
                        </div>
                      </td>
                      <td className="align-middle">
                        <div>
                          <Badge
                            bg={laptop.inStock ? "success" : "danger"}
                            className="mb-1"
                          >
                            {laptop.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                          {laptop.sale && (
                            <div>
                              <Badge bg="warning" text="dark">
                                On Sale
                              </Badge>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <span className="me-1">{laptop.rating}</span>
                          <div className="text-warning">
                            {"★".repeat(laptop.rating || 0)}
                            {"☆".repeat(5 - (laptop.rating || 0))}
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleShowModal(laptop)}
                            disabled={loading}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteLaptop(laptop.id)}
                            disabled={loading}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {laptops.length === 0 && !loading && (
              <div className="text-center py-5">
                <FaLaptop size={48} className="text-muted mb-3" />
                <h5 className="text-muted">No laptops found</h5>
                <p className="text-muted">
                  Add your first laptop to get started
                </p>
                <Button variant="primary" onClick={() => handleShowModal()}>
                  <FaPlus className="me-2" />
                  Add Laptop
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="bg-teal text-white">
          <Modal.Title>
            {editingLaptop ? "Edit Laptop" : "Add New Laptop"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Laptop Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter laptop name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Brand *</Form.Label>
                  <Form.Select
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Brand</option>
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="ASUS">ASUS</option>
                    <option value="Apple">Apple</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Microsoft">Microsoft</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Original Price *
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter original price"
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Sale Price *</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter sale price"
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="Laptops">Laptops</option>
                    <option value="Gaming Laptops">Gaming Laptops</option>
                    <option value="Business Laptops">Business Laptops</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Rating</Form.Label>
                  <Form.Select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Primary Image URL *
              </Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
                placeholder="Enter primary image URL"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Hover Image URL</Form.Label>
              <Form.Control
                type="url"
                name="hoverImage"
                value={formData.hoverImage}
                onChange={handleInputChange}
                placeholder="Enter hover image URL"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter laptop description"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Check
                  type="checkbox"
                  name="sale"
                  checked={formData.sale}
                  onChange={handleInputChange}
                  label="On Sale"
                  className="mb-3"
                />
              </Col>
              <Col md={6}>
                <Form.Check
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  label="In Stock"
                  className="mb-3"
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseModal}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="bg-teal border-0"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  {editingLaptop ? "Updating..." : "Adding..."}
                </>
              ) : editingLaptop ? (
                "Update Laptop"
              ) : (
                "Add Laptop"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Admin;
