import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import { FaStar, FaTh, FaList, FaChevronDown } from "react-icons/fa";

// Replace this with your actual base URL
const API_BASE_URL = "https://ailaptopwala.zecdata.com";

const ProductCatalog = () => {
  const [laptops, setLaptops] = useState([]);
  const [showCount, setShowCount] = useState(8);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Optional: Alert Function (replace or modify as needed)
  const showAlertMessage = (msg, type) => {
    alert(`${type.toUpperCase()}: ${msg}`);
  };

  const fetchAllLaptops = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products/all`);
      if (response.ok) {
        const data = await response.json();
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

  useEffect(() => {
    fetchAllLaptops();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...laptops];
    if (sortBy === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    return filtered.slice(0, showCount);
  }, [sortBy, showCount, laptops]);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-warning" : "text-muted"}
        size={12}
      />
    ));

  const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}.00`;

  return (
    <section className="py-4">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded">
              <div className="d-flex align-items-center">
                <Button
                  variant={
                    viewMode === "grid" ? "primary" : "outline-secondary"
                  }
                  size="sm"
                  className="me-2"
                  onClick={() => setViewMode("grid")}
                >
                  <FaTh />
                </Button>
                <Button
                  variant={
                    viewMode === "list" ? "primary" : "outline-secondary"
                  }
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <FaList />
                </Button>
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  size="sm"
                  className="border-0"
                >
                  Sort By <FaChevronDown size={10} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSortBy("default")}>
                    Default
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy("priceLowToHigh")}>
                    Price: Low to High
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy("priceHighToLow")}>
                    Price: High to Low
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy("rating")}>
                    Rating
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {loading ? (
              <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <>
                <Row className="g-4 mb-4">
                  {filteredProducts.map((product) => (
                    <Col
                      key={product.id}
                      sm={6}
                      lg={viewMode === "grid" ? 3 : 12}
                    >
                      <Card
                        className="product-card h-100 border-0 shadow-sm"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <div className="position-relative">
                          {product.sale && (
                            <div
                              className="position-absolute top-0 start-0 m-2 px-2 py-1 bg-dark text-white"
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                zIndex: 2,
                              }}
                            >
                              SALE!
                            </div>
                          )}
                          <div
                            className="product-image-container"
                            style={{ height: "200px", overflow: "hidden" }}
                          >
                            <Card.Img
                              variant="top"
                              src={
                                hoveredProduct === product.id
                                  ? product.hoverImage
                                  : product.image
                              }
                              style={{
                                height: "100%",
                                objectFit: "contain",
                                padding: "20px",
                                transition: "all 0.5s ease",
                              }}
                            />
                          </div>
                        </div>
                        <Card.Body className="d-flex flex-column text-center">
                          <p
                            className="text-muted text-uppercase small mb-2"
                            style={{ fontSize: "11px" }}
                          >
                            {product.category}
                          </p>
                          <Card.Title
                            className="h6 mb-3"
                            style={{ fontSize: "14px", lineHeight: "1.3" }}
                          >
                            {product.name}
                          </Card.Title>
                          <div className="mt-auto">
                            {product.originalPrice && (
                              <p
                                className="text-muted small mb-1"
                                style={{
                                  textDecoration: "line-through",
                                  fontSize: "12px",
                                }}
                              >
                                {formatPrice(product.originalPrice)}
                              </p>
                            )}
                            <p
                              className="fw-bold mb-0 text-primary"
                              style={{ fontSize: "16px" }}
                            >
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <div className="text-center mb-5">
                  <p className="text-muted small mb-3">
                    Showing {filteredProducts.length} of {laptops.length} items
                  </p>
                  {showCount < laptops.length && (
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowCount((prev) => prev + 4)}
                    >
                      Load More
                    </Button>
                  )}
                </div>
              </>
            )}

            <div className="text-center">
              <h2 className="fw-bold mb-4">Real Reviews, Real Experiences</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductCatalog;
