import React from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

function PostSideBar(sub) {

    function checkSubLink() {
        if (sub.sub === 'home') {
            return '/home'
        }
        return `/community/${sub.sub}`
    }

    return (
        <Card className="p-3 rounded" id="postSideBarGoToSub">
            Visit this post's community:
            <hr />
            <Link to={checkSubLink()}>
                <button class="btn btn-block btn-secondary"><b>r/{sub.sub}</b></button>
            </Link>
        </Card>
    );
}

export default PostSideBar;
