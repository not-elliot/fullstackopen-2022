/* eslint-disable react/prop-types */
/* eslint-disable indent */
import React from 'react';

const Person = (props) => {
    console.log('Person props:', props);
    const { person } = props;
    return (
        <span>
            {person.name} {person.number}
        </span>
    );
};

export default Person;