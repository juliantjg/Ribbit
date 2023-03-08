import React from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

function HomeSubSideBar() {

    return (
        <Card className="p-4 rounded" id="subribbitSideBarSize">
            <div class="mr-3 row">
                <h5>r/home</h5>
                <hr />
            </div>

            <div class="row" id="numOfMembersDiv">
                <div class="col-md-3">
                    <span class="badge badge-info">PUBLIC</span>
                </div>
            </div>

            <div class="row pt-3 ps-3" id="subribbitSidebarDescription">
                <div> <i class="fas fa-info-circle"></i> &nbsp; About community </div>
                <div>The default community of Ribbit. Click on <b><Link to="/explore" id="homeSubSideBarExploreLink">Explore</Link></b> button on the navigation bar to explore posts from various communities.</div>
                <br /> <br />
            </div>

        </Card>
    );
}

export default HomeSubSideBar;
