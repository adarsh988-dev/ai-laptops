import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaSearch, FaPhone } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white border-bottom shadow-sm">
      <Container fluid className="py-3">
        <Row className="align-items-center gx-3 gy-2">
          {/* Logo */}
          <Col xs={12} sm="auto" className="text-center text-sm-start">
            <div
              className="bg-warning rounded d-inline-flex align-items-center justify-content-center"
              style={{ width: "48px", height: "48px" }}
            >
              <span className="text-white fw-bold fs-4">A</span>
            </div>
          </Col>

          {/* Search Bar */}
          <Col xs={12} sm={8} md={6} lg={5}>
            <div className="d-flex">
              <Form.Control type="text" placeholder="Search for Xbox" />
              <Button variant="success" className="ms-2">
                <FaSearch />
              </Button>
            </div>
          </Col>

          {/* Spacer to push phone number to the right */}
          <Col className="d-none d-md-block" />

          {/* Phone Number (Right Aligned) */}
          <Col
            xs="auto"
            className="d-none d-md-flex align-items-center justify-content-end ms-auto"
          >
            <FaPhone className="text-success me-2" size={16} />
            <div>
              <div className="small text-muted">Need help? Call us:</div>
              <div className="fw-semibold small">+91 9893496163</div>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
