import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section
      className="hero-gradient text-white position-relative"
      style={{ minHeight: "500px" }}
    >
      <Container className="h-100 py-5">
        <Row className="h-100 align-items-center">
          {/* Left Content */}
          <Col lg={6} className="py-4">
            <div className="mb-3">
              <p className="fs-5 text-light mb-2">Power Up Your Day</p>
              <h1 className="display-3 fw-bold lh-1 mb-0">
                Get More Done,
                <br />
                Anywhere
              </h1>
            </div>
            <p className="fs-4 text-light mb-4" style={{ maxWidth: "400px" }}>
              Seamless Performance, Stunning Design
            </p>
            <Button
              size="lg"
              className="bg-teal border-0 px-4 py-3 fs-5 fw-medium"
            >
              Shop now →
            </Button>
          </Col>

          {/* Right Content - Laptop Images */}
          <Col lg={6} className="position-relative">
            <Row className="justify-content-center align-items-center">
              <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                <div className="position-relative">
                  <img
                    src="https://m.media-amazon.com/images/I/71PHl2RQHBL._AC_UY218_.jpg"
                    alt="ASUS OLED Laptop"
                    className="img-fluid"
                    style={{ maxHeight: "200px" }}
                  />
                  {/* <Badge bg="warning" text="dark" className="position-absolute top-0 start-0 m-2">
                    OLED
                  </Badge> */}
                </div>
              </Col>

              <Col
                md={4}
                className="d-none d-lg-block text-center mb-3 mb-md-0"
              >
                <img
                  src="https://m.media-amazon.com/images/I/71lWuRFiCoL._SX679_.jpg"
                  alt="HP Laptop"
                  className="img-fluid"
                  style={{ maxHeight: "200px" }}
                />
              </Col>

              <Col md={4} className="d-none d-xl-block text-center">
                <div className="position-relative">
                  <img
                    src="https://m.media-amazon.com/images/I/41SBXqV7MSL.jpg"
                    alt="Dell Laptop"
                    className="img-fluid"
                    style={{ maxHeight: "200px" }}
                  />
                  {/* <Badge bg="primary" className="position-absolute top-0 end-0 m-2 small">
                    #1 INDIA'S MOST TRUSTED BRAND
                  </Badge> */}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Navigation Arrows */}
      {/* <Button
        variant="link"
        className="position-absolute start-0 top-50 translate-middle-y text-white ms-3"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
        }}
      >
        <FaChevronLeft size={20} />
      </Button>

      <Button
        variant="link"
        className="position-absolute end-0 top-50 translate-middle-y text-white me-3"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
        }}
      >
        <FaChevronRight size={20} />
      </Button> */}
    </section>
  );
};

export default HeroSection;
