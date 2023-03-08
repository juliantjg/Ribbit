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
import { createSubribbitAction } from "../../actions/subribbitActions";
import store from "../../store";
import UserNavbar from "../Navbar/UserNavbar";
import InformationSideBar from "../SideBar/InformationSideBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CREATE_SUBRIBBIT_RESET } from "../../actions/types";

function CreateSubribbit() {

    const dispatch = useDispatch();
    const [name, setName] = useState({});
    const [description, setDescription] = useState({});
    const [type, setType] = useState(1);


    function handleChangeType(event) {
        if (event.target.checked) {
            setType(0);
        } else {
            setType(1);
        }
    }

    const createSubribbit = useSelector(state => state.createSubribbit)
    const { error, loading, subribbit } = createSubribbit

    function notifyError() {
        toast(error);
    }

    function notifySuccess() {
        toast(subribbit);
    }

    useEffect(() => {
        if (error) {
            notifyError()
            dispatch({ type: CREATE_SUBRIBBIT_RESET })
        }
        if (subribbit) {
            notifySuccess()
            dispatch({ type: CREATE_SUBRIBBIT_RESET })
        }
    }, [error, subribbit])

    const submitHandler = (e) => {
        // prevent default is used to prevent the page from refreshing
        e.preventDefault()
        // calling the action
        dispatch(createSubribbitAction(name, description, type))
    }

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <div>
            <div class="container-fluid px-0">
                <UserNavbar />
                <div id="page-size">
                    <div class="col-md-8 offset-md-2 pt-5">

                        {
                            userInfo ?
                                (
                                    <div class="row">
                                        <div class="col-md-7">
                                            <h4>Create Subribbit</h4>
                                            <hr />
                                            <ToastContainer />
                                            <Form
                                                onSubmit={submitHandler}
                                            >
                                                <div class="row">
                                                    <div>
                                                        <div class="card p-2" id="writePost">
                                                            <Form.Group className="mb-3" controlId="name">
                                                                <Form.Control
                                                                    required
                                                                    type="name"
                                                                    placeholder="Subribbit Name"
                                                                    onChange={(e) => setName(e.target.value)}
                                                                />
                                                            </Form.Group>

                                                            <Form.Group className="mb-2" controlId="description">
                                                                <Form.Control
                                                                    required
                                                                    as="textarea"
                                                                    rows={4}
                                                                    type="description"
                                                                    placeholder="Description"
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                />
                                                            </Form.Group>

                                                            <Form.Check
                                                                type="switch"
                                                                id="custom-switch"
                                                                label="Private"
                                                                onChange={handleChangeType}
                                                            />

                                                            <div class="pt-4" align="right">
                                                                <div class="card-footer text-muted">
                                                                    <div class="row">
                                                                        <div class="col-md-9" align="center">
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            {
                                                                                loading ?
                                                                                    (
                                                                                        <button type="submit" disabled class="btn btn-dark btn-sm">
                                                                                            <Loader />
                                                                                        </button>
                                                                                    )
                                                                                    :
                                                                                    (
                                                                                        <button type="submit" class="btn btn-dark btn-sm">
                                                                                            Create
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

            <Footer />
        </div>
    );
}

export default CreateSubribbit;
