import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../features/cart/cartSlice';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Message variant='warning'>
        We only accept payments at the door right now. Both cash and credit
        cards are accepted for payment. Please choose one of the payment method
        below.
      </Message>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='Credit Card'
              id='CreditCard'
              name='paymentMethod'
              value='CreditCard'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Cash'
              id='Cash'
              name='paymentMethod'
              value='Cash'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='secondary' className='mt-3'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
