import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { votePostAction } from "../../actions/votePostActions";
import Loader from "../Utilities/Loader";

function VotePostButton({ post }) {
    const dispatch = useDispatch();

    // userLogin is from store.js
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const [upvoteOn, setUpvoteOn] = useState(post.upvote);
    const [downvoteOn, setDownvoteOn] = useState(post.downvote);
    const [totalVotes, setTotalVotes] = useState(post.totalVotes);

    const votePost = useSelector(state => state.votePost)
    const { loading: loadingVotePost, error: errorVotePost, message: messageVotePost } = votePost

    useEffect(() => {
        setUpvoteOn(post.upvote)
        setDownvoteOn(post.downvote)
        setTotalVotes(post.totalVotes)
    }, [post.id, post.upvote, post.downvote])

    const upVote = (e) => {

        if (upvoteOn === true) {
            setUpvoteOn(false)

            setTotalVotes(totalVotes - 1)
        }
        else {
            if (downvoteOn === true) {
                setUpvoteOn(true)
                setDownvoteOn(false)
                setTotalVotes(totalVotes + 2)
            }
            else {
                setUpvoteOn(true)
                setTotalVotes(totalVotes + 1)
            }
        }

        dispatch(votePostAction(post.id, 1))
    }


    const downVote = (e) => {
        if (downvoteOn === true) {
            setDownvoteOn(false)

            setTotalVotes(totalVotes + 1)
        }
        else {
            if (upvoteOn === true) {
                setDownvoteOn(true)
                setUpvoteOn(false)
                setTotalVotes(totalVotes - 2)
            }
            else {
                setDownvoteOn(true)
                setTotalVotes(totalVotes - 1)
            }
        }

        dispatch(votePostAction(post.id, -1))
    }

    return (
        <div class="p-1" align="center" id="votePostButtonSize">

            {
                userInfo ?
                    (
                        <div>

                            {

                                upvoteOn ?
                                    (
                                        <div class="row pt-4">
                                            <i class="fas fa-arrow-alt-circle-up" type="submit" onClick={upVote}></i>
                                        </div>
                                    )
                                    :
                                    (
                                        <div class="row pt-4">
                                            <i class="far fa-arrow-alt-circle-up" type="submit" onClick={upVote}></i>
                                        </div>
                                    )
                            }
                            <div class="row pt-2" style={{ "white-space": "nowrap" }}>
                                <center><small>{totalVotes}</small></center>
                            </div>

                            {

                                downvoteOn ?
                                    (
                                        <div class="row pt-2">
                                            <i class="fas fa-arrow-alt-circle-down" type="submit" onClick={downVote}></i>
                                        </div>
                                    )
                                    :
                                    (
                                        <div class="row pt-2">
                                            <i class="far fa-arrow-alt-circle-down" type="submit" onClick={downVote}></i>
                                        </div>
                                    )
                            }
                        </div>
                    )
                    :
                    (
                        <div>
                            <div class="row pt-4">
                                <Link to="/login" id="unauthenticatedVotePostButton">
                                    <i class="far fa-arrow-alt-circle-up"></i>
                                </Link>
                            </div>
                            <div class="row" style={{ "white-space": "nowrap" }}>
                                <center>{totalVotes}</center>
                            </div>
                            <div class="row">
                                <Link to="/login" id="unauthenticatedVotePostButton">
                                    <i class="far fa-arrow-alt-circle-down"></i>
                                </Link>
                            </div>
                        </div>
                    )
            }


        </div>
    );
}

export default VotePostButton;
