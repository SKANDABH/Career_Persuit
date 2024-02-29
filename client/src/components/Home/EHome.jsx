import React from 'react'
import { Link } from 'react-router-dom';
import image from '../Assets/icons8-add-96.png'
const EHome = () => {
    
  return (
    <div>
      
<Link to="/Postjob"><img src={image} alt="Add" /></Link>

    </div>
  )
}

export default EHome