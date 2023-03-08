import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import LikeCommentButton from "../Buttons/LikeCommentButton";
import { useDispatch, useSelector } from 'react-redux';
import DeleteCommentButton from "../Buttons/DeleteCommentButton";

function Comment({ post, comment, user }) {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    function checkOwner() {
        if (userInfo != null) {
            if (userInfo.username == comment.userName) {
                return true
            }
        }
        return false
    }

    return (
        <Card className="my-2 p-3 rounded border-0" id="commentCard">
            <div class="row">
                <div class="col-md-1" align="left">
                    <Link to={`/user/${comment.userName}`}>
                        <img src={comment.userImage} id="userImageComment" />
                    </Link>
                </div>
                <div class="col-md-11" id="commentContent">
                    <div class="row">
                        <div class="col-md-11">
                            <div id="commentHeader">
                                <Link to={`/user/${comment.userName}`} id="commentUsername">
                                    <b>{comment.userName}</b>
                                </Link>

                                ~ {comment.humanTimeDiffCreatedAt} ago
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div id="commentHeader">
                                <DeleteCommentButton comment={comment} post={post} />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="pt-2">
                            {comment.text.split(" ").map(text => {
                                var linkTo = '/user/'.concat(text.substring(1))
                                return text.substring(0, 1) === "@" ? <span><Link to={linkTo} id="commentMention">{text}</Link>&nbsp;</span> : <span>{text}&nbsp;</span>;
                            })}
                        </div>
                    </div>
                    <div class="row">
                        <div class="pt-1">
                            <LikeCommentButton comment={comment} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Comment;
