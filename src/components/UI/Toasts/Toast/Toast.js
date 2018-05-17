import React, {Component} from 'react';
import classes from './Toast.css';

class Toast extends Component {
  
  // to prevent unnecessary rendering when a new toast is added/removed from the collection.
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount = () => {
    setTimeout(() => {
        this.props.timedOut(this.props.id);
    }, 3000);
  }

  render () {
    
    return (
          <li
            className={classes.Toast}
            id={this.props.id}
            onClick={()=>this.props.clicked(this.props.id)}
            style={{backgroundColor: this.props.color}}
            >
            <span>x</span>
            <p className={classes.Content}>{this.props.text}</p>
          </li>
    )
  }
}

export default Toast;