import React from 'react';
import AuthLabel from './AuthLabel';

const FunctionAuthentication = () => {
    return (
        <div>
            <h4>Authentication (<a href="https://youtu.be/P8cvGw_9J-s?t=4" target="_blank" id="landingFunctionalitiesTimestampLink">0:04</a>)</h4>
            <small>Ribbit uses Django rest framework to build its web APIs. Simple JWT is also used for the authentication library and token generation.</small>
            <ul>
                <li>
                    <b>Registration</b> (simple JWT) <br />
                    <small>A welcome email will be sent to the newly registered email address. User wouldn't have to verify their email in order to access the website, for ease of use purposes.</small>
                </li>
                <li>
                    <b>Login</b> (simple JWT)<br />
                    <small>After logging in, use will be able to access authenticated only functionalities, access specific pages and with a new navigation bar.</small>
                </li>
                <li>
                    <b>Logout</b> <AuthLabel /><br />
                    <small>User can logout of the application anytime they want.</small>
                </li>
                <li>
                    <b>Reset Password</b> <br />
                    <small>User reset their password by entering their email address after clicking 'Forgot your password?'. If the address is available on Ribbit's system, a reset password email will be sent to the user. User will then be able to reset their password following the provided link on their email.</small>
                </li>
            </ul>
        </div>
    )
}

export default FunctionAuthentication;