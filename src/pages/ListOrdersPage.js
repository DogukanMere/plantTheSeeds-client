import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listOrders,
  getOrderDetails,
  deleteOrder,
  resetDeleteSuccess,
  resetRequestSuccess,
  setFarmRequest,
} from '../features/order/orderSlice';

const ListOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    orderList,
    error: errorOrder,
    loadingOrderDetail,
    successDelete,
    successRequest,
  } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    if (successDelete) {
      dispatch(resetDeleteSuccess());
      navigate('/admin/orderlist');
    }
    if (successRequest) {
      dispatch(resetRequestSuccess());
      navigate('/admin/orderlist');
    }
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successDelete, successRequest]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteOrder(id));
    }
  };

  const orderDetailHandler = async (id) => {
    await dispatch(getOrderDetails(id));
    navigate(`/order/${id}`);
  };

  const requestHandler = (id) => {
    dispatch(setFarmRequest(id));
  };
  return (
    <>
      <h1>List of Orders</h1>
      {loadingOrderDetail ? (
        <Loader />
      ) : errorOrder ? (
        <Message variant='danger'>{errorOrder}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>FARM VISIT REQUEST</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
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
                    {order.isDelivered ? (
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
                    {order.isDelivered ? (
                      <p>Order delivered</p>
                    ) : order.isReady ? (
                      <>
                        <span
                          style={{ color: 'green' }}
                          className='fw-bold me-3'
                        >
                          Requested
                        </span>
                        <Button
                          variant='success'
                          className='btn-sm'
                          onClick={() => requestHandler(order._id)}
                        >
                          Complete
                        </Button>
                      </>
                    ) : (
                      <i
                        className='fa-solid fa-xmark'
                        style={{ color: 'red' }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button
                        variant='dark'
                        className='btn-sm'
                        onClick={() => orderDetailHandler(order._id)}
                      >
                        Details
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(order._id)}
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

export default ListOrdersPage;
