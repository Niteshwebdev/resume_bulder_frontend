import React from 'react';
import '../App.css'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
           <div className="footer-line"></div> 
            <footer className="footer">
        <Container>
          <Row>
            <Col md={6} className="footer-column">
              <h5>Service</h5>
              <ul>
                <li><Link to="/services">Resume Writing</Link></li>
                <li><Link to="/services">Cover Letter Writing</Link></li>
                <li><Link to="/services">LinkedIn Profile</Link></li>
              </ul>
            </Col>
            <Col md={6} className="footer-column">
              <h5>About Us</h5>
              <ul>
                <li><Link to="/about">Our Story</Link></li>
                <li><Link to="/about">Careers</Link></li>
                <li><Link to="/about">Contact Us</Link></li>
              </ul>
              <div className="social-icons">
                <a href="https://www.facebook.com"><FaFacebook /></a>
                <a href="https://www.twitter.com"><FaTwitter /></a>
                <a href="https://www.linkedin.com"><FaLinkedin /></a>
                <a href="https://www.instagram.com"><FaInstagram /></a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
        </div>
    );
}

export default Footer;
