import React from 'react';
import AuthLabel from './AuthLabel';

const FunctionUserProfile = () => {
    return (
        <div>
            <h4>User Profile (<a href="https://youtu.be/P8cvGw_9J-s?t=1011" target="_blank" id="landingFunctionalitiesTimestampLink">16:51</a>)</h4>
            <small>After registration, a profile will be generated for the newly registered user. User can access their profile from the navigation bar once logged in.</small>
            <ul>
                <li>
                    <b>Profile Page</b> <br />
                    <small>On the profile page, posts created by the user will be shown on the left side, with their profile card on the right side.</small>
                </li>
                <li>
                    <b>Profile Card</b> <br />
                    <small>On user's profile card, there will be a profile gravatar image, username, update user button, cake day (date joined), number of posts and number of comments made.</small>
                </li>
                <li>
                    <b>Gravatar Profile Image</b> <br />
                    <small>Ribbit uses <a href="https://en.gravatar.com/site/implement" target="_blank" id="footerLinks"><b>Gravatar API</b></a> robohash to generate a unique robot-looking profile image for every different users. The robot image is generated using gravatar's email hash. Since emails are unique, so are the gravatar robot images.</small>
                </li>
                <li>
                    <b>Update User</b> <AuthLabel /> <br />
                    <small>User can update their usernames. The updated username will be reflected on every posts and comments made by the user.</small>
                </li>
            </ul>
        </div>
    )
}

export default FunctionUserProfile;