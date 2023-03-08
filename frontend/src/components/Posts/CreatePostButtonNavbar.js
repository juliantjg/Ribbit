import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

function CreatePostButtonNavbar({ }) {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <div>
            {
                userInfo ?
                (
                    <Link to="/createPost">
                        <Button variant="button btn-outline-light">
                            <i class="fas fa-plus"></i>
                        </Button>
                    </Link>
                ):null 
            }
        </div>
    );
}

export default CreatePostButtonNavbar;
