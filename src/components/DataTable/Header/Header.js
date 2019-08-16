import React from 'react';

import classes from './Header.css';

const header = (props) =>{
return (
    <div className='Header'>
    <a href={props.venue.url} target='_blank'>{props.venue.name}</a>
    <p className='Category'>{props.venue.category}</p>
    <p>{props.venue.rating}</p>
    </div>
);
}
export default header;