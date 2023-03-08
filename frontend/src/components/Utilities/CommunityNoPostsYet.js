import React from 'react';

function CommunityNoPostsYet({ sub }) {

    function isCommunity() {
        if (sub !== '-') return true;
        return false;
    }

    return (
        <div>
            <div id="communityNoPostsYetPaddingTop">
            </div>
            <div>
                <center>
                    <i class="fas fa-quote-right"></i>
                    <br />
                    {
                        isCommunity() ?
                            (
                                <b>r/{sub} doesn't have any posts yet</b>
                            )
                            :
                            (
                                <b>Explore doesn't have any posts yet</b>
                            )
                    }
                    <br />
                    <small>Start creating posts!</small>
                </center>
            </div>
        </div>
    );
}

export default CommunityNoPostsYet;
