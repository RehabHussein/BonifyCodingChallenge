import React from 'react';

import classes from './NewUserRow.css';

const newUserRow = (props) => {
    let voteCells = [];
    // if (props.venuesList.filter(venueItem => venueItem.clicked).length > 0) {
    //     voteCells = props.venuesList.map((venueItem,index) => {
    //         // if (venueItem.clicked) {
    //         //     return <td  key={index} ><div className='VoteCell'className='ClickedCell'></div></td>;
    //         // }
    //         // else {
    //             return <td key={index}><div className='VoteCell' ></div></td>;
    //         // }
    //     });
    // }
   // else {
        voteCells = props.venuesList.map((venueItem, index) => {
            return (<td key={index}><div className='VoteCell'  onClick={() => props.updateVotes(index)}></div></td>);
        });
  //  }
    return (
        <tr>
            <td><input placeholder='Type here' key='12' value={props.newUser} onChange={(e) => props.updateUser(e.target.value)}></input></td>
            {voteCells}
        </tr>
    );
}
export default newUserRow;