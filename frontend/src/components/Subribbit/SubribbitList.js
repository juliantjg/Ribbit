import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, FloatingLabel, Toast } from "react-bootstrap";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import logoBig from '../../image/ribbitWithLogoBig.png';
import cardArt from '../../image/cardArtBackground.jpg';
import logoSmall from '../../image/greenFrog.png'
import { listSubribbits } from "../../actions/subribbitActions";
import Post from "../Posts/Post"
import Loader from "../Utilities/Loader"
import Message from "../Utilities/Message"
import UserNavbar from "../Navbar/UserNavbar"
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import HomeSideBar from '../SideBar/HomeSideBar'
import SuccessToast from "../Toasts/SuccessToast";
import { DELETE_POST_RESET } from "../../actions/types";
import SubribbitCard from "./SubribbitCard";
import SubribbitListSideBar from "../SideBar/SubribbitListSideBar";
import InformationSideBar from "../SideBar/InformationSideBar";
import CommunityNoSubribbitsYet from "../Utilities/CommunityNoSubribbitsYet";
import GeneralGetErrorPage from "../Utilities/GeneralGetErrorPage";

function SubribbitList() {
    const match = useParams()
    const dispatch = useDispatch();
    const subribbitList = useSelector(state => state.subribbitList)
    const { error, loading, subribbits } = subribbitList

    const [search, setSearch] = useState("");

    useEffect(() => {
        if (userInfo) dispatch(listSubribbits(search));
    }, [search])

    // get userLogin from state 
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    function checkSubribbitEmpty() {
        if (subribbits.length < 1 && search === "") return true;
        return false;
    }

    return (

        <div class="container-fluid px-0">
            <UserNavbar />
            <div id="page-size">
                <div class="col-md-8 offset-md-2">
                    {
                        userInfo ?
                            (
                                <div>
                                    {
                                        (!loading && error) ?
                                            (
                                                <GeneralGetErrorPage />
                                            )
                                            :
                                            (
                                                <div class="row pt-5">
                                                    <div class="col-md-7">

                                                        <div class="row">
                                                            <div class="card" id="searchTitle" align="left">
                                                                <Form.Control
                                                                    required
                                                                    type="search"
                                                                    placeholder="Search subribbit name"
                                                                    value={search}
                                                                    onChange={(e) => setSearch(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <center>
                                                                {
                                                                    (search !== "") ?
                                                                        (
                                                                            <div>
                                                                                <small>Showing search result for: <i>{search}</i>
                                                                                    <button id="clearSearchButton" onClick={() => setSearch("")}>&nbsp;&nbsp;<b>Clear</b></button>
                                                                                </small>
                                                                            </div>
                                                                        )
                                                                        : null
                                                                }
                                                            </center>
                                                        </div>

                                                        {loading ? <Loader />
                                                            : error ? <Message color='danger'>{error}</Message>
                                                                :
                                                                <div>
                                                                    {
                                                                        checkSubribbitEmpty() ?
                                                                            (
                                                                                <CommunityNoSubribbitsYet />
                                                                            )
                                                                            :
                                                                            (
                                                                                <div>
                                                                                    {
                                                                                        subribbits.map(subribbit => (
                                                                                            <Row>
                                                                                                <SubribbitCard subribbit={subribbit} />
                                                                                            </Row>
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                            )
                                                                    }
                                                                </div>
                                                        }
                                                    </div>
                                                    <div class="col-md-5">
                                                        <SubribbitListSideBar />
                                                        <InformationSideBar />
                                                    </div>
                                                </div>
                                            )
                                    }
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

            <Footer />
        </div>
    );
}

export default SubribbitList;
