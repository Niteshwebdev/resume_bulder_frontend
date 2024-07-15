import React from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';

const Download = ({ handleSave }) => {
 




  return (
    <div className='download-btn'>
    <Button onClick={handleSave}>Download Pdf
    </Button>
    </div>
  );
};

export default Download;
