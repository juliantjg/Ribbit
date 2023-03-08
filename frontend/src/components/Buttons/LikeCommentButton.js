import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { likeUnlikeAction } from "../../actions/commentActions";

function LikeCommentButton({ comment }) {
    const dispatch = useDispatch();

    var liked = false
    if (comment.liked === 1) {
        liked = true
    }

    const [likedOn, setLikedOn] = useState(liked);
    const [numLikes, setNumLikes] = useState(comment.numLikes);

    // This function is to change the like button view only (for views) when it is clicked
    function likeSwitch() {
        if (likedOn === true) {
            setLikedOn(false)
            setNumLikes(numLikes - 1)
        }
        else {
            setLikedOn(true)
            setNumLikes(numLikes + 1)
        }
    }


    // userLogin is from store.js
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const submitHandler = (e) => {
        // prevent default is used to prevent the page from refreshing
        e.preventDefault()
        // calling the action
        dispatch(likeUnlikeAction(comment.id))

        likeSwitch()
    }

    return (
        <div>
            {
                userInfo ?
                    (
                        <Form
                        >

                            {
                                likedOn ?
                                    (
                                        <small><i class="fas fa-thumbs-up" type="submit" onClick={submitHandler}></i> {numLikes}</small>
                                    )
                                    :
                                    (
                                        <small><i class="far fa-thumbs-up" type="submit" onClick={submitHandler}></i> {numLikes}</small>
                                    )

                            }
                        </Form>
                    )
                    :
                    (
                        <small><i class="far fa-thumbs-up"></i> {comment.numLikes}</small>
                    )
            }

        </div >
    );
}

export default LikeCommentButton;
