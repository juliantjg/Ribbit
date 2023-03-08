import React from 'react';

function UserNoPostsYet({ username }) {
    return (
        <div>
            <div id="userNoPostsYetPaddingTop">
            </div>
            <div>
                <center>
                    <i class="fas fa-quote-right"></i>
                    <br />
                    <b>u/{username} hasn't posted anything</b>
                </center>
            </div>
        </div>
    );
}

export default UserNoPostsYet;
