import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShowMySubribbitsButton from "../Buttons/ShowMySubribbitsButton";

function SubribbitListSideBar({ user }) {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <Card className="p-4 rounded" id="homeSideBarSize">
            <div class="row">
                <div class="col-md-6">
                    <h5>Communities</h5>
                </div>
                <div class="col-md-6">
                    <ShowMySubribbitsButton />
                </div>
            </div>

            <div class="row pt-2">
                <div>
                    <small>
                        Welcome to the communities page. Dive into any Subribbits or create your own!
                    </small>
                </div>
            </div>

            <div class="row pt-3">
                {
                    userInfo ?
                        (
                            <div class="row">
                                <Link to="/createSubribbit">
                                    <button type="button" class="btn btn-outline-dark btn-sm btn-block">Create Subribbit</button>
                                </Link>
                            </div>
                        )
                        :
                        (
                            <div class="row">
                                <div class="row" align="center">
                                    &nbsp;&nbsp;&nbsp;Login or sign up to create a subribbit
                                </div>
                                <div class="row">
                                    <div class="col-md-3 p-1" align="center">
                                        <Link to="/login">
                                            <button type="button" class="btn btn-outline-dark btn-sm">Log In</button>
                                        </Link>
                                    </div>
                                    <div class="col-md-3 p-1" align="center">
                                        <Link to="/register">
                                            <button type="button" class="btn btn-dark btn-sm">Sign Up</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </Card>
    );
}

export default SubribbitListSideBar;
