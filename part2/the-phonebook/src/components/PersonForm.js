import React from 'react';

const PersonForm = ({ submitHandler, nameSetter, numberSetter, nameValue, numberValue }) => {
    return (
        <form onSubmit={submitHandler}>
            <div>
            name: <input onChange={(e) => nameSetter(e.target.value)} value={nameValue} />
            </div>
            <div>
            number: <input onChange={(e) => numberSetter(e.target.value)} value={numberValue} />
            </div>
            <div>
            <button type='submit'>add</button>
            </div>
        </form>
    );
}

export default PersonForm;