import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { loginUser } from '../features/user/userSlice';
import FormContainer from '../components/FormContainer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, userInfo, errorUser } = useSelector((state) => state.user);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {errorUser && <Message variant='danger'>{errorUser}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
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
        <Button type='submit' variant='secondary' className='my-3'>
          Sign In
        </Button>
      </Form>
      <Row className='pw-3'>
        <Col>
          Don't you have an account? <Link to={'/register'}>Register</Link>{' '}
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
