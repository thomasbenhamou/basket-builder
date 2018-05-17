import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div 
      className={classes.BuildControl}
      onClick={() => props.added(props.type, props.price)}>
      <img src={require('../../../../assets/products-img/' + props.image + '.png')} alt={props.label}/>
      <div className={classes.Label}>
        {props.label}
      </div>
      <div>
      {props.price}€ <span style={{fontSize: '0.7rem'}}>/kg</span>
      </div>
    </div>
  
)

export default buildControl;
