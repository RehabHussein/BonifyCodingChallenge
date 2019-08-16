import React from 'react';

import classes from './DataRow.css';

const dataRow = (props) => {
    const voteCells = props.venuesList.map((venue,index) => {
        if(index==props.participant.userVote){
            return <td  key={`${index}__${venue.name}`} ><div className='VoteCell'className='ClickedCell'></div></td>
        }
        else{
            return <td  key={`${index}__${venue.name}`}><div className='VoteCell'></div></td> 
        }
    })
  

    
    return (
        <tr>
            <td><input  key='10' value={props.participant.name}></input></td>
            {voteCells}
        </tr>
    );
}
export default dataRow;