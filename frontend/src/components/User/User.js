import React, { useState, useEffect } from 'react';
import { Card, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import UserNavbar from '../Navbar/UserNavbar'
import { useDispatch, useSelector } from "react-redux";
import Post from '../Posts/Post'
import Footer from '../Footer/Footer'
import UserCard from "./UserCard";
import { userDetailsAction } from '../../actions/userActions';
import { listUserPostsAction } from '../../actions/postActions';
import Loader from '../Utilities/Loader';
import Message from '../Utilities/Message';
import SuccessToast from '../Toasts/SuccessToast';
import InformationSideBar from '../SideBar/InformationSideBar';
import UserNoPostsYet from '../Utilities/UserNoPostsYet';
import GeneralGetErrorPage from '../Utilities/GeneralGetErrorPage';



function User() {
    const dispatch = useDispatch()
    const match = useParams()
    const [sortCounter, setSortCounter] = useState(0);

    const parameterSearch = useLocation().search
    const sort = new URLSearchParams(parameterSearch).get('sort')

    const sub = " "

    const userDetails = useSelector(state => state.userDetails)
    const { error: errorUserDetails, loading: loadingUserDetails, user } = userDetails

    const userPosts = useSelector(state => state.userPosts)
    const { error: errorUserPostList, loading: loadingUserPostList, posts } = userPosts

    const deletePost = useSelector(state => state.deletePost)
    const { message: messageDeletePost, reset: resetDeletePost } = deletePost

    function checkPostEmpty() {
        console.log(posts.length)
        if (posts.length < 1) return true;
        return false;
    }

    useEffect(() => {
        dispatch(userDetailsAction(match.username))
        dispatch(listUserPostsAction(match.username, sort))
    }, [match.username, messageDeletePost, sort, sortCounter])

    function getSortLink(sortValue) {
        var sortLink = '/user/' + match.username + '?sort=' + sortValue
        return sortLink
    }

    return (
        <div class="container-fluid px-0">
            <UserNavbar />
            <div id="page-size">
                <div class="col-md-8 offset-md-2 pt-5">
                    {
                        user ?
                            (
                                <div>
                                    {
                                        errorUserPostList ?
                                            (
                                                <GeneralGetErrorPage />
                                            )
                                            :
                                            (
                                                <div class="row">
                                                    <div class="col-md-7">
                                                        <div class="row">
                                                            <div class="card" id="chooseFilter" align="left">
                                                                <div class="d-flex flex-row p-2">
                                                                    <div>
                                                                        <Link to={getSortLink('latest')}>
                                                                            <button type="button" class="btn btn-primary btn-sm" onClick={() => {
                                                                                setSortCounter(sortCounter + 1)
                                                                            }}>
                                                                                <i class="far fa-clock"></i>&nbsp;&nbsp;Latest
                                                                            </button>
                                                                        </Link>
                                                                        &nbsp; &nbsp;
                                                                    </div>
                                                                    <div>
                                                                        <Link to={getSortLink('numComments')}>
                                                                            <button type="button" class="btn btn-secondary btn-sm" onClick={() => {
                                                                                setSortCounter(sortCounter + 1)
                                                                            }}>
                                                                                <i class="fas fa-fire-alt"></i>&nbsp;&nbsp;Most Comments
                                                                            </button>
                                                                        </Link>
                                                                        &nbsp; &nbsp;
                                                                    </div>
                                                                    <div>
                                                                        <Link to={getSortLink('rating')}>
                                                                            <button type="button" class="btn btn-warning btn-sm" onClick={() => {
                                                                                setSortCounter(sortCounter + 1)
                                                                            }}>
                                                                                <i class="fas fa-award"></i>&nbsp;&nbsp;Most Upvote
                                                                            </button>
                                                                        </Link>
                                                                        &nbsp;
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {loadingUserPostList ? <Loader />
                                                            : errorUserPostList ? <Message color='danger'>{errorUserPostList}</Message>
                                                                :
                                                                <div>
                                                                    {
                                                                        checkPostEmpty() ?
                                                                            (
                                                                                <UserNoPostsYet username={match.username} />
                                                                            )
                                                                            :
                                                                            (
                                                                                <div>
                                                                                    {posts.map(post => (
                                                                                        <Row>
                                                                                            <Post post={post} sub={sub} />
                                                                                        </Row>
                                                                                    ))}
                                                                                </div>
                                                                            )
                                                                    }
                                                                </div>
                                                        }
                                                    </div>
                                                    <div class="col-md-5">
                                                        <UserCard user={user} />
                                                        <InformationSideBar />
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>
                            )
                            :
                            (
                                <div class="row pt-5" align="center">
                                    <div class="row pt-5"></div>
                                    <div class="row pt-5"></div>
                                    <div class="row">
                                        <b>Sorry, nobody on Ribbit goes by that name</b>
                                        <br />
                                        <small>The person may have been banned or the username is incorrect</small>
                                        <br />
                                    </div>


                                    <div class="row pt-5">
                                        <div class="col-md-4 offset-md-4">
                                            <Link to="/home">
                                                <button class="btn btn-dark btn-block">
                                                    GO HOME
                                                </button>
                                            </Link>
                                        </div>

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

export default User;
