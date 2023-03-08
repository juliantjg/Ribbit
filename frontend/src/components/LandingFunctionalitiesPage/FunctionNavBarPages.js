import React from 'react';
import AuthLabel from './AuthLabel';

const FunctionNavBarPages = () => {
    return (
        <div>
            <h4>Navigation Bar Pages (<a href="https://youtu.be/P8cvGw_9J-s?t=154" target="_blank" id="landingFunctionalitiesTimestampLink">02:34</a>)</h4>
            <small>Though some pages on Ribbit are accessible only for authenticated users, most pages are accessible to outside users.</small>
            <ul>
                <li>
                    <b>Home Page</b> <br />
                    <small>The r/home is default community page of Ribbit. Anyone can create a post on r/home, including users with no communities. User can view the top 5 communities on the right side bar of the home page. User can sort home page posts by the latest post, posts with most comments and posts with most upvotes. User can also search posts on r/home.</small>
                </li>
                <li>
                    <b>My Subribbits</b> <AuthLabel /> <br />
                    <small>This button will trigger a modal pop up that will show all the Subribbits the currently authenticated user either owned or joined as an accepted member.</small>
                </li>
                <li>
                    <b>Communities Page</b> <AuthLabel /> <br />
                    <small>The communities page shows all the communities (Subribbits) on Ribbit. The Subribbit cards shown will provide information such as number of users joined (excluding owner), the status of the user on this Subribbit (owner, accepted member, banned, etc). User unaffiliated with the Subribbit will see no status. User can create a Subribbit on this page's right sidebar.</small>
                </li>
                <li>
                    <b>Explore Page</b> <br />
                    <small>The Explore page is not a community page. Here, user can view all the posts from Ribbit regardless their communities, including r/home. Just like the home page, user can sort posts based on the latest posting date, most comments and most likes. User can also search posts here.</small>
                </li>
                <li>
                    <b>Create a Post</b> <AuthLabel /> <br />
                    <small>By clicking the + button on the navbar, user will be redirected to the create post page.</small>
                </li>
                <li>
                    <b>Notifications</b> <AuthLabel /> <br />
                    <small>The bell button on the navbar will show the current user's notifications.</small>
                </li>
                <li>
                    <b>Profile Dropdown</b> <AuthLabel /> <br />
                    <small>User can access their profile page and the logout button from this dropdown.</small>
                </li>
            </ul>
        </div>
    )
}

export default FunctionNavBarPages;