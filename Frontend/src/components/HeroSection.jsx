import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const HeroSection = () => {
  return (
    <section
      className="hero-gradient text-white position-relative"
      style={{ minHeight: "500px" }}
    >
      <Container className="h-100 py-5">
        <Row className="h-100 align-items-center">
          {/* Left Content */}
          <Col
            xs={12}
            lg={6}
            className="text-center text-lg-start py-4 mb-4 mb-lg-0"
          >
            <div className="mb-3">
              <p className="fs-5 text-light mb-2">Power Up Your Day</p>
              <h1 className="display-5 fw-bold lh-1 mb-3">
                Get More Done,
                <br className="d-none d-md-block" />
                Anywhere
              </h1>
            </div>
            <p
              className="fs-5 text-light mb-4 mx-auto mx-lg-0"
              style={{ maxWidth: "400px" }}
            >
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
          <Col xs={12} lg={6}>
            <Row className="justify-content-center align-items-center">
              {/* Always Visible */}
              <Col xs={6} sm={4} className="text-center mb-3">
                <img
                  src="https://m.media-amazon.com/images/I/71PHl2RQHBL._AC_UY218_.jpg"
                  alt="ASUS OLED Laptop"
                  className="img-fluid"
                  style={{ maxHeight: "200px" }}
                />
              </Col>

              {/* Show on md+ screens */}
              <Col sm={4} className="text-center mb-3 d-none d-sm-block">
                <img
                  src="https://m.media-amazon.com/images/I/71lWuRFiCoL._SX679_.jpg"
                  alt="HP Laptop"
                  className="img-fluid"
                  style={{ maxHeight: "200px" }}
                />
              </Col>

              {/* Show only on xl+ screens */}
              <Col sm={4} className="text-center d-none d-xl-block">
                <img
                  src="https://m.media-amazon.com/images/I/41SBXqV7MSL.jpg"
                  alt="Dell Laptop"
                  className="img-fluid"
                  style={{ maxHeight: "200px" }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
