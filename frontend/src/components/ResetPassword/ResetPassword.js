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
import { resetPasswordAction } from "../../actions/userActions";




function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState({});
    const [confirmPassword, setConfirmPassword] = useState({});

    const resetPassword = useSelector(state => state.resetPassword)
    const { error, loading, message } = resetPassword

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    var currentUrl = window.location.pathname
    var currentUrlArray = currentUrl.split('/')
    var token = currentUrlArray[2]

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
        dispatch(resetPasswordAction(token, password, confirmPassword))
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
                            <div id="sendResetPasswordEmailCardPaddingTop"></div>
                            <div class="card" id="loginCard">
                                <Link to="/home" class="text-decoration-none">
                                    <img src={logoSmall} id="logoSmallBackToRibbit" /> <span class="font-weight-bold" style={{ "color": "black" }}>Back to Ribbit</span>
                                </Link>

                                <h4 className="d-flex justify-content-center mt-3">Reset Password</h4>
                                <hr />
                                <ToastContainer />

                                <Form
                                    className="p-4"
                                    onSubmit={submitHandler}
                                >
                                    <Form.Group className="mb-3" controlId="password">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="New Password"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Confirm New Password"
                                            className="mb-3"
                                        >
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
                                                                Submit
                                                            </Button>
                                                        )
                                                        :
                                                        (
                                                            <Button type="submit" className="mb-2 mt-3 w-100 btn btn-dark">
                                                                Submit
                                                            </Button>
                                                        )
                                                )
                                        }

                                    </div>
                                </Form>
                                <Card.Footer>
                                    <small className="d-flex justify-content-center align-items-center">
                                        <b> Back to&nbsp;
                                            {
                                                loading ?
                                                    (
                                                        <span class="text-decoration-none" style={{ "color": "blue" }}>
                                                            LOGIN
                                                        </span>
                                                    )
                                                    :
                                                    (
                                                        <Link to="/login" class="text-decoration-none">
                                                            LOGIN
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

export default ResetPassword;
