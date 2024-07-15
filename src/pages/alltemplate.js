// components/PdfList.js
import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, CardTitle } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import image from '../template/Basic.jpg';
import Header from '../component/header';
import '../alltemplate.css';
import image2 from '../template/srt-resume.jpg';
import image1 from '../template/myresume.jpg';

const Alltemplate = () => {
  const navigate = useNavigate();

  const templates = [
    { id: 1, img: image1, title: "Popular Template", description: "Description for template 1", redirectPath: "/first" },
    { id: 2, img: image2, title: "Modern Template", description: "Description for template 2", redirectPath: "/second" },
    
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Header />
      <div>
        <h1 className='st'>Select Template</h1>
      </div>

      <Container>
        <Row>
          {templates.map((template) => (
            <Col key={template.id} md={5} className='template-card'>
              <Card className="card-custom" onClick={() => handleCardClick(template.redirectPath)}>
                <Card.Body>
                  <img 
                    src={template.img} 
                    alt="Template preview" 
                    width="100%" 
                    height="auto" 
                    loading="lazy"
                    onError={(e) => e.target.src = 'path/to/default-image.jpg'}
                  />
                  <Button className="hover-button">Use This Template</Button>
                </Card.Body>
              </Card>
              {/* <CardTitle className="card-title">{template.title}</CardTitle> */}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Alltemplate;
