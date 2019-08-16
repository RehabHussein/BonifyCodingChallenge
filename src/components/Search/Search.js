import React from 'react';
import classes from './Search.css';

const search = (props) => {
    return (
        <div className='Search'>
            <input placeholder='10999 Berlin' onChange={(e)=>{props.updateLoc(e.target.value)}}>{props.searchLoc}</input>
            <button onClick={props.search}>Search</button>
        </div>
    );
}

export default search;