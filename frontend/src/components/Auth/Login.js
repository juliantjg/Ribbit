import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import logoBig from '../../image/ribbitWithLogoBig.png';
import cardArt from '../../image/cardArtBackground.jpg';
import logoSmall from '../../image/greenFrog.png'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Utilities/Loader';
import Message from '../Utilities/Message';
import { login } from '../../actions/userActions';
import store from "../../store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { USER_LOGOUT } from "../../actions/types";




function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState({});
    const [password, setPassword] = useState({});

    // userLogin is from store.js
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    function notifyError() {
        toast(error);
    }

    useEffect(() => {
        if (error) {
            notifyError()
            dispatch({ type: USER_LOGOUT })
        }
        if (userInfo) {

            setTimeout(() => {
                navigate('/home')
            }, 2000);

        }

    }, [error, userInfo])

    useEffect(() => {
        // if userInfo exists then show the home page, this is so that logged in user can't acces /login
        if (userInfo) {
            navigate('/home')
        }
    }, [userInfo])


    const submitHandler = (e) => {
        e.preventDefault()
        // calling the action
        dispatch(login(username, password))
    }




    return (
        <div class="container-fluid px-0">
            <div id="page-size">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="logoBig">
                                <img src={logoBig} alt="Ribbit Logo Big" id="ribbitLogoBig" />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div id="loginCardPaddingTop"></div>
                            <div class="card" id="loginCard">
                                <Link to="/home" class="text-decoration-none">
                                    <img src={logoSmall} id="logoSmallBackToRibbit" /> <span class="font-weight-bold" style={{ "color": "black" }}>Back to Ribbit</span>
                                </Link>

                                <h3 className="d-flex justify-content-center mt-3">Login</h3>
                                <hr />
                                <ToastContainer />

                                <Form
                                    className="p-4"
                                    onSubmit={submitHandler}
                                >
                                    <Form.Group className="mb-3" controlId="email">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Username"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="username"
                                                placeholder="Username"
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <FloatingLabel controlId="floatingPassword" label="Password">
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Row>
                                        <center>
                                            {
                                                loading ?
                                                    (
                                                        <div id="forgotPass">
                                                            Forgot your&nbsp;
                                                            <span className="mb-2" id="forgotPass" style={{ "color": "blue" }}>
                                                                password
                                                            </span>
                                                            ?
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div id="forgotPass">
                                                            Forgot your&nbsp;
                                                            <Link to="/sendResetPasswordEmail" className="mb-2" id="forgotPass">
                                                                password
                                                            </Link>
                                                            ?
                                                        </div>
                                                    )
                                            }
                                        </center>
                                    </Row>
                                    <div className="d-flex justify-content-center align-items-center">
                                        {
                                            loading ?
                                                (
                                                    <Button type="submit" disabled className="mb-2 mt-3 w-100 btn btn-dark">
                                                        <Loader />
                                                    </Button>
                                                )
                                                :
                                                (
                                                    <Button type="submit" className="mb-2 mt-3 w-100 btn btn-dark">
                                                        Log In
                                                    </Button>
                                                )
                                        }

                                    </div>
                                </Form>
                                <Card.Footer>
                                    <small className="d-flex justify-content-center align-items-center">
                                        <b> New to Ribbit?&nbsp;
                                            {
                                                loading ?
                                                    (
                                                        <span class="text-decoration-none" style={{ "color": "blue" }}>
                                                            SIGN UP
                                                        </span>
                                                    )
                                                    :
                                                    (
                                                        <Link to="/register" class="text-decoration-none">
                                                            SIGN UP
                                                        </Link>
                                                    )
                                            }
                                        </b>
                                    </small>
                                </Card.Footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}

export default Login;
