import React from 'react';
import { Spinner } from 'react-bootstrap';
;


function Loader({ size }) {
    return (
        <Spinner
            animation='border'
            role='status'
            style={{
                height: { size },
                width: { size },
                margin: 'auto',
                display: 'block'
            }}>

        </Spinner>
    );
}

export default Loader;
