import React from 'react';
import { Jumbotron, Container, Row, Col, Button } from 'react-bootstrap'

const Start = () => {

    // If name has been set, show this.
    return (
        <Container>
            <Row>
                <Col md></Col>
                <Col md={10}>
                    <Jumbotron>
                            <h1>Welcome to Gold Trading!</h1>
                            <p>
                                This is the number one Trading platform for Gold and Silver in the world!
                            </p>
                            <p>
                                <Button variant="primary">Learn more</Button>
                            </p>
                    </Jumbotron>
                </Col>
                <Col md></Col>
            </Row>
        </Container>
    );
};

export default Start;
