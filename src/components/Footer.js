import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3 text-secondary fs-7'>
            &copy; Copyright Plant the Seeds
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
