import React, { useState } from 'react';
import Edittemplate from '../../pages/edittemplate'; // Assuming you have a common edit template component
import './fsecond.css';
import axios from 'axios';
import Download from '../../pages/download';

const Second = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    profileSummary: '',
    technicalSkills: [],
    workExperiences: [],
    education: [],
    projects: [],
    addsection: [],
  });

  const handleSave = async (event) => {
    event.preventDefault(); // Prevent default form submission
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
  .msg { padding: 10px; background: #222; position: relative; }
  .msg h1 { color: #fff; }
  .msg a { margin-left: 20px; background: #408814; color: white; padding: 4px 8px; text-decoration: none; }
  .msg a:hover { background: #266400; }

  /* //-- yui-grids style overrides -- */
  body { font-family: Georgia; color: #444; }
  #inner { padding: 10px 80px; margin: 80px auto; background: #f5f5f5; border: solid #666; border-width: 8px 0 2px 0; }
  .yui-gf { margin-bottom: 2em; padding-bottom: 2em; border-bottom: 1px solid #ccc; }

  /* //-- header, body, footer -- */
  #hd { margin: 2.5em 0 3em 0; padding-bottom: 1.5em; border-bottom: 1px solid #ccc; }
  #hd h2 { text-transform: uppercase; letter-spacing: 2px; }
  #bd, #ft { margin-bottom: 2em; }

  /* //-- footer -- */
  #ft { padding: 1em 0 5em 0; font-size: 92%; border-top: 1px solid #ccc; text-align: center; }
  #ft p { margin-bottom: 0; text-align: center; }

  /* //-- core typography and style -- */
  #hd h1 { font-size: 48px; text-transform: uppercase; letter-spacing: 3px; }
  h2 { font-size: 152%; }
  h3, h4 { font-size: 122%; }
  h1, h2, h3, h4 { color: #333; }
  p { font-size: 100%; line-height: 18px; padding-right: 3em; }
  a { color: #990003; }
  a:hover { text-decoration: none; }
  strong { font-weight: bold; }
  li { line-height: 24px; border-bottom: 1px solid #ccc; }
  p.enlarge { font-size: 144%; padding-right: 6.5em; line-height: 24px; }
  p.enlarge span { color: #000; }
  .contact-info { margin-top: 7px; }
  .first h2 { font-style: italic; }
  .last { border-bottom: 0; }

  /* //-- section styles -- */
  a#pdf { display: block; float: left; background: #666; color: white; padding: 6px 50px 6px 12px; margin-bottom: 6px; text-decoration: none; }
  a#pdf:hover { background: #222; }

  .job { position: relative; margin-bottom: 1em; padding-bottom: 1em; border-bottom: 1px solid #ccc; }
  .job h4 { position: absolute; top: 0.35em; right: 0; }
  .job p { margin: 0.75em 0 3em 0; }

  .last { border: none; }
  .skills-list {}
  .skills-list ul { margin: 0; }
  .skills-list li { margin: 3px 0; padding: 3px 0; }
  .skills-list li span { font-size: 152%; display: block; margin-bottom: -2px; padding: 0; }
  .talent { width: 32%; float: left; }
  .talent h2 { margin-bottom: 6px; }

  #srt-ttab { margin-bottom: 100px; text-align: center; }
  #srt-ttab img.last { margin-top: 20px; }

  /* --// override to force 1/8th width grids -- */
  .yui-gf .yui-u { width: 80.2%; }
  .yui-gf div.first { width: 12.3%; }
</style>

      <div id="inner">
        <div id="hd">
          <h1>${data.firstname || 'Jonathan'} ${data.lastname || 'John Doe'}</h1>
          <div class="contact-info">
            <h3><a href="mailto:${data.email || 'name@yourdomain.com'}">${data.email || 'name@yourdomain.com'}</a></h3>
            <h3>${data.phone || '(313) - 867-5309'}</h3>
          </div>
        </div>
        <div id="bd">
          <div id="yui-main">
            <div className="yui-b">
              <div className="yui-gf">
                <div className="yui-u first">
                  <h2>Profile</h2>
                </div>
                <div className="yui-u">
                  <p className="enlarge">${data.profileSummary || 'Profile summary goes here.'}</p>
                </div>
              </div>
              <div className="yui-gf">
                <div className="yui-u first">
                  <h2>Projects</h2>
                </div>
                ${data.projects.length > 0
                  ? data.projects.map((project, index) => `
                    <div key=${index} class="subheading">
                      <h3>
                        <a href=${project.projectlink || '#'}>${project.projectname || 'Project name'}</a> | ${project.projecttechnology || 'Technologies Used'}
                      </h3>
                      <ul>
                        <li>${project.projectdes}</li>
                      </ul>
                    </div>`).join('')
                  : `<div class="subheading"><h3>No projects available</h3></div>`}
              </div>
              <div className="yui-gf">
                <div className="yui-u first">
                  <h2>Skills</h2>
                </div>
                ${data.technicalSkills.length > 0
                  ? data.technicalSkills.map((skill, index) => `
                    <div key=${index}>
                      <div className="yui-u">
                        <div className="talent">
                          <h2>${skill.skilltitle || 'Web Design'}</h2>
                          <p>${skill.skill || 'Skill description goes here.'}</p>
                        </div>
                      </div>
                    </div>`).join('')
                  : `<div>No skills listed.</div>`}
              </div>
              <div className="yui-gf">
                <div className="yui-u first">
                  <h2>Experience</h2>
                </div>
                ${data.workExperiences.length > 0
                  ? data.workExperiences.map((experience, index) => `
                    <div key=${index} className="yui-u">
                      <div className="job">
                        <h2>${experience.company || 'Company'} ${experience.city}, ${experience.state}</h2>
                        <h3>${experience.title || 'Job Title'}</h3>
                        <h4>${experience.wstartdate || 'Year'} - ${experience.wenddate || 'Year'}</h4>
                        <p>${experience.des1 || 'Job description goes here.'}</p>
                      </div>
                    </div>`).join('')
                  : `<div>No work experiences listed.</div>`}
              </div>
              <div className="yui-gf last">
                <div className="yui-u first">
                  <h2>Education</h2>
                </div>
                ${data.education.length > 0
                  ? data.education.map((edu, index) => `
                    <div key=${index} className="yui-u">
                      <h2>${edu.university || 'University'} - ${edu.state || 'State'} ${edu.eduStart || 'Year'} - ${edu.eduEnd || 'Year'}</h2>
                      <h3>${edu.degree || 'Degree'} — <strong>${edu.cgp || 'GPA'}</strong></h3>
                    </div>`).join('')
                  : `<div>No education details available.</div>`}
              </div>
              ${data.addsection.length > 0
                ? data.addsection.map((addsection, index) => `
                  <div key=${index} className="yui-gf">
                    <div className="yui-u first">
                      <h2>${addsection.sectionname}</h2>
                    </div>
                    <p>${addsection.sectiondes}</p>
                  </div>`).join('')
                : ''}
            </div>
          </div>
        </div>
        <div id="ft">
          <p>${data.firstname || 'Jonathan'} ${data.lastname || 'John Doe'} <a href="mailto:${data.email || 'name@yourdomain.com'}">${data.email || 'name@yourdomain.com'}</a> — ${data.phone || '(313) - 867-5309'}</p>
        </div>
      </div>
    `;
  };

  return (
    <div>
      <Edittemplate data={data} setData={setData} />
        <Download handleSave={handleSave}/>

      <style
    dangerouslySetInnerHTML={{
      __html:
        "\n       \n.msg { padding: 10px; background: #222; position: relative; }\n.msg h1 { color: #fff;  }\n.msg a { margin-left: 20px; background: #408814; color: white; padding: 4px 8px; text-decoration: none; }\n.msg a:hover { background: #266400; }\n\n/* //-- yui-grids style overrides -- */\nbody { font-family: Georgia; color: #444; }\n#inner { padding: 10px 80px; margin: 80px auto; background: #f5f5f5; border: solid #666; border-width: 8px 0 2px 0; }\n.yui-gf { margin-bottom: 2em; padding-bottom: 2em; border-bottom: 1px solid #ccc; }\n\n/* //-- header, body, footer -- */\n#hd { margin: 2.5em 0 3em 0; padding-bottom: 1.5em; border-bottom: 1px solid #ccc }\n#hd h2 { text-transform: uppercase; letter-spacing: 2px; }\n#bd, #ft { margin-bottom: 2em; }\n\n/* //-- footer -- */\n#ft { padding: 1em 0 5em 0; font-size: 92%; border-top: 1px solid #ccc; text-align: center; }\n#ft p { margin-bottom: 0; text-align: center;   }\n\n/* //-- core typography and style -- */\n#hd h1 { font-size: 48px; text-transform: uppercase; letter-spacing: 3px; }\nh2 { font-size: 152% }\nh3, h4 { font-size: 122%; }\nh1, h2, h3, h4 { color: #333; }\np { font-size: 100%; line-height: 18px; padding-right: 3em; }\na { color: #990003 }\na:hover { text-decoration: none; }\nstrong { font-weight: bold; }\nli { line-height: 24px; border-bottom: 1px solid #ccc; }\np.enlarge { font-size: 144%; padding-right: 6.5em; line-height: 24px; }\np.enlarge span { color: #000 }\n.contact-info { margin-top: 7px; }\n.first h2 { font-style: italic; }\n.last { border-bottom: 0 }\n\n\n/* //-- section styles -- */\n\na#pdf { display: block; float: left; background: #666; color: white; padding: 6px 50px 6px 12px; margin-bottom: 6px; text-decoration: none;  }\na#pdf:hover { background: #222; }\n\n.job { position: relative; margin-bottom: 1em; padding-bottom: 1em; border-bottom: 1px solid #ccc; }\n.job h4 { position: absolute; top: 0.35em; right: 0 }\n.job p { margin: 0.75em 0 3em 0; }\n\n.last { border: none; }\n.skills-list {  }\n.skills-list ul { margin: 0; }\n.skills-list li { margin: 3px 0; padding: 3px 0; }\n.skills-list li span { font-size: 152%; display: block; margin-bottom: -2px; padding: 0 }\n.talent { width: 32%; float: left }\n.talent h2 { margin-bottom: 6px; }\n\n#srt-ttab { margin-bottom: 100px; text-align: center;  }\n#srt-ttab img.last { margin-top: 20px }\n\n/* --// override to force 1/8th width grids -- */\n.yui-gf .yui-u{width:80.2%;}\n.yui-gf div.first{width:12.3%;}\n\n\n\n\t   "
    }}
  />
      <form onSubmit={handleSave}>

        <div className='container1'>
          <div id="doc2" className="yui-t7">
            <div id="inner">
              {/* Header */}
              <div id="hd">
                <div className="yui-gc">
                  <div className="yui-u first">
                    <h1>{data.firstname || 'Jonathan'} {data.lastname || 'John Doe'}</h1>
                  </div>
                  <div className="yui-u">
                    <div className="contact-info">
                      <h3>
                        <a href={`mailto:${data.email || 'name@yourdomain.com'}`}>{data.email || 'name@yourdomain.com'}</a>
                      </h3>
                      <h3>{data.phone || '(313) - 867-5309'}</h3>
                    </div>
                  </div>
                </div>
              </div>
              {/* Body */}
              <div id="bd">
                <div id="yui-main">
                  <div className="yui-b">
                    <div className="yui-gf">
                      <div className="yui-u first">
                        <h2>Profile</h2>
                      </div>
                      <div className="yui-u">
                        <p className="enlarge">
                          {data.profileSummary || 'Profile summary goes here.'}
                        </p>
                      </div>
                    </div>
                    <div className="yui-gf">
                      <div className="yui-u first">
                        <h2>Projects</h2>
                      </div>
                      {data.projects.length > 0 ? (
                        data.projects.map((project, index) => (
                          <div key={index} className='subheading'>
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
                          <h3>No projects available</h3>
                        </div>
                      )}
                    </div>
                    <div className="yui-gf">
                      <div className="yui-u first">
                        <h2>Skills</h2>
                      </div>
                      {data.technicalSkills.length > 0 ? (
                        data.technicalSkills.map((skill, index) => (
                          <div key={index}>
                            <div className="yui-u">
                              <div className="talent">
                                <h2>{skill.skilltitle || 'Web Design'}</h2>
                                <p>{skill.skill || 'Skill description goes here.'}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>No skills listed.</div>
                      )}
                    </div>
                    <div className="yui-gf">
                      <div className="yui-u first">
                        <h2>Experience</h2>
                      </div>
                      {data.workExperiences.length > 0 ? (
                        data.workExperiences.map((experience, index) => (
                          <div key={index} className="yui-u">
                            <div className="job">
                              <h2>{experience.company || 'Company'} {experience.city}, {experience.state}</h2>
                              <h3>{experience.title || 'Job Title'}</h3>
                              <h4>{experience.wstartdate || 'Year'} - {experience.wenddate || 'Year'}</h4>
                              <p>{experience.des1 || 'Job description goes here.'}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>No work experiences listed.</div>
                      )}
                    </div>
                    <div className="yui-gf last">
                      <div className="yui-u first">
                        <h2>Education</h2>
                      </div>
                      {data.education.length > 0 ? (
                        data.education.map((edu, index) => (
                          <div key={index} className="yui-u">
                            <h2>{edu.university || 'University'} - {edu.state || 'State'} {edu.eduStart || 'Year'} - {edu.eduEnd || 'Year'}</h2>
                            <h3>{edu.degree || 'Degree'} — <strong>{edu.cgp || 'GPA'}</strong></h3>
                          </div>
                        ))
                      ) : (
                        <div>No education details available.</div>
                      )}
                    </div>
                    {data.addsection.length > 0 ? (
                      data.addsection.map((addsection, index) => (
                        <div key={index} className="yui-gf">
                          <div className="yui-u first">
                            <h2>{addsection.sectionname}</h2>
                          </div>
                          <p>{addsection.sectiondes}</p>
                        </div>
                      ))
                    ) : ''}
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div id="ft">
                <p>{data.firstname || 'Jonathan'} {data.lastname || 'John Doe'} <a href={`mailto:${data.email || 'name@yourdomain.com'}`}>{data.email || 'name@yourdomain.com'}</a> — {data.phone || '(313) - 867-5309'}</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Second;
