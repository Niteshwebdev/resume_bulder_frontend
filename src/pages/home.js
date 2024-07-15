import React from 'react';
import { Container, Row, Col, Carousel, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import image from '../template/Basic.jpg'

import Header from "../component/header"
import { Link } from 'react-router-dom';
import MultiCarousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Footer from '../component/footer';
import image2 from '../template/srt-resume.jpg';
import image1 from '../template/myresume.jpg';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();


  const templates = [
    { id: 1, img: image1, title: "Popular Template", description: "Description for template 1", redirectPath: "/first" },
    { id: 2, img: image2, title: "Modern Template", description: "Description for template 2", redirectPath: "/second" },
    
  ];
  
  const handleCardClick = (path) => {
    navigate(path);
  };






  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


    return (
      
       <div>
        <Header/>
<Container fluid className="home-page">
      <Row className="align-items-center min-vh-100">
        <Col md={6} className="left-side">
          <div className="content">
            <h4>BOOST YOUR CAREER CHASING</h4>
            <h1>Land Your Dream Job <br/> With Alerdy Made Eye </h1> <h2 > Catchy Resumes.</h2>
            <p>Create aawesome resume with one of <br/>our template in just few second</p>
            <Link to="/signup"><Button variant="primary">Create Resume for free</Button></Link>
          </div>
        </Col>
        <Col md={6} className="right-side">
          <img src={image} alt="Resume Illustration" className="img-fluid" />
        </Col>
      </Row>
    </Container>



    <div className='feature'>
      <h1>Feature</h1>

      <div className='sec'>
        <h2>30+ Template</h2>
        <p>Experienced project manager with over 5 years in leading cross-functional teams to deliver projects on time and within budget. Skilled in strategic planning, problem-solving, and driving efficiency. Proven ability to enhance team collaboration and leverage technology for innovation.</p>

      </div>

     

      <div class='left'>
    <div class='box'>
      <img src={image} alt='Template Image'/>
    </div>
    <div className='right'>
      <h2>30+ Template</h2>
      <p>Experienced project manager with over 5 years in leading cross-functional teams to deliver projects on time and within budget. Skilled in strategic planning, problem-solving, and driving efficiency. Proven ability to enhance team collaboration and leverage technology for innovation.</p>
      </div>
  </div>

      

      <div className='cus'>
        <h2>Easy to customize</h2>
        <p>Experienced project manager with over 5 years in leading cross-functional teams to deliver projects on time and within budget. Skilled in strategic planning, problem-solving, and driving efficiency. Proven ability to enhance team collaboration and leverage technology for innovation.</p>

      </div>



    </div>

       <div className='allcar'>
        <h1>Pick one of many world-class templates and build your</h1>
        <h1>resume in minutes </h1>
    <div className='carousel-container'>
                    <MultiCarousel
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={500}
                        keyBoardControl={true}
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        itemClass="carousel-item-padding-40-px"
                    >
                        {templates.map(template => (
                            <div key={template.id} className="template-card">
                                <img src={template.img} alt={template.title} className="img-fluid" />
                                <Button variant="primary" onClick={()=>handleCardClick(template.redirectPath)}>Use this template</Button>
                            </div>
                        ))}
                    </MultiCarousel>
                </div>
                <div>
              
                <div className="last-btn-container">
            <div className='last-btn'>
              <Link to='/alltemplate'>  <Button className="colorful-button" variant="primary">See All Templates</Button></Link>
            </div>
        </div>


                </div>
               </div>




        <Footer/>

</div>

    );
}

export default Home;
