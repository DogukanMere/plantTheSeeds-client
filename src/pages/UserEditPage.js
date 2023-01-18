import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserInfo, updateUserByAdmin } from '../features/user/userSlice';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';

const UserEditPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loadingUpdate,
    userForAdmin,
    userInfo,
    errorUpdateAdmin,
    loading,
    error,
    successUpdate,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (successUpdate) {
      navigate('/admin/userlist');
    } else {
      if (!userForAdmin.name || userForAdmin._id !== id) {
        dispatch(getUserInfo(id));
      } else {
        setName(userForAdmin.name);
        setEmail(userForAdmin.email);
        setIsAdmin(userForAdmin.isAdmin);
      }
    }
  }, [id, dispatch, userForAdmin, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (userInfo._id === id) {
      setErrorMessage(
        'You cannot update your own account here, please use "Profile" section to do it'
      );
    } else {
      setErrorMessage('');
      dispatch(
        updateUserByAdmin({
          _id: id,
          name,
          email,
          isAdmin,
          adminId: userInfo._id,
        })
      );
    }
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
        {errorUpdateAdmin && (
          <Message variant='warning'>{errorUpdateAdmin}</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='warning'>{error}</Message>
        ) : (
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
            <Form.Group controlId='isAdmin' className='mt-3'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type='submit' variant='secondary' className='my-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;
