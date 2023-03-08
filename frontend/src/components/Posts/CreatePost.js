import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import Footer from '../Footer/Footer'
import { useDispatch, useSelector } from "react-redux";
import logoBig from '../../image/ribbitWithLogoBig.png';
import cardArt from '../../image/cardArtBackground.jpg';
import logoSmall from '../../image/greenFrog.png'
import { Link, useNavigate, Redirect } from 'react-router-dom';
import Loader from '../Utilities/Loader';
import Message from '../Utilities/Message';
import { createPostAction } from '../../actions/postActions';
import store from "../../store";
import UserNavbar from "../Navbar/UserNavbar";
import { listOwnedAndJoinedSubribbits } from "../../actions/subribbitActions";
import { useLocation } from "react-router-dom";
import InformationSideBar from "../SideBar/InformationSideBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CREATE_POST_RESET } from "../../actions/types";
import GeneralGetErrorPage from "../Utilities/GeneralGetErrorPage";

function CreatePost() {

    const parameterSearch = useLocation().search
    const subribbitParameter = new URLSearchParams(parameterSearch).get('subribbit')

    const dispatch = useDispatch();
    const [title, setTitle] = useState({});
    const [subribbitName, setSubribbitName] = useState('');
    const [content, setContent] = useState({});
    const [nsfw, setNsfw] = useState("n");

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    function notifyError() {
        toast(error);
    }

    function notifySuccess() {
        toast(post);
    }

    function handleChangeNsfw(event) {
        if (event.target.checked) {
            setNsfw("y");
        } else {
            setNsfw("n");
        }
    }

    const ownedAndJoinedSubribbitList = useSelector(state => state.ownedAndJoinedSubribbitList)
    const { error: errorOwnedAndJoinedSubribbits, loading: loadingOwnedAndJoinedSubribbits, ownedAndJoinedSubribbits } = ownedAndJoinedSubribbitList

    useEffect(() => {
        if (subribbitParameter === null) {
            setSubribbitName('home')
        }
        else {
            setSubribbitName(subribbitParameter)
        }
        dispatch(listOwnedAndJoinedSubribbits())
    }, [errorOwnedAndJoinedSubribbits])

    const createPost = useSelector(state => state.createPost)
    const { error, loading, post } = createPost

    useEffect(() => {
        if (error) {
            notifyError()
            dispatch({ type: CREATE_POST_RESET })
        }
        if (post) {
            notifySuccess()
            dispatch({ type: CREATE_POST_RESET })
        }
    }, [error, post])

    const submitHandler = (e) => {
        // prevent default is used to prevent the page from refreshing
        e.preventDefault()

        if (subribbitParameter === null) {
            setSubribbitName('home')
        }

        // calling the action
        dispatch(createPostAction(title, content, nsfw, subribbitName))
    }

    return (
        <div>
            <div class="container-fluid px-0">
                <UserNavbar />
                <div id="page-size">
                    <div class="col-md-8 offset-md-2 pt-5">
                        <div>
                            {
                                userInfo ?
                                    (
                                        <div class="row">
                                            <div class="col-md-7">
                                                <h4>Create Post</h4>
                                                <hr />
                                                <ToastContainer />
                                                <Form
                                                    onSubmit={submitHandler}
                                                >
                                                    <div class="row">
                                                        {
                                                            loadingOwnedAndJoinedSubribbits ? <Loader />
                                                                : errorOwnedAndJoinedSubribbits ? <Message color='danger'>{errorOwnedAndJoinedSubribbits}</Message>
                                                                    :
                                                                    <div>
                                                                        <div class="card p-2" id="postDetailCard">
                                                                            <Form.Control
                                                                                as="select"
                                                                                aria-label="Default select example"
                                                                                onChange={(e) => setSubribbitName(e.target.value)}
                                                                                value={subribbitParameter}
                                                                            >
                                                                                <option value="home">r/home</option>
                                                                                {ownedAndJoinedSubribbits.map(subribbit => (
                                                                                    <option value={subribbit.name}>r/{subribbit.name}</option>
                                                                                ))}
                                                                            </Form.Control>
                                                                            <div id="defaultCommunityIsHome">
                                                                                The default community is r/home.
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                        }
                                                    </div>
                                                    <div class="row">
                                                        <div>
                                                            <div class="card p-2" id="writePost">
                                                                <Form.Group className="mb-3" controlId="title">
                                                                    <Form.Control
                                                                        required
                                                                        type="title"
                                                                        placeholder="Title"
                                                                        onChange={(e) => setTitle(e.target.value)}
                                                                    />
                                                                </Form.Group>

                                                                <Form.Group className="mb-2" controlId="content">
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        rows={4}
                                                                        type="content"
                                                                        placeholder="Text (optional)"
                                                                        onChange={(e) => setContent(e.target.value)}
                                                                    />
                                                                </Form.Group>

                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="NSFW"
                                                                    onChange={handleChangeNsfw}
                                                                />

                                                                <div class="pt-4" align="right">
                                                                    <div class="card-footer text-muted">
                                                                        <div class="row">
                                                                            <div class="col-md-9" align="center">
                                                                                {
                                                                                    post && <b><small><div>Post Created</div></small></b>
                                                                                }
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                {
                                                                                    loading ?
                                                                                        (
                                                                                            <button type="submit" disabled class="btn btn-dark btn-sm">
                                                                                                <Loader size='10px' />
                                                                                            </button>
                                                                                        )
                                                                                        :
                                                                                        (
                                                                                            <button type="submit" class="btn btn-dark btn-sm">
                                                                                                Post
                                                                                            </button>
                                                                                        )
                                                                                }
                                                                            </div>


                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </Form>

                                            </div>
                                            <div class="col-md-5 px-5 pt-2">
                                                <InformationSideBar />
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div>
                                            <div class="row pt-5" align="center">
                                                <div class="row pt-5"></div>
                                                <div class="row pt-5">
                                                    <h3><i class="fas fa-exclamation-triangle"></i></h3>
                                                </div>
                                                <div class="row pt-2">
                                                    <b>Authentication Required</b>
                                                    <br />
                                                    <small>You need to be logged in to access this page <i class="far fa-smile"></i></small>
                                                </div>


                                                <div class="row pt-5">
                                                    <div class="col-md-4 offset-md-4">
                                                        <Link to="/login">
                                                            <button class="btn btn-dark btn-block">
                                                                LOGIN
                                                            </button>
                                                        </Link>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                            }

                        </div>
                    </div>
                </div>
            </div >

            <Footer />
        </div >
    );
}

export default CreatePost;
