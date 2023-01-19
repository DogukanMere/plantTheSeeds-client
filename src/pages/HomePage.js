import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/product/productSlice';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Meta from '../components/Meta';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';
import Search from '../components/Search';

const HomePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;

  const { products, isLoading, errorProducts } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(keyword));
  }, [dispatch, keyword]);
  return (
    <>
      <Meta />
      <h2 className='fs-2 text-dark'>Listed Products</h2>
      <Search />
      {isLoading ? (
        <Loader />
      ) : errorProducts ? (
        <Message variant='danger'>{errorProducts}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col
                sm={12}
                md={6}
                lg={4}
                xl={3}
                style={{ width: '17rem' }}
                key={product._id}
                className='align-items-stretch d-flex'
              >
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomePage;
