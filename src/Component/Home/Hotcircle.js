import React, { Component} from 'react';
import './Home.css';

class Hotcircle extends Component {
  
    render() {
        const { circleName } = this.props.data;
        return (
            <div className='circle'>
                <div className='circleName'>{circleName}</div>
            </div>
        );
    }
}
export default Hotcircle;