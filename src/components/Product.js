import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Card className='rounded my-2 border-main overflow-hidden'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          style={{ width: '15rem', height: '15rem' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} className='text-decoration-none'>
          <Card.Title as='div'>
            <h3 className='fs-5 text-bold'>{product.name} Seed</h3>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <p className='text-muted py-0'>
            Available Seeds:{' '}
            <small className='text-main fw-bold'>
              {product.amountInStock} pcs
            </small>
          </p>
          <strong className='text-muted'>
            Price: <small className='text-main fs-5'>${product.price}</small>
          </strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
