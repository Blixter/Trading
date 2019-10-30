import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'

const Start = () => {

    return (
        <Container>
            <Row>
                <Col md></Col>
                <Col md={10}>
                    <Jumbotron>
                        <h2 className="display-3">Welcome to Gold Trading!</h2>
                        <p className="font-italic">
                        This is the number one Trading platform for Gold and Silver in the world!
                            </p>
                            <p>If you want to make money, this is the place for you! Register an account and head over to Trading.</p>
                    </Jumbotron>
                </Col>
                <Col md></Col>
            </Row>
        </Container>
    );
};

export default Start;
