import React from 'react';
import AuthLabel from './AuthLabel';

const FunctionSubribbits = () => {
    return (
        <div>
            <h4>Subribbits (<a href="https://youtu.be/P8cvGw_9J-s?t=713" target="_blank" id="landingFunctionalitiesTimestampLink">11:53</a>)</h4>
            <small>Immitating Reddit's Subreddit, Ribbit provides user with communities called Subribbits. Functionalities are listed below.</small>
            <ul>
                <li>
                    <b>Create a Subribbit</b> <AuthLabel /> <br />
                    <small>On the Communities page, user can choose to create a Subribbit of their own. There are two types of Subribbits, public and private. User can join public Subribbit without approval, while private Subribbits require the owners to accept user join requests.</small>
                </li>
                <li>
                    <b>Join a Subribbit</b> <AuthLabel /> <br />
                    <small>User can join a public Subribbit, or request to join a private Subribbit. Pending membership users are still considered not a member.</small>
                </li>
                <li>
                    <b>Update a Subribbit</b> <AuthLabel /> <br />
                    <small>As a Subribbit owner, user can update a Subribbit's details and mode (public/private).</small>
                </li>
                <li>
                    <b>View Members</b> <AuthLabel /> <br />
                    <small>As a Subribbit owner, user can view all the members of the community with their statuses.</small>
                </li>
                <li>
                    <b>Members Control</b> <AuthLabel /> <br />
                    <small>As a Subribbit owner, user can set a member's status. This action will send a notification to the member.</small>
                    <ul>
                        <small>
                            <li>Pending - this user has requested to join the current private Subribbit.</li>
                            <li>Accepted - this user has been accepted as a member of this private Subribbit. For public Subribbits, user will be directly assinged this status once they joined the public Subribbit. They can now create posts on this community.</li>
                            <li>Rejected - an owner can set the user status to REJECTED. They will not be part of the community.</li>
                            <li>Banned - an owner can set the user status to BANNED. They will not be part of the community.</li>
                        </small>
                    </ul>
                </li>
                <li>
                    <b>Subribbit Details</b> <br />
                    <small>User can view the Subribbit details on the right sidebar of the Subribbit details page. The Subribbit type (public/private), number of posts and number of joined members will be shown, as well as the 'About Community' and the date of creation.</small>
                </li>
                <li>
                    <b>Subribbit Posts</b> <br />
                    <small>Just like r/home, user can view posts posted on the currently viewed Subribbit. User can also use the sort functionalities as well as search a post title.</small>
                </li>
                <li>
                    <b>Creating Posts</b> <AuthLabel /> <br />
                    <small>By clicking the create post button on the Subribbit page, user will automatically be assigned a Subribbit. User can still choose to change the Subribbit by clicking on the dropdown.</small>
                </li>
            </ul>
        </div>
    )
}

export default FunctionSubribbits;