import React  from 'react';
import useForm from 'react-hook-form';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';

import './styles/form.css';

const TradeObject = ({ goldValue, silverValue, setBalance, setDepot, setTradeAlert }) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { register, handleSubmit, errors } = useForm();
    const sellUrl = 'http://www.localhost:1337/objects/sell'
    const buyUrl = 'http://www.localhost:1337/objects/buy'

    const onSubmit = (data, e) => {
        let url = ''
        if (data.buyorsell === "Buy") {
            url = buyUrl;
            data.buyAmount = data.amount;
        }
        if (data.buyorsell === "Sell") {
            url = sellUrl;
            data.sellAmount = data.amount;
        }
        if (data.goldorsilver === "Gold") {
            data.objectId = 1;
            data.price = goldValue;
        }
        if (data.goldorsilver === "Silver") {
            data.objectId = 2;
            data.price = silverValue;
        }
        e.target.reset();
        console.log(data)
        axios.post(url, data, 
        { headers: {"x-access-token" : `${userData.token}`} })
        .then(res => {
            setTradeAlert(res.data.message);
            axios.get('http://www.localhost:1337/depots/view',
                    { headers: {"x-access-token" : `${userData.token}`} })
                    .then(res => {
                        setBalance(res.data.balance)
                        setDepot(res.data)
                    })
                })
    };
    return (
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Choose to buy or sell</Form.Label>
                    <Form.Control name='buyorsell' as="select" ref={register({required: true})}>
                        <option>Buy</option>
                        <option>Sell</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group name="goldorsilver">
                    <Form.Label>Choose gold or silver</Form.Label>
                    <Form.Control name="goldorsilver" as="select" ref={register({required: true})}>
                        <option value="Gold">Gold {goldValue} kr</option>
                        <option value="Silver">Silver {silverValue} kr</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        name="amount"
                        type="number"
                        placeholder="Grams to buy or sell"
                        ref={register({ required: true, pattern: /^[1-9]\d*$/ })}
                        />
                        {errors.amount && errors.amount.type === "pattern" && (<p className="errorMessage">That's not a valid number.</p>)}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
    );
}
export default TradeObject;