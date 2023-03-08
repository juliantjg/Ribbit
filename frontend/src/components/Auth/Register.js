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
import { register } from '../../actions/userActions';
import store from "../../store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { USER_LOGOUT } from "../../actions/types";


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState({});
    const [email, setEmail] = useState({});
    const [password, setPassword] = useState({});
    const [confirmPassword, setConfirmPassword] = useState({});

    // Below is to check whether user is authenticated. If auth then can't access /register
    // userLogin is from store.js
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, message } = userRegister

    // const notify = () => toast("Wow so easy!");

    function notifyError() {
        toast(error);
    }

    function notifySuccess() {
        toast(message);
    }

    useEffect(() => {
        if (error) {
            notifyError()
            dispatch({ type: USER_LOGOUT })
        }
        if (message) {
            notifySuccess()

            setTimeout(() => {
                navigate('/login')
                dispatch({ type: USER_LOGOUT })
            }, 2000);

        }

    }, [error, message])


    useEffect(() => {
        // if userInfo exists then show the home page, this is so that logged in user can't acces /login
        if (userInfo) {
            navigate('/home')
        }
    }, [userInfo])


    const submitHandler = (e) => {
        e.preventDefault()
        // calling the action
        dispatch(register(username, email, password, confirmPassword))
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
                            <div id="registerCardPaddingTop"></div>
                            <div class="card" id="loginCard">
                                <Link to="/home" class="text-decoration-none">
                                    <img src={logoSmall} id="logoSmallBackToRibbit" /> <span class="font-weight-bold" style={{ "color": "black" }}>Back to Ribbit</span>
                                </Link>

                                <h3 className="d-flex justify-content-center mt-3">Register</h3>
                                <hr />
                                <ToastContainer />

                                <Form
                                    className="p-4"
                                    onSubmit={submitHandler}
                                >

                                    <Form.Group className="mb-3" controlId="userName">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Username"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="userName"
                                                placeholder="jondoe111"
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>


                                    <Form.Group className="mb-3" controlId="email">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email address"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="email"
                                                placeholder="name@example.com"
                                                onChange={(e) => setEmail(e.target.value)}
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

                                    <Form.Group className="mb-3" controlId="c_password">
                                        <FloatingLabel controlId="floatingPassword" label="Confirm Password">
                                            <Form.Control
                                                type="password"
                                                placeholder="Confirm Password"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
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
                                                    message ?
                                                        (
                                                            <Button type="submit" disabled className="mb-2 mt-3 w-100 btn btn-dark">
                                                                Register
                                                            </Button>
                                                        )
                                                        :
                                                        (
                                                            <Button type="submit" className="mb-2 mt-3 w-100 btn btn-dark">
                                                                Register
                                                            </Button>
                                                        )

                                                )
                                        }
                                    </div>
                                </Form>
                                <Card.Footer>
                                    <small className="d-flex justify-content-center align-items-center">
                                        <b> Already a Ribbitor?&nbsp;
                                            {
                                                loading ?
                                                    (
                                                        <span id="signUpLink">
                                                            LOG IN
                                                        </span>
                                                    )
                                                    :
                                                    (
                                                        message ?
                                                            (
                                                                <span id="signUpLink">
                                                                    LOG IN
                                                                </span>
                                                            )
                                                            :
                                                            (
                                                                <Link to="/login" id="signUpLink">
                                                                    LOG IN
                                                                </Link>
                                                            )

                                                    )
                                            }
                                        </b>
                                    </small>
                                </Card.Footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    );
}

export default Login;
