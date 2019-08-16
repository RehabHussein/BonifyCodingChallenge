import React from 'react';

import Header from './Header/Header';
import NewUserRow from './NewUserRow/NewUserRow';
import DataRow from './DataRows/DataRow';
import classes from './VenuesTable.css';

const venuesTable = (props) => {
    const headers = props.venues.map((venue, index) => {
        return <th key={index}><Header venue={venue} /></th>;
    });
    const participantsRows = props.participants.map((participant, index) => {
        return <DataRow
            key={index + 1}
            venuesList={props.venues}
            participant={participant}
        />
    });
    return (
        <table >
            <tbody>
                <tr>
                    <th className='Participants'>
                        Participants
                </th>
                    {headers}
                </tr>
                {participantsRows}
                <NewUserRow
                    key='0'
                    newUser={props.newUser}
                    venuesList={props.venues}
                    updateUser={props.updateUser}
                    updateVotes={props.updateVotes} />
            </tbody>
        </table>
    );
}
export default venuesTable;