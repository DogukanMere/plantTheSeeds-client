import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Meta from '../components/Meta';
import { fetchProduct } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  FormSelect,
} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = () => {
  // take id parameters from url
  const { id } = useParams();
  const navigate = useNavigate();

  // State Quantity for a Product
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const { product, isLoading, errorProduct } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    const addedItem = { id: product._id, qty: qty };
    dispatch(addToCart(addedItem));
    navigate(`/cart`);
  };

  return (
    <>
      <Link className='btn btn-sm btn-light my-2' to='/'>
        Back to List
      </Link>
      {isLoading ? (
        <Loader />
      ) : errorProduct ? (
        <Message variant='danger'>{errorProduct}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row className='my-3'>
            <Col md={3}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className='mb-2'
              />
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3 className='text-main fw-bold text-uppercase fs-4'>
                    {product.name} SEED
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <small className='text-dark fs-6'>
                    {product.description}
                  </small>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={4} className='py-2'>
                      <span className='text-main fw-bold fs-6'>Duration:</span>
                      <small className='text-dark fs-6'>
                        {' '}
                        {product.growTime} days
                      </small>
                    </Col>
                    <Col md={4} className='py-2'>
                      <span className='text-main fw-bold fs-6'>
                        Available Seeds:
                      </span>
                      <small className='text-dark fs-6'>
                        {' '}
                        {product.amountInStock} pcs
                      </small>
                    </Col>
                    <Col md={4} className='py-2'>
                      <span className='text-main fw-bold fs-6'>Yield:</span>
                      <small className='text-dark fs-6'> {product.yield}</small>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className='text-main fw-bold fs-6'>Price: </span>
                  <small className='text-muted fw-bold fs-5'>
                    {' '}
                    ${product.price}
                  </small>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3} className='mt-2'>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='py-3'>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <span>
                          {product.amountInStock > 0
                            ? 'In stock'
                            : 'Out of stock'}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='py-3'>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        <span className='fw-bold'>${product.price}</span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.amountInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <FormSelect
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className='align-self'
                          >
                            {[...Array(product.amountInStock).keys()].map(
                              (q) => (
                                <option key={q + 1} value={q + 1}>
                                  {q + 1}
                                </option>
                              )
                            )}
                          </FormSelect>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className='btn btn-dark col-12 py-2'
                      type='button'
                      disabled={product.amountInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
