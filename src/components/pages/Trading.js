import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'

import Depot from '../Depot'
import LineGraph from '../LineGraph'
import AlertMessage from '../AlertMessage'
import { Redirect } from 'react-router-dom';

import '../styles/container.css';

const Objects = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const [balance, setBalance] = useState('')
    const [depot, setDepot] = useState('')
    const [goldValue, setGoldValue] = useState('');
    const [silverValue, setSilverValue] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [tradeAlert, setTradeAlert] = useState('');

    useEffect(() => {
        if (userData) {
            // Check if the stored token still is valid.
            // Remove the token and redirect to '/login' if it's not valid.
            axios.get(`https://trading-api.blixter.me/auth/check`,
                { headers: { "x-access-token": `${userData.token}` } })
                .then(res => {
                    // If the token is valid
                    if (res.status === 200) {
                        axios.get('https://trading-api.blixter.me/objects/view',
                        { headers: {"x-access-token" : `${userData.token}`} })
                            // .then(res => setObjects(res.data))
                            .then(res => console.log(res.data))
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    localStorage.removeItem("user");
                    setRedirect(true);
                });
        } else {
            localStorage.removeItem("user");
            setRedirect(true);
        }
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log(goldValue);
    }, [goldValue] )

    if(redirect) {
        return (<Redirect to={'/login'} />);
    }
    return (
        <Container>
            <Row>
                <Col md></Col>
                <Col md={8}>
                    <h1>Trading</h1>
                    <AlertMessage tradeAlert={tradeAlert} setTradeAlert={setTradeAlert} />
                    <LineGraph 
                        setGoldValue={setGoldValue}
                        setSilverValue={setSilverValue}
                        goldValue={goldValue}
                        silverValue={silverValue}
                        depot={depot} 
                        setDepot={setDepot}
                        setBalance={setBalance}
                        setTradeAlert={setTradeAlert}
                    />
                </Col>
                <Col md={3}>
                    <Depot 
                        balance={balance}
                        setBalance={setBalance}
                        depot={depot}
                        setDepot={setDepot}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Objects;
