import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Row, Card, Col, ListGroup, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { createOrder } from '../features/order/orderSlice';
import { useEffect } from 'react';

function PlaceOrderPage() {
  const navigate = useNavigate();
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );
  const { order, successNewOrder, error } = useSelector((state) => state.order);

  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo._id;

  // Price Calculation
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 75 ? 0 : 5;
  const taxPrice = Number((0.13 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successNewOrder) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, successNewOrder, order._id]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderComponents: cartItems,
        userInfo: userId,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                Address:
                <span>
                  {' '}
                  {shippingAddress.address}, {shippingAddress.city},{' '}
                  {shippingAddress.postalCode}, {shippingAddress.state},{' '}
                  {shippingAddress.country},
                </span>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                Method: <span>{paymentMethod}</span>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order List</h2>
              {cartItems.length === 0 ? (
                <Message>There is no item in your cart</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={3}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              rounded
                              className='col-3'
                            />
                          </Col>
                          <Col md={5}>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className='fw-bold'>
                  <Col>Total</Col>
                  <Col>${totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='col-12 p-1 btn-dark'
                  disabled={cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderPage;
