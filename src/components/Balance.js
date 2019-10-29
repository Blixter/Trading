import React  from 'react';
import useForm from 'react-hook-form';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';

import './styles/form.css';

const Balance = ({ balance, setBalance }) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = (data, e) => {
        e.target.reset();
        data.balance = parseInt(data.balance) + parseInt(balance)
        axios.put('http://www.localhost:1337/depots', data, 
        { headers: {"x-access-token" : `${userData.token}`} })
        .then(res => setBalance(data.balance))
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Control 
                    name="balance"
                    placeholder="Value to transfer to your depot"
                    ref={register({ required: true, pattern: /^[1-9]\d*$/ })}
                    />
                    {errors.balance && errors.balance.type === "pattern" && (<p className="errorMessage">That's not a valid number.</p>)}
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
export default Balance;