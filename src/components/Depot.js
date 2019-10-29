import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Card, ListGroup, Table, Button } from 'react-bootstrap'

import Balance from './Balance'

const Deposit = ({balance, setBalance, depot, setDepot}) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        if (userData) {
            console.log(userData.user.email)
            // Check if the stored token still is valid.
            // Remove the token and redirect to '/login' if it's not valid.
            axios.get(`http://www.localhost:1337/auth/check`,
                { headers: { "x-access-token": `${userData.token}` } })
                .then(res => {
                    // If the token is valid
                    if (res.status === 200) {
                        console.log("here")
                        axios.get('http://www.localhost:1337/depots/view',
                        { headers: {"x-access-token" : `${userData.token}`} })
                        .then(res => {
                            setBalance(res.data.balance)
                            setDepot(res.data)})
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

    }, []);

    function logOut() {
        localStorage.clear()
        setRedirect(true);
    }

    function checkForObjects() {
        if (!depot.objects) {
            return "No objects"
        } else {
            let tableData = depot.objects.map(function(obj) {
                return <tr><td>{obj.name}</td><td>{obj.amount} gram</td></tr>
            })
            return <Table bordered size="sm"><tbody>{tableData}</tbody></Table>
        }
    }
    if(redirect) {
        return (<Redirect to={'/login'} />);
    }
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Header>Depot</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Email: {depot.email}
                        <Button variant="dark" onClick={logOut}>Log out</Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Balance: {balance} kr
                        <Balance balance={balance} setBalance={setBalance} />
                    </ListGroup.Item>
                    <ListGroup.Item>Objects: {checkForObjects()}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
};

export default Deposit;
