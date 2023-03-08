import React from 'react';
import AuthLabel from './AuthLabel';

const FunctionPostVote = () => {
    return (
        <div>
            <h4>Post Voting System (<a href="https://youtu.be/P8cvGw_9J-s?t=487" target="_blank" id="landingFunctionalitiesTimestampLink">08:07</a>)</h4>
            <small>Just like Reddit, Ribbit's posts can be upvoted/downvoted. The total votes will be as follows: (number of upvotes) - (number of downvotes)</small>
            <ul>
                <li>
                    <b>Upvote</b> <AuthLabel /> <br />
                    <small>A user can upvote both their own posts or somebody else's post. By upvoting posts that are not their own, a notification will be sent to the post owner. User can only send one upvote per post. By upvoting twice, the initial vote will be removed.</small>
                </li>
                <li>
                    <b>Downvote</b> <AuthLabel /> <br />
                    <small>User can also downvote posts, except that downvoting somebody else's post wouldn't notify the post owner. User can only send one downvote per post. By downvoting twice, the initial vote will be removed.</small>
                </li>
            </ul>
        </div>
    )
}

export default FunctionPostVote;