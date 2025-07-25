import React from "react";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import { FaSearch, FaPhone, FaHeart, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white border-bottom">
      <Container fluid className="py-3">
        <Row className="align-items-center">
          {/* Logo */}
          <Col xs="auto">
            <div
              className="bg-warning rounded d-flex align-items-center justify-content-center"
              style={{ width: "48px", height: "48px" }}
            >
              <span className="text-white fw-bold fs-4">A</span>
            </div>
          </Col>

          {/* Wider Search Bar */}
          <Col xs={12} md={6} lg={5} className="my-2 my-md-0">
            <div className="d-flex w-100">
              <Form.Control type="text" placeholder="Search for Xbox" />
              <Button variant="primary" className="bg-success border-0">
                <FaSearch />
              </Button>
            </div>
          </Col>

          {/* Empty Col to keep layout balanced */}
          <Col className="d-none d-lg-block" />

          {/* Right Side Actions */}
          <Col xs="auto">
            <Row className="align-items-center g-2">
              {/* Phone Number */}
              <Col className="d-none d-md-block">
                <div className="d-flex align-items-center">
                  <FaPhone className="text-success me-2" size={16} />
                  <div>
                    <div className="small text-muted">Need help? Call us:</div>
                    <div className="fw-semibold small">+91 9893496163</div>
                  </div>
                </div>
              </Col>

              {/* Action Icons */}
              <Col xs="auto">
                <div className="d-flex align-items-center">
                  {/* Favorites */}
                  <Button
                    variant="link"
                    className="text-dark p-2 position-relative me-2"
                  >
                    <FaHeart size={20} />
                    <Badge
                      bg="success"
                      className="position-absolute top-0 start-100 translate-middle border-0"
                      style={{ fontSize: "10px" }}
                    >
                      0
                    </Badge>
                    <div className="small d-none d-sm-block">Favorites</div>
                  </Button>

                  {/* Cart */}
                  <Button
                    variant="link"
                    className="text-dark p-2 position-relative"
                  >
                    <FaShoppingCart size={20} />
                    <Badge
                      bg="success"
                      className="position-absolute top-0 start-100 translate-middle border-0"
                      style={{ fontSize: "10px" }}
                    >
                      0
                    </Badge>
                    <div className="small d-none d-sm-block">My Cart</div>
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
