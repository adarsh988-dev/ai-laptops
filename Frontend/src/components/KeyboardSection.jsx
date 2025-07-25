import React from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

const KeyboardSection = () => {
  return (
    <section className="py-5">
      <Container>
        <div className="bg-teal rounded-4 overflow-hidden">
          <Row className="align-items-center g-0">
            {/* Left Content */}
            <Col lg={6} className="p-4 p-lg-5 text-white">
              <p className="fs-5 mb-3" style={{ opacity: "0.9" }}>
                Find the right keyboard for you
              </p>

              <h2 className="display-4 fw-bold lh-1 mb-4">
                Keyboards That Have
                <br />
                You Covered.
              </h2>

              <div className="mb-3">
                <Badge
                  bg="light"
                  text="dark"
                  className="bg-opacity-25 text-white mb-3"
                >
                  NOW ON SALE
                </Badge>
              </div>

              <div className="d-flex align-items-center">
                <span className="display-4 fw-bold text-warning me-4">
                  45% Flat
                </span>
                <Button variant="dark" size="lg" className="px-4">
                  Shop Now
                </Button>
              </div>
            </Col>

            {/* Right Content - Person with Laptop */}
            <Col lg={6}>
              <div style={{ height: "300px", minHeight: "250px" }}>
                <img
                  src="https://ailaptopwala.com/wp-content/uploads/2025/02/Dell-600x398.avif"
                  alt="Person using laptop with keyboard"
                  className="img-fluid w-150 h-150"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default KeyboardSection;
