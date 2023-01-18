import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  FormSelect,
  Button,
  ListGroupItem,
  Card,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';

const CartPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { cartItems } = useSelector((store) => store.cart);
  const { userInfo } = useSelector((store) => store.user);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const changeItemQty = (id, qty) => {
    dispatch(addToCart({ id, qty }));
    navigate('/cart');
  };

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login');
    } else {
      navigate('/shipping');
    }
  };

  return (
    <Row>
      <Col md={8}>
        <h2 className='fs-4'>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your cart looks empty. <Link to={'/'}>Go to Products</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.product}`}
                      className='text-decoration-none'
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <FormSelect
                      value={item.qty}
                      onChange={(e) =>
                        changeItemQty(item.product, Number(e.target.value))
                      }
                      className='align-self'
                    >
                      {[...Array(item.amountInStock).keys()].map((q) => (
                        <option key={q + 1} value={q + 1}>
                          {q + 1}
                        </option>
                      ))}
                    </FormSelect>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3 className='fs-5 fw-bold text-secondary'>
                Subtotal of (
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h3>
              <strong className='fw-normal fs-5 text-secondary'>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </strong>
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type='btn'
                className='btn btn-dark col-12 py-2'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
