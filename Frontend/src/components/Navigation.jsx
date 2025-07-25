import React from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { FaChevronDown, FaTh } from "react-icons/fa";

const Navigation = () => {
  const handleLanguageSelect = (eventKey) => {
    // Do nothing or log to console
    console.log("Selected language:", eventKey);
  };

  return (
    <nav className="navbar-custom">
      <Container fluid className="py-2">
        <Row className="w-100 align-items-center">
          <Col xs="auto">
            <Button className="departments-btn d-flex align-items-center">
              <FaTh className="me-2" />
              <span>All Departments</span>
              <FaChevronDown className="ms-2" size={12} />
            </Button>
          </Col>

          <Col className="d-none d-md-block">
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

          <Col xs="auto" className="ms-auto">
            <div className="d-flex align-items-center">
              <Dropdown onSelect={handleLanguageSelect}>
                <Dropdown.Toggle
                  variant="link"
                  className="text-decoration-none text-dark d-flex align-items-center p-0 me-3 border-0"
                >
                  <span className="small me-1">English</span>
                  {/* <FaChevronDown size={12} className="text-muted" /> */}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="en">English</Dropdown.Item>
                  <Dropdown.Item eventKey="es">Spanish</Dropdown.Item>
                  <Dropdown.Item eventKey="fr">French</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Button variant="dark" size="sm" className="fw-medium">
                Sale! 30% OFF!
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </nav>
  );
};

export default Navigation;
