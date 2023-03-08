import React from "react";
import { Row, Col, Container } from "react-bootstrap";

function Footer() {
    return (
        <div>
            <footer class="footer">
                <Container>
                    <Row>
                        <div>
                            <hr
                                style={{
                                    color: "white",
                                    backgroundColor: "black",
                                    height: 1,
                                }}
                            />

                            <p>
                                <small className="d-flex justify-content-center">
                                    <b>Project by Julian Tjiong</b>
                                </small>
                            </p>
                        </div>
                    </Row>
                    <Row xs="auto" className="d-flex justify-content-center">
                        <Col>
                            <small>
                                <a href="https://www.linkedin.com/in/juliantj/" target="_blank" id="footerLinks">LinkedIn</a>
                            </small>
                        </Col>
                        <Col>
                            <small>
                                <a href="https://juliantjg.github.io/" target="_blank" id="footerLinks">Portfolio</a>
                            </small>
                        </Col>
                        <Col>
                            <small>
                                <a href="https://github.com/juliantjg" target="_blank" id="footerLinks">GitHub</a>
                            </small>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}

export default Footer;
