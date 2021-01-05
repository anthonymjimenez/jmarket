import React  from 'react';
import { NavLink } from 'react-router-dom';
 

function TagLink({title}) {

  return (
    <>
    <NavLink to={{pathname: `/tags/${title}`}}>
            <p>{title}</p> 
      </NavLink>
  
    </>
  );
}

export default TagLink;