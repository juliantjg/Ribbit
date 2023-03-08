import React from 'react';

function GeneralGetErrorPage() {
    return (
        <div>
            <div id="communityNoPostsYetPaddingTop">
            </div>
            <div>
                <center>
                    <i class="fas fa-exclamation-triangle"></i>
                    <br />
                    <b>Oops! Something Is Broken!</b>
                    <br />
                    <br />
                    <small>An unexpected error came up when data is being fetched. <b>This is my fault.</b>
                        <br />
                        Please come back later, as I'd be fixing this issue as soon as possible.</small>
                </center>
            </div>
        </div>
    );
}

export default GeneralGetErrorPage;
