import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  fetchProduct,
  updateProductByAdmin,
} from '../features/product/productSlice';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';

const ProductEditPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [amountInStock, setAmountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [growTime, setGrowTime] = useState(0);
  const [yieldProduct, setYieldProduct] = useState('');
  const [uploading, setUploading] = useState(false);

  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error, errorUpdate, loadingUpdate, successUpdate } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (successUpdate) {
      navigate('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(fetchProduct(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setAmountInStock(product.amountInStock);
        setDescription(product.description);
        setGrowTime(product.growTime);
        setYieldProduct(product.yield);
        setImage(product.image);
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProductByAdmin({
        _id: productId,
        name,
        price,
        image,
        amountInStock,
        description,
        yield: yieldProduct,
        growTime,
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='warning'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} encType='multipart/form-data'>
            <Form.Group controlId='name'>
              <Form.Label className='mb-1'>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='name'
                placeholder='Enter name'
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price' className='mt-3'>
              <Form.Label className='mb-1'>Price</Form.Label>
              <Form.Control
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type='number'
                placeholder='Enter price'
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                label='Choose file'
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='description' className='mt-3'>
              <Form.Label className='mb-1'>Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type='text'
                placeholder='Enter description'
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='amountInStock' className='mt-3'>
              <Form.Label className='mb-1'>Amount In Stock</Form.Label>
              <Form.Control
                value={amountInStock}
                onChange={(e) => setAmountInStock(e.target.value)}
                type='number'
                placeholder='Enter amountInStock'
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='growTime' className='mt-3'>
              <Form.Label className='mb-1'>Grow Time</Form.Label>
              <Form.Control
                value={growTime}
                onChange={(e) => setGrowTime(e.target.value)}
                type='number'
                placeholder='Enter grow time'
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='yieldProduct' className='mt-3'>
              <Form.Label className='mb-1'>Yield</Form.Label>
              <Form.Control
                value={yieldProduct}
                onChange={(e) => setYieldProduct(e.target.value)}
                type='text'
                placeholder='Enter yield'
              ></Form.Control>
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

export default ProductEditPage;
