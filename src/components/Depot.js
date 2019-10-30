import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Card, ListGroup, Table} from 'react-bootstrap'

import Balance from './Balance'

const Deposit = ({balance, setBalance, depot, setDepot}) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        if (userData) {
            console.log(userData.user.email)
            // Check if the stored token still is valid.
            // Remove the token and redirect to '/login' if it's not valid.
            axios.get(`https://trading-api.blixter.me/auth/check`,
                { headers: { "x-access-token": `${userData.token}` } })
                .then(res => {
                    // If the token is valid
                    if (res.status === 200) {
                        console.log("here")
                        axios.get('https://trading-api.blixter.me/depots/view',
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
    // eslint-disable-next-line
    }, []);

    function checkForObjects() {
        if (depot.objects) {
            if (depot.objects.length === 0) {
                return <p className="text-muted">No objects here!</p>
            } else {
                let tableData = depot.objects.map(function(obj, i) {
                    return <tr key={i}><td>{obj.name}</td><td>{obj.amount} gram</td></tr>
                })
                return <Table bordered size="sm"><tbody>{tableData}</tbody></Table>
            }
        }
    }
    if(redirect) {
        return (<Redirect to={'/login'} />);
    }
    return (
        <div>
            <Card>
                <Card.Header>Depot</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Email: {depot.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p>Balance: <b>{balance} kr</b></p>
                        <Balance balance={balance} setBalance={setBalance} />
                    </ListGroup.Item>
                    <ListGroup.Item><p>Objects: </p>{checkForObjects()}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
};

export default Deposit;
