import React from 'react';
import FunctionAuthentication from './FunctionAuthentication';
import FunctionNavBarPages from './FunctionNavBarPages';
import FunctionPosts from './FunctionPosts';
import FunctionPostVote from './FunctionPostVote';
import FunctionPostComment from './FunctionPostComment';
import FunctionSubribbits from './FunctionSubribbits';
import FunctionUserProfile from './FunctionUserProfiile';
import FunctionNotifications from './FunctionNotifications';
import FunctionErrorHandling from './FunctionErrorHandling';

const index = () => {
    return (
        <div id="about">
            <div class="row pt-5">
                <div>
                    <div class="row">
                        <div class="col-md-7 pr-5">
                            <div id="landingFunctionalitiesListOfFunctions" class="p-3 rounded">
                                <div class="row">
                                    <h1>Features</h1>
                                </div>
                                <b>Or you can watch that video on the right</b>
                                <br />
                                <small>Functions labelled with <span class="badge badge-secondary">AUTH</span> indicates that their access is limited to only authenticated users. Click on the timestamps to jump to a specific part of the video.</small>
                                <hr />
                                <FunctionAuthentication />
                                <hr />
                                <FunctionNavBarPages />
                                <hr />
                                <FunctionPosts />
                                <hr />
                                <FunctionPostVote />
                                <hr />
                                <FunctionPostComment />
                                <hr />
                                <FunctionSubribbits />
                                <hr />
                                <FunctionUserProfile />
                                <hr />
                                <FunctionNotifications />
                                <hr />
                                <FunctionErrorHandling />
                            </div>
                        </div>
                        <div class="col-md-5" align="right">
                            <iframe id="landingFunctionalitiesPageVideo"
                                src="https://www.youtube.com/embed/P8cvGw_9J-s"
                                title="Ribbit Functionalities Video"
                                allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index;