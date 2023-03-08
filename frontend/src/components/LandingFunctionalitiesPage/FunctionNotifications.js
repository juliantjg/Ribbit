import React from 'react';
import AuthLabel from './AuthLabel';

const FunctionNotifications = () => {
    return (
        <div>
            <h4>Notifications (<a href="https://youtu.be/P8cvGw_9J-s?t=1140" target="_blank" id="landingFunctionalitiesTimestampLink">19:00</a>)</h4>
            <small>Just like any social media websites, authenticated users can view their notifications on the right side of the navigation bar. The Ribbit's frontend notification feature is implemented using offcanvas for its right hand side navigation bar pop up.</small>
            <ul>
                <li>
                    <b>View Notifications</b> <AuthLabel /> <br />
                    <small>User can view all their notifications with a notification title, timestamp and full description.</small>
                </li>
                <li>
                    <b>Functions Triggering Notifications</b> <br />
                    <small>There are dozens of functionalities on Ribbit that will trigger notification for the authenticated user. For instance, when user requested to join a Subribbit, the owner will get a notifiation. By clicking the notification, the owner will be redirected to the Subribbit page. Actions such as liking comments, upvoting posts, etc will also trigger notification to the respective users.</small>
                </li>
            </ul>
        </div>
    )
}

export default FunctionNotifications;