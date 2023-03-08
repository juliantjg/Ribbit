import React from 'react';
import { Alert } from 'react-bootstrap';
;


function Message({ size, color, children }) {
    return (
        <Alert
            variant={color}>
            {children}
        </Alert>
    );
}

export default Message;
