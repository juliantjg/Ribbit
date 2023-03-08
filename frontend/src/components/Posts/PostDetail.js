import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPostDetails } from '../../actions/postActions';
import Loader from '../Utilities/Loader';
import Message from '../Utilities/Message';
import UserNavbar from '../Navbar/UserNavbar';
import { Card, Form, Row, Col, Button, FloatingLabe } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer'
import { createCommentAction, getAllCommentAction } from '../../actions/commentActions'
import Comment from '../Comments/Comment'
import { CREATE_COMMENT_RESET } from '../../actions/types';
import PostCardDropDown from '../Buttons/PostCardDropDown';
import SuccessToast from '../Toasts/SuccessToast';
import { DELETE_COMMENT_RESET } from '../../actions/types';
import VotePostButton from '../Buttons/VotePostButton';
import InformationSideBar from '../SideBar/InformationSideBar';
import PostSideBar from '../SideBar/PostSideBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostDetailsDropDown from '../Buttons/PostDetailsDropDown';
import GeneralGetErrorPage from '../Utilities/GeneralGetErrorPage';


function PostDetail() {
    const [editPostOn, setEditPostOn] = useState(false);

    const dispatch = useDispatch()

    // the reason we're using the code below useParams() is because the newer version of react doesn't work with match.params
    const match = useParams()

    const sub = " "

    const postDetails = useSelector(state => state.postDetails)
    const { loading, error, post } = postDetails

    // get userLogin from state 
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [text, setText] = useState('');

    const createComment = useSelector(state => state.createComment)
    const { loadingCreateComment, errorCreateComment, messageCreateComment } = createComment

    const votePost = useSelector(state => state.votePost)
    const { loading: loadingVotePost, error: errorVotePost, message: messageVotePost } = votePost

    const allComments = useSelector(state => state.allComments)
    const { errorAllComments, loadingAllComments, comments } = allComments

    const deleteComment = useSelector(state => state.deleteComment)
    const { error: errorDeleteComment, loading: loadingDeleteComment, message: messageDeleteComment } = deleteComment

    const updatePost = useSelector(state => state.updatePost)
    const { error: errorUpdatePost, loading: loadingUpdatePost, message: messageUpdatePost } = updatePost

    useEffect(() => {
        dispatch(listPostDetails(match.id))
    }, [messageUpdatePost, messageVotePost, messageCreateComment, votePost, match.id])

    useEffect(() => {
        if (messageCreateComment) {
            setText('')

            document.getElementById("submitCommentForm").reset();
            dispatch({ type: CREATE_COMMENT_RESET })
        }

        dispatch(getAllCommentAction(match.id))

        // here the hook i'm puting messageDeleteComment so that it reloads the get all comment when comment is deleted, also when it is created
    }, [dispatch, match, messageCreateComment, messageDeleteComment])

    useEffect(() => {
        if (errorCreateComment) {
            notifyCommentError()
            dispatch({ type: CREATE_COMMENT_RESET })
        }
        if (messageCreateComment) {
            notifyCommentSuccess()
            dispatch({ type: CREATE_COMMENT_RESET })
        }
        if (messageDeleteComment) {
            notifyDeleteCommentSuccess()
            dispatch({ type: DELETE_COMMENT_RESET })
        }
    }, [errorCreateComment, messageCreateComment, messageDeleteComment])

    function notifyCommentError() {
        toast(errorCreateComment);
    }

    function notifyCommentSuccess() {
        toast(messageCreateComment);
    }

    function notifyDeleteCommentSuccess() {
        toast(messageDeleteComment);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createCommentAction(text, match.id))
        dispatch(listPostDetails(match.id))
    }

    function checkOwner() {
        if (userInfo != null) {
            if (userInfo.username == post.userName) {
                return true
            }
        }
        return false
    }

    function checkSubLink() {
        if (post.subRibbit === 'home') {
            return '/home'
        }
        return `/community/${post.subRibbit}`
    }

    function checkIsNsfwShouldHide() {
        if (post.nsfw === "y" && !userInfo) {
            return true
        }
        return false
    }

    return (

        <div class="container-fluid px-0">
            <UserNavbar />

            <div id="page-size">
                <div class="col-md-8 offset-md-2 pt-5">

                    <ToastContainer />
                    {
                        (error || errorAllComments) ?
                            (
                                <GeneralGetErrorPage />
                            )
                            :
                            (
                                <div class="row">
                                    <div class="col-md-7">

                                        <div class="card p-3" id="postDetailCard">
                                            {loading ? <Loader />
                                                : error ? <Message color='danger'>{error}</Message>
                                                    :
                                                    <div class="row">

                                                        <div id="postHeader">
                                                            <div class="row">
                                                                <div class="col-md-11">
                                                                    <small>
                                                                        <strong>

                                                                            <Link to={checkSubLink()} id="postDetailSubRibbit">
                                                                                r/{post.subRibbit}
                                                                            </Link>

                                                                        </strong>
                                                                    </small>
                                                                    &nbsp;&nbsp;
                                                                    <small>~ Posted by&nbsp;

                                                                        <Link to={`/user/${post.userName}`} id="postDetailUsername">
                                                                            u/{post.userName}
                                                                        </Link>
                                                                        &nbsp;
                                                                        {post.humanTimeDiffCreatedAt} ago</small>
                                                                </div>
                                                                <div class="col-md-1">

                                                                    <PostDetailsDropDown post={post} sub=" " />

                                                                </div>
                                                            </div>
                                                        </div>

                                                        <Card.Body>
                                                            <div class="row">
                                                                <div class="col-md-1">
                                                                    <center><VotePostButton post={post} /></center>
                                                                </div>

                                                                <div class="col-md-11">
                                                                    <Card.Title as="h3">
                                                                        {post.title}
                                                                    </Card.Title>

                                                                    <Card.Text>
                                                                        {
                                                                            checkIsNsfwShouldHide() ?
                                                                                (
                                                                                    <span class="badge badge-secondary">Login to see NSFW post</span>
                                                                                )
                                                                                :
                                                                                (
                                                                                    <div>
                                                                                        {
                                                                                            (post.content !== '{}') ?
                                                                                                (
                                                                                                    <div>
                                                                                                        {post.content}
                                                                                                    </div>
                                                                                                ) : null
                                                                                        }
                                                                                    </div>
                                                                                )

                                                                        }
                                                                    </Card.Text>
                                                                </div>

                                                            </div>
                                                        </Card.Body>

                                                    </div>
                                            }

                                            <hr />

                                            <div class="row" align="center" id="postStats">
                                                <div class="col-md-4">
                                                    <i class="far fa-comment-alt"></i>&nbsp;&nbsp;{post.numComments} comments
                                                </div>
                                                <div class="col-md-4">
                                                    <i class="far fa-clipboard"></i>&nbsp;&nbsp;{post.votesReceived} vote(s)
                                                </div>
                                            </div>

                                        </div>

                                        <div class="card p-3" id="postDetailCard">

                                            {
                                                userInfo ?
                                                    (
                                                        <div>
                                                            <Form
                                                                onSubmit={submitHandler}
                                                                id='submitCommentForm'
                                                            >
                                                                <label for="comment" id="commentAsLabel">Comment as {userInfo.username}</label>
                                                                <Form.Group className="mb-2" controlId="text">
                                                                    <Form.Control
                                                                        required
                                                                        as="textarea"
                                                                        rows={3}
                                                                        type="text"
                                                                        placeholder="What are your thoughts?"
                                                                        onChange={(e) => setText(e.target.value)}
                                                                    />
                                                                </Form.Group>
                                                                <div class="pt-1" align="right">
                                                                    <div class="row">
                                                                        <div align="right">
                                                                            <Button type="submit" className="btn btn-dark btn-sm">
                                                                                Comment
                                                                            </Button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </Form>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div class="row">
                                                            <div class="col-md-8 p-1" align="center">
                                                                &nbsp;&nbsp;&nbsp;&nbsp;Login or sign up before posting comments
                                                            </div>
                                                            <div class="col-md-2 p-1" align="center">
                                                                <Link to="/login">
                                                                    <button type="button" class="btn btn-outline-dark btn-sm">Log In</button>
                                                                </Link>
                                                            </div>
                                                            <div class="col-md-2 p-1" align="center">
                                                                <Link to="/register">
                                                                    <button type="button" class="btn btn-dark btn-sm">Sign Up</button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )
                                            }

                                        </div>
                                        {
                                            loadingAllComments ? <Loader />
                                                : errorAllComments ? <Message color='danger'>{error}</Message>
                                                    :
                                                    comments.length === 0 ?
                                                        <div class="card p-5" id="noCommentsYet" align="center">
                                                            <i class="fas fa-comments"></i> <b>No comments yet</b>
                                                            <small>Be the first to share what you think!</small>
                                                        </div>
                                                        :
                                                        <div class="card p-3" id="allComments">
                                                            {comments.map(comment => (
                                                                <Row>
                                                                    <Comment comment={comment} user={userLogin} post={post} />
                                                                </Row>
                                                            ))}
                                                        </div>
                                        }
                                    </div>
                                    <div class="col-md-5 px-5 pt-2">
                                        <PostSideBar sub={post.subRibbit} />
                                        <InformationSideBar />
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PostDetail;
