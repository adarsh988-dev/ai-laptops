import React from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

const KeyboardSection = () => {
  return (
    <section className="py-5">
      <Container>
        <div className="bg-teal rounded-4 overflow-hidden">
          <Row className="align-items-center g-0 flex-column-reverse flex-lg-row">
            {/* Left Content */}
            <Col
              xs={11}
              lg={5}
              className="p-4 p-lg-5 text-white text-center text-lg-start"
            >
              <p className="fs-5 mb-3" style={{ opacity: "0.9" }}>
                Find the right keyboard for you
              </p>

              <h2 className="display-5 fw-bold lh-1 mb-4">
                Keyboards That Have
                <br className="d-none d-sm-block" />
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

              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-lg-start">
                <span className="display-5 fw-bold text-warning me-sm-4 mb-3 mb-sm-0">
                  45% Flat
                </span>
                <Button variant="dark" size="lg" className="px-4">
                  Shop Now
                </Button>
              </div>
            </Col>

            {/* Right Content - Image */}
            <Col xs={11} lg={5}>
              <div style={{ height: "100%", minHeight: "250px" }}>
                <img
                  src="https://ailaptopwala.com/wp-content/uploads/2025/02/Dell-600x398.avif"
                  alt="Person using laptop with keyboard"
                  className="img-fluid w-100"
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    maxHeight: "400px",
                  }}
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
