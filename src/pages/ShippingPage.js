import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../features/cart/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [state, setState] = useState(shippingAddress.state);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, state, country })
    );
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label className='mb-1'>Address</Form.Label>
          <Form.Control
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type='text'
            required
            placeholder='Enter address'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='state' className='mt-3'>
          <Form.Label className='mb-1'>State</Form.Label>
          <Form.Control
            value={state}
            onChange={(e) => setState(e.target.value)}
            type='text'
            required
            placeholder='Enter state'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city' className='mt-3'>
          <Form.Label className='mb-1'>City</Form.Label>
          <Form.Control
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type='text'
            required
            placeholder='Enter city'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode' className='mt-3'>
          <Form.Label className='mb-1'>Postal Code</Form.Label>
          <Form.Control
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            type='text'
            required
            placeholder='Enter postal code'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country' className='mt-3'>
          <Form.Label className='mb-1'>Country</Form.Label>
          <Form.Control
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type='text'
            required
            placeholder='Enter country'
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='secondary' className='mt-3'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
