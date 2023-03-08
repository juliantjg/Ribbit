import React from 'react';
import AuthLabel from './AuthLabel';

const FunctionPosts = () => {
    return (
        <div>
            <h4>Posts (<a href="https://youtu.be/P8cvGw_9J-s?t=326" target="_blank" id="landingFunctionalitiesTimestampLink">05:26</a>)</h4>
            <small>Posts are an integral part of Ribbit, providing user with functionalities to create and update posts, view posts on a certain community, and many more.</small>
            <ul>
                <li>
                    <b>Create Post</b> <AuthLabel /> <br />
                    <small>User can create post providing a title, description text and an NSFW tag. User can also choose to post their post on various Subribbit (they must be the owner or a valid member of the Subribbit). </small>
                </li>
                <li>
                    <b>Post Details</b> <br />
                    <small>User can view snippets of posts depending on pages they are on. Post detail provides user with more details regarding the votes received, full description, community, and a place to view all the comments on the selected post.</small>
                </li>
                <li>
                    <b>Update Post</b> <AuthLabel /> <br />
                    <small>User can update the posts they've made from the post details page.</small>
                </li>
                <li>
                    <b>Delete Post</b> <AuthLabel /> <br />
                    <small>User can delete the posts they've made.</small>
                </li>
                <li>
                    <b>NSFW Tag</b> <AuthLabel /> <br />
                    <small>Posts tagged with NSFW will have their descriptions hidden from unauthenticated users. Authenticated users can only see the description of the NSFW page on the post details page. The post description will always be hidden on the post cards on various pages.</small>
                </li>
                <li>
                    <b>Profanity Censor</b> <br />
                    <small>To keep Ribbit safe, I've implemented python's better_profanity library to censor out words that are listed on the given library. </small>
                </li>
            </ul>
        </div>
    )
}

export default FunctionPosts;