import React from "react";
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";

function InformationSideBar() {
    return (
        <Card className="p-4 rounded" id="informationSideBarSize">
            <small>
                Welcome to Ribbit! My name is Julian Tjiong. I made Ribbit as a side project to improve my knowledge
                of web application development. Ribbit is made with <span style={{ color: "blue" }}><b>React+Redux</b></span> (frontend) and <span style={{ color: "green" }}><b>Django</b></span> (backend).
                Click <Link to="/landingPage/functionalitiesLanding" id="footerLinks"><b>here</b></Link> to access more
                information regarding Ribbit's features and development.
                <br />
                <hr />
                <center>
                    <b>
                        <a href="https://www.linkedin.com/in/juliantj/" target="_blank" id="footerLinks">LinkedIn</a>
                        &nbsp;&#x2022;&nbsp;
                        <a href="https://juliantjg.github.io/" target="_blank" id="footerLinks">Portfolio</a>
                        &nbsp;&#x2022;&nbsp;
                        <a href="https://github.com/juliantjg" target="_blank" id="footerLinks">GitHub</a>
                    </b>
                </center>
            </small>
        </Card>
    );
}

export default InformationSideBar;
