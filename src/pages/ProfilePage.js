import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { updateUserInfo } from '../features/user/userSlice';
import { getOrderList, getOrderDetails } from '../features/order/orderSlice';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, errorUpdate, userInfo, success } = useSelector(
    (state) => state.user
  );

  const {
    orders,
    loadingOrder: loadingOrders,
    error: errorOrders,
  } = useSelector((state) => state.order);

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login`);
    } else {
      dispatch(getOrderList());
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate, userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else if (password.length <= 6) {
      setMessage('Password cannot be less than 6 characters');
      setPassword('');
      setConfirmPassword('');
    } else if (name.trim().length === 0) {
      setMessage('Name field is empty');
      setName('');
    } else {
      setMessage(null);
      dispatch(updateUserInfo({ id: userInfo._id, name, email, password }));
    }
  };

  const orderDetailHandler = async (id) => {
    await dispatch(getOrderDetails(id));
    navigate(`/order/${id}`);
  };

  // const getProgress = (days) => {
  //   var date1 = new Date().toISOString(),
  //     date2 = new Date(days).toISOString();
  //   // console.log(date2);
  //   var diff = date1 - date2;
  //   console.log(diff);
  // };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {success && (
          <Message variant='success'>Your profile is updated</Message>
        )}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h3>My Orders</h3>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>FARM VISIT REQUEST</th>
                {/* <th>PROGRESS</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                    <td>{order.isDelivered ? 'Delivered' : 'Not Delivered'}</td>
                    <td>
                      {order.isDelivered ? (
                        <p>Order delivered</p>
                      ) : order.isReady ? (
                        <>
                          <i
                            className='fa-solid fa-check'
                            style={{ color: 'green' }}
                          ></i>
                        </>
                      ) : (
                        <i
                          className='fa-solid fa-xmark'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    {/* <td>{getProgress(order.createdAt)}</td> */}
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <Button
                          variant='dark'
                          className='btn-sm'
                          onClick={() => orderDetailHandler(order._id)}
                        >
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
