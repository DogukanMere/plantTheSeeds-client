import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { registerUser } from '../features/user/userSlice';
import FormContainer from '../components/FormContainer';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, userInfo, errorRegister } = useSelector(
    (state) => state.user
  );

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      setMessage(null);
      dispatch(registerUser({ name, email, password }));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {errorRegister && <Message variant='danger'>{errorRegister}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label className='mb-1'>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='name'
            placeholder='Enter name'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='mt-3'>
          <Form.Label className='mb-1'>Email Address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Enter email'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='mt-3'>
          <Form.Label className='mb-1'>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Enter password'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirm password' className='mt-3'>
          <Form.Label className='mb-1'>Confirm Password</Form.Label>
          <Form.Control
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            placeholder='Confirm password'
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='secondary' className='my-3'>
          Register
        </Button>
      </Form>
      <Row className='pw-3'>
        <Col>
          Have an account? <Link to={`/login`}>Login</Link>{' '}
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
