import React, { useState } from 'react';
import Edittemplate from '../../pages/edittemplate';
import './fstyle.css';
import axios from 'axios';
import Download from '../../pages/download';
import Button from 'react-bootstrap/esm/Button';

const First = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    edusection: 'Education',
    education: [],
    profilesection: 'Profile Summary',
    profileSummary: '',
    workExperiences: [],
    projects: [],
    technicalSkills: [],
    addsection: [],
  });

  const handleSave = async () => {
    const htmlContent = generateHtmlContent();
    
    try {
      const response = await axios.post('http://localhost:5000/savepdf', { htmlContent }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert('PDF saved successfully');
    } catch (error) {
      console.error('Error saving PDF:', error);
      alert('Failed to save PDF');
    }
  };

  const generateHtmlContent = () => {
    return `
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container1 {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        header {
          text-align: center;
          margin-bottom: 20px;
        }
        h1 {
          margin: 0;
          font-size: 2.5em;
        }
        h2 {
          border-bottom: 2px solid #000;
          padding-bottom: 5px;
          color: #000;
        }
        .subheading {
          margin-top: 10px;
          margin-bottom: 10px;
        }
        ul {
          list-style-type: disc;
          padding-left: 20px;
        }
        .next-line {
          white-space: pre-wrap; /* Allows text to wrap and preserve whitespace */
          overflow-wrap: break-word; /* Breaks long words if necessary */
        }
      </style>
      <div>
        <header>
          <h1>${data.firstname || 'First Name'} ${data.lastname || 'Last Name'}</h1>
          <p>
            ${data.phone || 'Phone'} | 
            <a href="mailto:${data.email}">${data.email || 'Email'}</a> |
            <a href="https://linkedin.com/in/nitesh-baghel-287">linkedin.com/in/nitesh-baghel-287</a> | 
            <a href="https://github.com/Niteshwebdev">github.com/Niteshwebdev</a>
          </p>
        </header>
        <section>
          <h2>${data.edusection || 'Education'}</h2>
          ${data.education.length > 0 ? data.education.map((edu, index) => `
            <div class="subheading" key=${index}>
              <h3>${edu.university || 'University'}, ${edu.state || 'State'}</h3>
              <p>${edu.degree || 'Degree'}</p>
              <h3>CGPA: ${edu.cgp}</h3>
              <p>${edu.eduStart || 'Start Date'} -- ${edu.eduEnd || 'End Date'}</p>
            </div>
          `).join('') : `
            <div class="subheading">
              <h3>${data.university || 'University'}, ${data.state || 'State'}</h3>
              <p>${data.degree || 'Degree'}</p>
              <h3>CGPA: ${data.cgp}</h3>
              <p>${data.eduStart || 'Start Date'} -- ${data.eduEnd || 'End Date'}</p>
            </div>
          `}
        </section>
        <section>
          <h2>${data.profilesection || 'Profile Summary'}</h2>
          <p class="next-line">${data.profileSummary || `I am recently graduated...`}</p>
        </section>
        <section>
          <h2>Work Experience</h2>
          ${data.workExperiences.length > 0 ? data.workExperiences.map((experience, index) => `
            <div class='subheading' key=${index}>
              <h3>${experience.title || 'Web Development'}, ${experience.company || 'Infolabz'}</h3>
              <p>${experience.wstartdate || 'July 2023'} -- ${experience.wenddate || 'May 2024'}</p>
              <ul>
                <li class='next-line'>${experience.des1 || `Developed full-stack web applications...`}</li>
              </ul>
            </div>
          `).join('') : `
            <div class='subheading'>
              <h3>Web Development, Infolabz</h3>
              <p>July 2023 -- May 2024</p>
              <ul>
                <li>Developed full-stack web applications utilizing...</li>
              </ul>
            </div>
          `}
        </section>
        <section>
          <h2>Projects</h2>
          ${data.projects.length > 0 ? data.projects.map((project, index) => `
            <div class='subheading' key=${index}>
              <h3>
                <a href="${project.projectlink || '#'}">${project.projectname || 'Project name'}</a> | ${project.projecttechnology || 'Technologies Used'}
              </h3>
              <ul>
                <li class='next-line'>${project.projectdes}</li>
              </ul>
            </div>
          `).join('') : `
            <div class="subheading">
              <h3><a href="https://github.com/Niteshwebdev/News_api">Api Based News Website</a> | React.js, Rest API</h3>
              <ul>
                <li>Developed a dynamic news website leveraging...</li>
              </ul>
            </div>
          `}
        </section>
        <section>
          <h2>Technical Skills</h2>
          ${data.technicalSkills.length > 0 ? data.technicalSkills.map((skill, index) => `
            <div key=${index}>
              <ul>
                <li><strong>${skill.skilltitle + ': ' || 'Languages: '}</strong>${skill.skill || 'Javascript, Python, Java, SQL'}</li>
              </ul>
            </div>
          `).join('') : `
            <div>
              <ul>
                <li><strong>Languages:</strong> Javascript, Python, Java, SQL</li>
              </ul>
            </div>
          `}
        </section>
        ${data.addsection.length > 0 ? data.addsection.map((section, index) => `
          <section key=${index}>
            <h2>${section.sectionname}</h2>
            <p class="next-line">${section.sectiondes}</p>
          </section>
        `).join('') : ''}
      </div>
    `;
  };

  return (
    <div>
      <Edittemplate data={data} setData={setData} />
     <Download handleSave={handleSave}/>
      <div className='t'>
        <div className="container1">
          <header>
            <h1>{data.firstname || 'First Name'} {data.lastname || 'Last Name'}</h1>
            <p>
              {data.phone || 'Phone'} | 
              <a href={`mailto:${data.email}`}>{data.email || 'Email'}</a> |
              <a href="https://linkedin.com/in/nitesh-baghel-287">linkedin.com/in/nitesh-baghel-287</a> | 
              <a href="https://github.com/Niteshwebdev">github.com/Niteshwebdev</a>
            </p>
          </header>
          <section>
            <h2>{data.edusection || 'Education'}</h2>
            {data.education.length > 0 ? (
              data.education.map((edu, index) => (
                <div key={index}>
                  <div className="subheading">
                    <h3>{edu.university || 'University'}, {edu.state || 'State'}</h3>
                    <p>{edu.degree || 'Degree'}</p>
                    <h3>CGPA: {edu.cgp}</h3>
                    <p>{edu.eduStart || 'Start Date'} -- {edu.eduEnd || 'End Date'}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="subheading">
                  <h3>{data.university || 'University'}, {data.state || 'State'}</h3>
                  <p>{data.degree || 'Degree'}</p>
                  <h3>CGPA: {data.cgp}</h3>
                  <p>{data.eduStart || 'Start Date'} -- {data.eduEnd || 'End Date'}</p>
                </div>
              </div>
            )}
          </section>
          <section>
            <h2>{data.profilesection || 'Profile Summary'}</h2>
            <p className="next-line">{data.profileSummary || `I am recently graduated...`}</p>
          </section>
          <section>
            <h2>Work Experience</h2>
            {data.workExperiences.length > 0 ? (
              data.workExperiences.map((experience, index) => (
                <div className='subheading' key={index}>
                  <h3>{experience.title || 'Web Development'}, {experience.company || 'Infolabz'}</h3>
                  <p>{experience.wstartdate || 'July 2023'} -- {experience.wenddate || 'May 2024'}</p>
                  <ul>
                    <li>{experience.des1 || `Developed full-stack web applications...`}</li>
                  </ul>
                </div>
              ))
            ) : (
              <div className='subheading'>
                <h3>Web Development, Infolabz</h3>
                <p>July 2023 -- May 2024</p>
                <ul>
                  <li>Developed full-stack web applications utilizing...</li>
                </ul>
              </div>
            )}
          </section>
          <section>
            <h2>Projects</h2>
            {data.projects.length > 0 ? (
              data.projects.map((project, index) => (
                <div className='subheading' key={index}>
                  <h3>
                    <a href={project.projectlink || '#'}>{project.projectname || 'Project name'}</a> | {project.projecttechnology || 'Technologies Used'}
                  </h3>
                  <ul>
                    <li>{project.projectdes}</li>
                  </ul>
                </div>
              ))
            ) : (
              <div className="subheading">
                <h3><a href="https://github.com/Niteshwebdev/News_api">Api Based News Website</a> | React.js, Rest API</h3>
                <ul>
                  <li>Developed a dynamic news website leveraging...</li>
                </ul>
              </div>
            )}
          </section>
          <section>
            <h2>Technical Skills</h2>
            {data.technicalSkills.length > 0 ? (
              data.technicalSkills.map((skill, index) => (
                <div key={index}>
                  <ul>
                    <li><strong>{skill.skilltitle + ': ' || 'Languages: '}</strong>{skill.skill || 'Javascript, Python, Java, SQL'}</li>
                  </ul>
                </div>
              ))
            ) : (
              <div>
                <ul>
                  <li><strong>Languages:</strong> Javascript, Python, Java, SQL</li>
                </ul>
              </div>
            )}
          </section>
          {data.addsection.length > 0 ? (
            data.addsection.map((section, index) => (
              <section key={index}>
                <h2>{section.sectionname}</h2>
                <p className="next-line">{section.sectiondes}</p>
              </section>
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default First;
