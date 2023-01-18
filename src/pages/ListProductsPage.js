import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  fetchProducts,
  deleteProduct,
  addProduct,
  resetDeleteSuccess,
} from '../features/product/productSlice';

const ListProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    products,
    isLoading,
    errorProducts,
    successDelete,
    errorDelete,
    loadingDelete,
    successCreate,
    errorCreate,
    loadingCreate,
    productAdded,
  } = useSelector((state) => state.products);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (successDelete) {
      dispatch(resetDeleteSuccess());
      navigate('/admin/productlist');
    }
    if (!userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/product/${productAdded._id}/edit`);
    } else {
      dispatch(fetchProducts());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    productAdded,
  ]);

  const addProductHandler = () => {
    dispatch(addProduct());
  };

  const deleteHandler = (id) => {
    if (window.confirm('Do you confirm that you want to delete?'))
      dispatch(deleteProduct(id));
  };
  return (
    <>
      <Row className='align-items-center justify-content-space'>
        <Col>
          <h1>Products</h1>
          <Button className='btn-sm my-2 btn-dark' onClick={addProductHandler}>
            <i className='fas fa-plus'></i>Add Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {isLoading ? (
        <Loader />
      ) : errorProducts ? (
        <Message variant='danger'>{errorProducts}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>AVAILABLE IN STOCK</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.amountInStock}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='dark' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
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

export default ListProductsPage;
