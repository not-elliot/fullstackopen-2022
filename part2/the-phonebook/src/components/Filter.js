import React from 'react';

const Filter = ({ value, setter }) => {
    return (
        <div>
            filter shown with 
            <input onChange={(e) => setter(e.target.value)} value={value} />
        </div>
    );
}

export default Filter;