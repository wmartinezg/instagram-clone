import React from 'react';
import {graphql} from 'react-apollo'; //{graphql} porque graphql es una sublibreria que esta en react-apollo
import gpl from 'graphql-tag'; // es el que se encarga del query
import Toolbar from '../components/toolbar';

const query = gpl`{
    allUsers {
        username
    }
}
`;

const userItem = (user,i)=><li key={i}>{user.username}</li>

//export default ()=> <h1>Home</h1>
export default graphql(query)(
    ({data: {allUsers=[], loading}}) => [
        <Toolbar />,
        <ul>
            {allUsers.map(userItem)}
        </ul>
    ])
