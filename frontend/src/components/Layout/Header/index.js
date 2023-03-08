import React from 'react';
import logoSmall from '../../../image/greenFrog.png'
import { Link } from 'react-router-dom';

const index = () => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="logo">
                    <img src={logoSmall} class="d-inline-block align-middle mr-2" id="logoNavbar" width="50" /><h2 className="h2 logo__img--name">Welcome to Ribbit</h2>
                </div>

                <nav className="nav">
                    <ul className="nav__menu">
                        <li className="nav__menu--items"><Link to="/landingPage/mainLanding">Welcome</Link></li><span>/</span>
                        <li className="nav__menu--items"><Link to="/landingPage/aboutLanding">About</Link></li><span>/</span>
                        <li className="nav__menu--items"><Link to="/landingPage/functionalitiesLanding">Features</Link></li><span>/</span>
                        <li className="nav__menu--items"><Link to="/home">Go to Ribbit</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default index;