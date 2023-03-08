import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PostCardDropDown from "../Buttons/PostCardDropDown";
import VotePostButton from "../Buttons/VotePostButton";
import { useDispatch, useSelector } from "react-redux";

function Post({ post, sub }) {

    function checkSubLink() {
        if (post.subRibbit === 'home') {
            return '/home'
        }
        return `/community/${post.subRibbit}`
    }

    function checkIsNsfw() {
        if (post.nsfw === "y") {
            return true
        }
        return false
    }

    return (
        <Card className="rounded" id="postCardMain">
            <div class="row">
                <div class="col-md-1" id="postCardLeft">
                    <VotePostButton post={post} />
                </div>
                <div class="col-md-10">
                    <Link to={`/post/${post.id}`} id="postCardLink">
                        <Card className="my-1 rounded border-0" id="postCardSize">
                            <div class="row">
                                <div id="postCardHeader">
                                    <small>
                                        <Link to={checkSubLink()} id="postCardSubRibbit">
                                            <strong>r/{post.subRibbit}</strong>
                                        </Link>

                                        &nbsp;&nbsp;

                                        ~ Posted by&nbsp;
                                        <Link to={`/user/${post.userName}`} id="postCardUsername">
                                            u/{post.userName}
                                        </Link>
                                        &nbsp;{post.humanTimeDiffCreatedAt} ago
                                    </small>
                                </div>
                            </div>
                            <div class="row">
                                <Card.Body>
                                    <div class="row">
                                        <Link to={`/post/${post.id}`} id="postCardBody">


                                            <Card.Title as="h3">
                                                <strong>{post.title}</strong>
                                            </Card.Title>


                                            <Card.Text>
                                                <div id="postCardContent">
                                                    {
                                                        checkIsNsfw() ?
                                                            (
                                                                <span class="badge badge-secondary">NSFW</span>
                                                            )
                                                            :
                                                            (
                                                                <div>
                                                                    {
                                                                        (post.content !== '{}') ?
                                                                        (
                                                                            post.content
                                                                        )
                                                                        :null
                                                                    }
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            </Card.Text>

                                        </Link>
                                    </div>
                                </Card.Body>
                            </div>
                            <div class="row pt-2">
                                <div class="row">
                                    <div id="postCardFooter">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <i class="far fa-comment-alt"></i>&nbsp;&nbsp;{post.numOfComments} comments
                                            </div>
                                            <div class="col-md-4">
                                                <i class="far fa-clipboard"></i>&nbsp;&nbsp;{post.votesReceived} vote(s)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </div>

                <div class="col-md-1">
                    <div class="row pt-2">
                        <PostCardDropDown post={post} sub={sub} />
                    </div>
                    <div class="row" id="postCardBottomRight">
                        <Link to={`/post/${post.id}`}></Link>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Post;
