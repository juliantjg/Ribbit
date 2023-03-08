import React from 'react';
import { Navbar, Container, NavDropdown, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import logoSmall from '../../image/greenFrog.png'
import { useDispatch, useSelector } from 'react-redux';
import homeLogo from '../../image/home-solid.svg';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import NotificationButton from '../Notification/NotificationButton';
import ShowMySubribbitsButtonNavbar from '../Buttons/ShowMySubribbitsButtonNavbar';
import CreatePostButtonNavbar from '../Posts/CreatePostButtonNavbar';

function UserNavbar() {

    // get userLogin from state 
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    // now call the dispatch to logout in userActions
    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <Container>
                <div class="pt-1">
                    <Link to="/">
                        <Navbar.Brand>
                            <img src={logoSmall} class="d-inline-block align-middle mr-2" id="logoNavbar" width="50" />
                            Ribbit
                        </Navbar.Brand>
                    </Link>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav" align="center">
                    {/* Need to set this navbar as a separate ul first, and then give a me-auto. Check the next ul */}
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item active">
                            <Link to="/home">
                                <button type="button" class="btn btn-dark" id="buttonHome">
                                    <li class="nav-item active">

                                        <i className="fas fa-home fa-lg"></i>
                                        &nbsp;&nbsp;Home

                                        <span class="sr-only">(current)</span>

                                    </li>
                                </button>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <ShowMySubribbitsButtonNavbar />
                        </li>
                        <li class="nav-item active">
                            <Link to="/subribbits">
                                <button type="button" class="btn btn-dark" id="buttonCommunities">
                                    <li class="nav-item active">

                                        <i className="fas fa-users fa-lg"></i>
                                        &nbsp;&nbsp;Communities

                                        <span class="sr-only">(current)</span>

                                    </li>
                                </button>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/explore">
                                <button type="button" class="btn btn-dark" id="buttonCommunities">
                                    <li class="nav-item active">

                                        <i class="fas fa-compass fa-lg"></i>
                                        &nbsp;&nbsp;Explore

                                        <span class="sr-only">(current)</span>

                                    </li>
                                </button>
                            </Link>
                        </li>
                    </ul>
                    <ul class="navbar-nav navbar-right">
                        <CreatePostButtonNavbar />
                        &nbsp;&nbsp;&nbsp;
                    </ul>
                    <ul class="navbar-nav navbar-right">
                        {
                            userInfo ?
                                (
                                    <NotificationButton />
                                ) : null
                        }
                        &nbsp;
                    </ul>
                    {/* So here is the next ul, where I put the navbar-right in a separate ul for the user dropdown */}
                    <ul class="navbar-nav navbar-right">
                        <li class="nav-item">
                            <button type="button" class="btn btn-dark">
                                {
                                    userInfo ?
                                        (
                                            <NavDropdown title={
                                                <>
                                                    <img src={userInfo.gravatarURL} id="profileLogo" />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;{userInfo.username}
                                                </>
                                            }
                                                class="pt-1"
                                            >

                                                <LinkContainer to={`/user/${userInfo.username}`}>
                                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                                </LinkContainer>
                                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                            </NavDropdown>
                                        )
                                        :
                                        (
                                            <LinkContainer to='/login'>
                                                <Nav.Link>
                                                    <i className="fas fa-user"></i>
                                                    &nbsp;&nbsp;Login
                                                </Nav.Link>
                                            </LinkContainer>
                                        )
                                }
                            </button>
                        </li>
                    </ul>
                </div>
            </Container>
        </nav>




    );
}

export default UserNavbar;
