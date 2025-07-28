import React, { useState } from "react";
import { Container, Row, Col, Button, Collapse } from "react-bootstrap";
import { FaChevronDown, FaTh, FaBars } from "react-icons/fa";

const Navigation = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="navbar-custom bg-light border-bottom">
      <Container fluid className="py-2">
        <Row className="align-items-center">
          {/* Left side: All Departments button */}
          <Col xs="auto">
            <Button
              className="departments-btn d-flex align-items-center"
              onClick={() => setOpenMenu(!openMenu)}
              aria-controls="main-nav-collapse"
              aria-expanded={openMenu}
            >
              <FaBars className="me-2 d-md-none" />
              <FaTh className="me-2 d-none d-md-inline" />
              <span>All Departments</span>
              <FaChevronDown className="ms-2" size={12} />
            </Button>
          </Col>

          {/* Center: Navigation Links */}
          <Col className="d-none d-md-flex">
            <div className="d-flex align-items-center">
              <a
                href="#"
                className="text-decoration-none text-dark fw-medium me-4"
              >
                Home
              </a>
              <div className="d-flex align-items-center">
                <a
                  href="#"
                  className="text-decoration-none text-dark fw-medium me-1"
                >
                  Hot News
                </a>
                <FaChevronDown size={12} className="text-muted" />
              </div>
            </div>
          </Col>

          {/* Right side: Sale button */}
          <Col xs="auto" className="ms-auto">
            <div className="d-flex align-items-center">
              <Button variant="dark" size="sm" className="fw-medium">
                Sale! 30% OFF!
              </Button>
            </div>
          </Col>
        </Row>

        {/* Collapsible Menu for Mobile */}
        <Row>
          <Col xs={12}>
            <Collapse in={openMenu}>
              <div id="main-nav-collapse" className="d-md-none mt-2">
                <a
                  href="#"
                  className="d-block text-decoration-none text-dark fw-medium mb-2"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="d-block text-decoration-none text-dark fw-medium mb-2"
                >
                  Hot News
                </a>
              </div>
            </Collapse>
          </Col>
        </Row>
      </Container>
    </nav>
  );
};

export default Navigation;
