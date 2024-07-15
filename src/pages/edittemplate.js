import React, { useState } from 'react';
import Header from '../component/header';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FaPlus } from 'react-icons/fa'; // Importing the plus icon from react-icons
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Edittemplate = ({ data, setData }) => {

  const navigate=useNavigate();



  const [step, setStep] = useState(1);
  const [showProfileSummary, setShowProfileSummary] = useState(false);
  const [showWorkExperience, setShowWorkExperience] = useState(false); 
  const [showProject, setShowProject] = useState(false);
  const [showTechnicalSkills, setShowTechnicalSkills] = useState(false);
  const [workExperiences, setWorkExperiences] = useState([{ id: 1 }]);
  const [projects, setProjects] = useState([{ id: 1 }]);
  const [technicalSkills, setTechnicalSkills] = useState([{ id: 1 }]);
  const [showaddsection,setshowaddsection]=useState(false);
  const [addsection,setaddsection]=useState([{id: 1}]);

  const [education, seteducation] =useState([{id: 1}])

  const handleChange = (e, index = null, section) => {
    const { name, value } = e.target;
    if (section === 'workExperiences') {
      const updatedWorkExperiences = [...workExperiences];
      updatedWorkExperiences[index] = { ...updatedWorkExperiences[index], [name]: value };
      setWorkExperiences(updatedWorkExperiences);
      setData({ ...data, workExperiences: updatedWorkExperiences });
    } else if (section === 'projects') {
      const updatedProjects = [...projects];
      updatedProjects[index] = { ...updatedProjects[index], [name]: value };
      setProjects(updatedProjects);
      setData({ ...data, projects: updatedProjects });
    } else if (section === 'technicalSkills') {
      const updatedTechnicalSkills = [...technicalSkills];
      updatedTechnicalSkills[index] = { ...updatedTechnicalSkills[index], [name]: value };
      setTechnicalSkills(updatedTechnicalSkills);
      setData({ ...data, technicalSkills: updatedTechnicalSkills });
    }
    else if (section === 'addsection') {
      const updatedaddsection = [...addsection];
      updatedaddsection[index] = { ...updatedaddsection[index], [name]: value };
      setaddsection(updatedaddsection);
      setData({ ...data, addsection: updatedaddsection });
    }

    else if(section === 'education'){
      const updatededucation = [...education];
      updatededucation[index]= {...updatededucation[index], [name]: value};
       seteducation(updatededucation)
       setData({...data, education: updatededucation})
  }
    
    
    else {
      setData({ ...data, [name]: value });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(data);

    try{

      const res = await axios.post('http://localhost:5000/resumedata', { data });
      
      if(res.status===200){
        alert("your resume create ")
        navigate('/download')
      }

    }catch(err){
      console.log(err)
    }






  };

  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, { id: workExperiences.length + 1 }]);
  };

  const addProject = () => {
    setProjects([...projects, { id: projects.length + 1 }]);
  };

  const addTechnicalSkill = () => {
    setTechnicalSkills([...technicalSkills, { id: technicalSkills.length + 1 }]);
  };

  const addmoresection = () =>{
      setaddsection([...addsection, {id: addsection.length+1}])
  }

  const addmoreeducation =() =>{
      seteducation([...education, {id: education.length+1}])
  }

  return (
    <div>
      <Header />
      <div className='box-container'>
        <div className='box-text'>
          <h2>
            {step === 1
              ? 'Personal Details'
              : step === 2
              ? 'Education Details'
              : 'Additional Information'}
          </h2>
          <p>
            {step === 1
              ? 'Get started with the basics: your name and contact information.'
              : step === 2
              ? 'Tell us about your educational background.'
              : 'Provide any additional information you want to include.'}
          </p>
        </div>

        <div className='form-container'>
          {step === 1 ? (
            <Form className="custom-form" onSubmit={handleNext}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formFirstName" className="form-group-custom">
                  <Form.Label className="form-label-custom">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={data.firstname || ''}
                    onChange={handleChange}
                    className="form-control-custom"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formLastName" className="form-group-custom">
                  <Form.Label className="form-label-custom">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={data.lastname || ''}
                    onChange={handleChange}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Row>

              <Form.Group controlId="formGridEmail" className="form-group-custom">
                <Form.Label className="form-label-custom">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={data.email || ''}
                  onChange={handleChange}
                  className="form-control-custom"
                />
              </Form.Group>

              <Form.Group controlId="formGridPhone" className="form-group-custom">
                <Form.Label className="form-label-custom">Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={data.phone || ''}
                  onChange={handleChange}
                  className="form-control-custom"
                />
              </Form.Group>
               <div className='parent-btn'>
               <Button
                variant="primary"
                type="submit"
                className="next-button"
              >
                Next
              </Button>


               </div>
              
            </Form>
          ) : step === 2 ? (
            <Form className="custom-form" onSubmit={handleNext}>

               {
                  education.map((education,index)=>(
                    <div key={education.id}>
                      
                      <Row className="mb-3">

         {/* <Form.Group as={Col} controlId="formedusection" className="form-group-custom">
          <Form.Label className="form-label-custom">Section</Form.Label>
          <Form.Control
          type="text"
           name="edusection"
            value={education.edusection || ''}
           onChange={(e) => handleChange(e, index, 'education')}
           className="form-control-custom"
    />
  </Form.Group> */}




          <Form.Group as={Col} controlId="formUniversity" className="form-group-custom">
          <Form.Label className="form-label-custom">University</Form.Label>
          <Form.Control
           type="text"
             name="university"
                value={education.university || ''}
                onChange={(e) => handleChange(e, index, 'education')}
            className="form-control-custom"
    />
            </Form.Group>

           <Form.Group as={Col} controlId="formState" className="form-group-custom">
          <Form.Label className="form-label-custom">State</Form.Label>
         <Form.Control
          type="text"
          name="state"
           value={education.state || ''}
      onChange={(e) => handleChange(e, index, 'education')}
      className="form-control-custom"
    />
  </Form.Group>
</Row>

<Row style={{display: 'flex'}}>
  <Form.Group controlId="formDegree" className="form-group-custom">
    <Form.Label className="form-label-custom">Degree</Form.Label>
    <Form.Control
      type="text"
      name="degree"
      value={education.degree || ''}
      onChange={(e) => handleChange(e, index, 'education')}
      className="form-control-custom"
    />
  </Form.Group>

  <Form.Group controlId="formCGPA" className="form-group-custom">
    <Form.Label className="form-label-custom">CGPA</Form.Label>
    <Form.Control
      type="text"
      name="cgp"
      value={education.cgp || ''}
       onChange={(e) => handleChange(e, index, 'education')}
      className="form-control-custom"
    />
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group as={Col} controlId="formEduStart" className="form-group-custom">
    <Form.Label className="form-label-custom">Start Date</Form.Label>
    <Form.Control
      type="text"
      name="eduStart"
      value={education.eduStart || ''}
      onChange={(e) => handleChange(e, index, 'education')}
      className="form-control-custom"
    />
  </Form.Group>

  <Form.Group as={Col} controlId="formEduEnd" className="form-group-custom">
    <Form.Label className="form-label-custom">End Date</Form.Label>
    <Form.Control
      type="text"
      name="eduEnd"
      value={education.eduEnd || ''}
      onChange={(e) => handleChange(e, index, 'education')}
      className="form-control-custom"
    />
  </Form.Group>
</Row>


                    </div>
                  ))
                  
               }

                     <Button
                    variant="primary"
                    className="add-button"
                    onClick={addmoreeducation}
                  >
                    <FaPlus /> Add More Education
                  </Button>
                




          

                  <div className='parent-btn'>
               <Button
                variant="primary"
                type="submit"
                className="next-button"
              >
                Next
              </Button>


               </div>
            </Form>
          ) : (
            <Form className="custom-form" onSubmit={handleSubmit}>
              <div className='btn-container'>
              <Button className='btn-form'
                variant='primary'
                onClick={() => {
                  setShowProfileSummary(true);
                  setShowWorkExperience(false);
                  setShowProject(false);
                  setShowTechnicalSkills(false);
                  setshowaddsection(false);
                }}
              >
                + Add Profile Summary
              </Button>
              <Button
                variant='primary'
                onClick={() => {
                  setShowProfileSummary(false);
                  setShowWorkExperience(true);
                  setShowProject(false);
                  setShowTechnicalSkills(false);
                  setshowaddsection(false);
                }}
              >
                + Add Work Experience
              </Button>
              <Button
                variant='primary'
                onClick={() => {
                  setShowProfileSummary(false);
                  setShowWorkExperience(false);
                  setShowProject(true);
                  setShowTechnicalSkills(false);
                  setshowaddsection(false);
                }}
              >
                + Add Project Detail
              </Button>
              <Button
                variant='primary'
                onClick={() => {
                  setShowProfileSummary(false);
                  setShowWorkExperience(false);
                  setShowProject(false);
                  setShowTechnicalSkills(true);
                  setshowaddsection(false);
                }}
              >
                + Add Technical Skill
              </Button>


              <Button
                variant='primary'
                onClick={() => {
                  setShowProfileSummary(false);
                  setShowWorkExperience(false);
                  setShowProject(false);
                  setShowTechnicalSkills(false);
                  setshowaddsection(true);
                }}
              >
                + Add More Section
              </Button>
              </div>

              {showProfileSummary && (

                <>
                <Form.Group controlId="formProfileSummary" className="form-group-custom">
                  <Form.Label className="form-label-custom">Section Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="profilesection"
                    value={data.profilesection || ''}
                    onChange={handleChange}
                    className="form-control-custom"
                  />
                </Form.Group>
                   
                <Form.Group controlId="formProfileSummary" className="form-group-custom">
                  <Form.Label className="form-label-custom">Profile Summary</Form.Label>
                  <Form.Control
                    type="text"
                    name="profileSummary"
                    value={data.profileSummary || ''}
                    onChange={handleChange}
                    className="form-control-custom"
                  />
                </Form.Group>
                </>
              )}

              {showWorkExperience && (
                <>
                  {workExperiences.map((workExperience, index) => (
                    <div key={workExperience.id}>
                      <Row className="mb-3">

                      <Form.Group controlId="formworksection" className="form-group-custom">
                  <Form.Label className="form-label-custom">Section Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="worksection"
                    value={data.worksection || ''}
                    onChange={handleChange}
                    className="form-control-custom"
                  />
                </Form.Group>
                        <Form.Group as={Col} controlId={`formRole${index}`} className="form-group-custom">
                          <Form.Label className="form-label-custom">Title</Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            value={workExperience.title || ''}
                            onChange={(e) => handleChange(e, index, 'workExperiences')}
                            className="form-control-custom"
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId={`formCompany${index}`} className="form-group-custom">
                          <Form.Label className="form-label-custom">Company Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="company"
                            value={workExperience.company || ''}
                            onChange={(e) => handleChange(e, index, 'workExperiences')}
                            className="form-control-custom"
                          />
                        </Form.Group>

                        <Form.Group                                                                                                                                                           as={Col} controlId={`formState${index}`} className="form-group-custom">
                          <Form.Label className="form-label-custom">State</Form.Label>
                          <Form.Control
                            type="text"
                            name="state"
                            value={workExperience.state || ''}
                            onChange={(e) => handleChange(e, index, 'workExperiences')}
                            className="form-control-custom"
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId={`formCity${index}`} className="form-group-custom">
                          <Form.Label className="form-label-custom">City</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={workExperience.city || ''}
                            onChange={(e) => handleChange(e, index, 'workExperiences')}
                            className="form-control-custom"
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId={`formWstartdate${index}`} className="form-group-custom">
                          <Form.Label className="form-label-custom">From Date</Form.Label>
                          <Form.Control
                            type="text"
                            name="wstartdate"
                            value={workExperience.wstartdate || ''}
                            onChange={(e) => handleChange(e, index, 'workExperiences')}
                            className="form-control-custom"
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId={`formWenddate${index}`} className="form-group-custom">
                          <Form.Label className="form-label-custom">To Date</Form.Label>
                          <Form.Control
                            type="text"
                            name="wenddate"
                            value={workExperience.wenddate || ''}
                            onChange={(e) => handleChange(e, index, 'workExperiences')}
                            className="form-control-custom"
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId={`formDescription${index}`} className="form-group-custom">
                          <Form.Label className="form-label-custom">Description</Form.Label>
                          <Form.Control
                            type="text"
                            name="des1"
                            value={workExperience.des1 || ''}
                            onChange={(e) => handleChange(e, index, 'workExperiences')}
                            className="form-control-custom"
                          />
                        </Form.Group>
                      </Row>
                    </div>
                  ))}

                  <Button
                    variant="primary"
                    className="add-button"
                    onClick={addWorkExperience}
                  >
                    <FaPlus /> Add Another Work Experience
                  </Button>
                </>
              )}

              {showProject && (
                <>
                  {projects.map((project, index) => (
                    <div key={project.id}>
                      <Row>
                       
                       <Form.Group controlId="formprojectsection" className="form-group-custom">
                  <Form.Label className="form-label-custom">Section Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="projetsection"
                    value={data.projectsection || ''}
                    onChange={handleChange}
                    className="form-control-custom"
                  />
                </Form.Group>



                        <Form.Group as={Col} controlId={`formProjectname${index}`} className="form-group-custom">
                          <Form.Label className="form-label-custom">Project Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="projectname"
                            value={project.projectname || ''}
                            onChange={(e) => handleChange(e, index, 'projects')}
                            className="form-control-custom"
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId={`formProjectlink${index}`} className="form-group-custom">
                          <Form.Label className="form-label-custom">Project Link</Form.Label>
                          <Form.Control
                            type="text"
                            name="projectlink"
                            value={project.projectlink || ''}
                            onChange={(e) => handleChange(e, index, 'projects')}
                            className="form-control-custom"
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId={`formProjecttechnology${index}`} className="form-group-custom">
                          <Form.Label className="form-label-custom">Project Technologies</Form.Label>
                          <Form.Control
                            type="text"
                            name="projecttechnology"
                            value={project.projecttechnology || ''}
                            onChange={(e) => handleChange(e, index, 'projects')}
                            className="form-control-custom"
                          />
                        </Form.Group>
                      </Row>

                      <Form.Group as={Col} controlId={`formProjectdes${index}`} className="form-group-custom">
                        <Form.Label className="form-label-custom">Project Description</Form.Label>
                        <Form.Control
                          type="text"
                          name="projectdes"
                          value={project.projectdes || ''}
                          onChange={(e) => handleChange(e, index, 'projects')}
                          className="form-control-custom"
                        />
                      </Form.Group>
                    </div>
                  ))}

                  <Button
                    variant="primary"
                    className="add-button"
                    onClick={addProject}
                  >
                    <FaPlus /> Add Another Project
                  </Button>
                </>
              )}

              {showTechnicalSkills && (
                <>
                  {technicalSkills.map((skill, index) => (
                    <div key={skill.id}>


                      <Row>

                      <Form.Group controlId="formskillsection" className="form-group-custom">
                  <Form.Label className="form-label-custom">Section Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="skillsection"
                    value={data.skillsection || ''}
                    onChange={handleChange}
                    className="form-control-custom"
                  />
                     </Form.Group>
                      <Form.Group controlId={`formskilltitle${index}`} className="form-group-custom">
                        <Form.Label className="form-label-custom">Skill Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="skilltitle"
                          value={skill.skilltitle || ''}
                          onChange={(e) => handleChange(e, index, 'technicalSkills')}
                          className="form-control-custom"
                        />
                      </Form.Group>

                      <Form.Group controlId={`formSkill${index}`} className="form-group-custom">
                        <Form.Label className="form-label-custom">Skill</Form.Label>
                        <Form.Control
                          type="text"
                          name="skill"
                          value={skill.skill || ''}
                          onChange={(e) => handleChange(e, index, 'technicalSkills')}
                          className="form-control-custom"
                        />
                      </Form.Group>
                      </Row>
                    </div>
                  ))}

                  <Button
                    variant="primary"
                    className="add-button"
                    onClick={addTechnicalSkill}
                  >
                    <FaPlus /> Add Another Skill
                  </Button>
                </>
              )}

               
               {
                  showaddsection && (
                    <>
                       {
                          addsection.map((addsection,index)=>(
                            <div key={addsection.id}>
                               <Form.Group controlId={`formaddsection${index}`} className="form-group-custom">
                               <Form.Label className="form-label-custom">Section Name</Form.Label>
                               <Form.Control
                                type="text"
                                name="sectionname"
                                value={addsection.sectionname || ''}
                                onChange={(e) => handleChange(e, index, 'addsection')}
                                className="form-control-custom"
                                />
                                 </Form.Group>

                                 <Form.Group controlId={`formaddsectiondes${index}`} className="form-group-custom">
                               <Form.Label className="form-label-custom">Section Name</Form.Label>
                               <Form.Control
                                type="text"
                                name="sectiondes"
                                value={addsection.sectiondes || ''}
                                onChange={(e) => handleChange(e, index, 'addsection')}
                                className="form-control-custom"
                                />
                                 </Form.Group>
                               
                            </div>

                          ))
                       }

                   <Button
                    variant="primary"
                    className="add-button"
                    onClick={addmoresection}
                  >
                    <FaPlus /> Add More Section
                  </Button>
                    </>
                  )
               }




             <Link to='/download'> <Button
                variant="primary"
                type="submit"
                className="submit-button"
              
              >
                Submit
              </Button></Link>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edittemplate;
