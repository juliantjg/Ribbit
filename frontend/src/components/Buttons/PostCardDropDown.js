import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { likeUnlikeAction } from "../../actions/commentActions";
import ConfirmDeletePostModal from "../Modals/ConfirmDeletePostModal";
import UpdatePostModal from "../Modals/UpdatePostModal";

function PostCardDropDown({ post, sub }) {
    const dispatch = useDispatch();

    // get userLogin from state 
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    function checkOwner() {
        if (userInfo != null) {
            if (userInfo.username == post.userName) {
                return true
            }
        }
        return false
    }

    const [modalShow, setModalShow] = useState(false);
    const [modalShowUpdate, setModalShowUpdate] = useState(false);

    return (
        <>
            {
                checkOwner() ?
                    (
                        <div class="btn-group" id="postCardDropDown">
                            <i class="fas fa-ellipsis-h" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            </i>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" onClick={() => setModalShow(true)}>Delete</a>
                            </div>
                            <ConfirmDeletePostModal
                                sub={sub}
                                show={modalShow}
                                post={post}
                                onHide={() => setModalShow(false)}
                            />
                        </div>
                    )
                    : null
            }

        </>
    );
}

export default PostCardDropDown;
