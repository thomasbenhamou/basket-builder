import React from 'react';
import classes from './Card.css';

const card = (props) => {

  return (
      <div
        className={classes.Card}
        style={props.style}
        onClick={props.clicked}
        >
      <div className={classes.Title}><span role="img" aria-label="image">&#10003;</span> {props.title}</div>
      </div>
  )
}

export default card;