import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShowMySubribbitsButton from "../Buttons/ShowMySubribbitsButton";
import { listTopSubribbits } from "../../actions/subribbitActions";
import Loader from "../Utilities/Loader";

function HomeSideBar({ user }) {
    const dispatch = useDispatch();

    const topSubribbitList = useSelector(state => state.topSubribbitList)
    const { error, loading, topSubribbits } = topSubribbitList

    useEffect(() => {
        dispatch(listTopSubribbits(5))
    }, [])

    return (
        <Card className="p-4 rounded" id="homeSideBarSize">
            <div class="row">
                <div>
                    <h5><i class="fas fa-trophy"></i> &nbsp; Top Communities</h5>
                </div>
            </div>
            <div class="row">
                <div>
                    <small><b>Subribbits with the most members</b></small>
                </div>
            </div>
            <div class="row pt-2">
                {
                    loading ? <Loader />
                        : error ?
                            (
                                <div>
                                    <br />
                                    <small>
                                        <center>
                                            <i class="fas fa-exclamation-triangle"></i>
                                            <br />
                                            An error has occurred here
                                        </center>
                                    </small>
                                </div>
                            )
                            :
                            (
                                topSubribbits ?
                                    (
                                        <div>
                                            {
                                                (topSubribbits.length > 0) ?
                                                    (
                                                        <div>
                                                            {
                                                                topSubribbits.map((subribbit, index) => (
                                                                    <div class="row">
                                                                        <Link to={`/community/${subribbit.name}`} id="topSubribbitItem">
                                                                            {index + 1}. r/{subribbit.name} &nbsp; <small> <span class="badge badge-pill badge-warning" id="topSubribbitNumberOfMembers">{subribbit.numMembers} members</span> </small>
                                                                        </Link>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div>
                                                            <center>
                                                                <br />
                                                                <i class="fas fa-frog"></i>
                                                                <br />
                                                                <small>It's empty here</small>
                                                            </center>
                                                        </div>
                                                    )
                                            }

                                        </div>
                                    )
                                    :
                                    (
                                        <div>
                                            <br />
                                            <small>
                                                <center>
                                                    <i class="fas fa-exclamation-triangle"></i>
                                                    <br />
                                                    An error has occurred here
                                                </center>
                                            </small>
                                        </div>
                                    )
                            )
                }

            </div>
        </Card >
    );
}

export default HomeSideBar;
