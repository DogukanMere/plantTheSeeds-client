import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyWord] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyWord('');
    } else {
      navigate('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} className='d-flex col-5 my-4'>
      <Form.Control
        type='text'
        name='q'
        value={keyword}
        onChange={(e) => setKeyWord(e.target.value)}
        placeholder='Search Product'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' className='btn btn-dark'>
        Search
      </Button>
    </Form>
  );
};

export default Search;
