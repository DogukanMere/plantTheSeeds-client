import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listUsers,
  deleteUser,
  resetDeleteSuccess,
} from '../features/user/userSlice';

const ListUsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    userInfo,
    users,
    errorUsers,
    loadingUsers,
    success: successDelete,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (successDelete) {
      dispatch(resetDeleteSuccess());
      navigate('/admin/userlist');
    }

    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/');
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <h1>List of Users</h1>
      {loadingUsers ? (
        <Loader />
      ) : errorUsers ? (
        <Message variant='danger'>{errorUsers}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fa-solid fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i
                        className='fa-solid fa-xmark'
                        style={{ color: 'red' }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='dark' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ListUsersPage;
