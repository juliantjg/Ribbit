import React from 'react';
import AuthLabel from './AuthLabel';
import { Link } from "react-router-dom";

const FunctionPostComment = () => {
    return (
        <div>
            <h4>Post Commentary (<a href="https://youtu.be/P8cvGw_9J-s?t=567" target="_blank" id="landingFunctionalitiesTimestampLink">09:26</a>)</h4>
            <small>Ribbit provides post commentary functionality where user can create comments and delete their own comments, as well as send a </small>
            <ul>
                <li>
                    <b>Create Comment</b> <AuthLabel /> <br />
                    <small>User can create comments under any posts on Ribbit.</small>
                </li>
                <li>
                    <b>Delete Comment</b> <AuthLabel /> <br />
                    <small>User can delete their own comments.</small>
                </li>
                <li>
                    <b>View Comments</b> <br />
                    <small>By viewing a post details, user can view all the comments on the post with timestamps, number of likes, username and user profile image.</small>
                </li>
                <li>
                    <b>Like Comments</b> <AuthLabel /> <br />
                    <small>User can like a comment of their own or comments made by others. By liking another user's comment, a notification will be sent to the comment owner.</small>
                </li>
                <li>
                    <b>Mention User</b> <AuthLabel /> <br />
                    <small>User can mention other user by putting an @ on the username like this: <Link to="/user/iceyegg" id="commentMention">@iceyegg</Link>. The mentioned user will receive a notification regarding this mention.</small>
                </li>
                <li>
                    <b>Profanity Censor</b> <br />
                    <small>To keep Ribbit safe, I've implemented python's better_profanity library to censor out words that are listed on the given library.</small>
                </li>
            </ul>
        </div>
    )
}

export default FunctionPostComment;