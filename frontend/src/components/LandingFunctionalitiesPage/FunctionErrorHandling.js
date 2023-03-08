import React from 'react';
import AuthLabel from './AuthLabel';

const FunctionErrorHandling = () => {
    return (
        <div>
            <h4>Error Handling (<a href="https://youtu.be/P8cvGw_9J-s?t=1200" target="_blank" id="landingFunctionalitiesTimestampLink">20:00</a>)</h4>
            <small>Error handling for form posting and data retrieving are also provided within the app.</small>
            <ul>
                <li>
                    <b>Posting Data</b> <br />
                    <small>On posting data fails, an error toaster pop up would appear on the top right corner of the screen.</small>
                </li>
                <li>
                    <b>Fetching Data</b> <br />
                    <small>Depending on the error, a replacement page would be shown when a backend error occured.</small>
                </li>
            </ul>
        </div>
    )
}

export default FunctionErrorHandling;