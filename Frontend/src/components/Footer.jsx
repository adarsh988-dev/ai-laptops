import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTelegram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-dark text-white bg-dark">
      <Container className="py-5">
        <Row className="g-4">
          {/* Company Info */}
          <Col xs={12} md={6} lg={3}>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="bg-orange rounded d-flex align-items-center justify-content-center me-2"
                  style={{ width: "40px", height: "40px" }}
                >
                  <span className="text-white fw-bold">A</span>
                </div>
              </div>
              <div className="mb-3">
                <p className="text-muted small mb-1">Call us 24/7</p>
                <p className="h5 fw-bold mb-2">+91 9893496163</p>
                <div className="small text-muted">
                  <p className="mb-1">
                    LB -21 B-Block Silver Mall 8-A, RNT Marg Indore
                  </p>
                  <p className="mb-1">452001</p>
                  <p className="text-info mb-0">support@ailaptopwala.com</p>
                </div>
              </div>
              <div className="d-flex flex-wrap">
                <a href="#" className="footer-link me-3 mb-2">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="footer-link me-3 mb-2">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="footer-link me-3 mb-2">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="footer-link me-3 mb-2">
                  <FaYoutube size={20} />
                </a>
                <a href="#" className="footer-link mb-2">
                  <FaTelegram size={20} />
                </a>
              </div>
            </div>
          </Col>

          {/* Our Story */}
          <Col xs={6} md={6} lg={2}>
            <h5 className="text-light mb-3">Our Story</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="footer-link">
                  Company Profile
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Our Facility
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Commitment To Quality
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contract Manufacturing
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Our Awards
                </a>
              </li>
            </ul>
          </Col>

          {/* Categories */}
          <Col xs={6} md={6} lg={2}>
            <h5 className="text-light mb-3">Categories</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="footer-link">
                  Smartphone
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Gaming Laptop
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Smart Home
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Major Appliances
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Technologies
                </a>
              </li>
            </ul>
          </Col>

          {/* Quick Link */}
          <Col xs={6} md={6} lg={2}>
            <h5 className="text-light mb-3">Quick Link</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="footer-link">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Subscription
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Announcements
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  FAQ's
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Us */}
          <Col xs={6} md={6} lg={3}>
            <h5 className="text-light mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-teal text-decoration-none">
                  Become a Seller
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Terms & Condition
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Career with us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Consumer enquiry
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Bottom Section */}
        <hr className="border-secondary my-4" />
        <Row className="align-items-center text-center text-md-start">
          <Col xs={12} md={6} className="mb-3 mb-md-0">
            <p className="text-muted small mb-0">
              © 2025 Created by - It Place Technology.
            </p>
          </Col>
          <Col xs={12} md={6}>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end align-items-center">
              <span className="text-muted small me-3">
                We Use Safe Payment:
              </span>
              <div className="d-flex flex-wrap">
                <span className="bg-white text-dark px-2 py-1 rounded me-2 mb-1 small fw-bold">
                  VISA
                </span>
                <span className="bg-white text-dark px-2 py-1 rounded me-2 mb-1 small fw-bold">
                  UPI
                </span>
                <span className="bg-white text-dark px-2 py-1 rounded me-2 mb-1 small fw-bold">
                  Skrill
                </span>
                <span className="bg-white text-dark px-2 py-1 rounded mb-1 small fw-bold">
                  Apple Pay
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
