import React from 'react';
import {Link} from 'react-router-dom';

const Test = (props) => {
    return(
        <div>
            Hello From Test
            <div>
            <Link to='/'>Back to Home</Link>
            </div>
        </div>
    );
}

export default Test;