import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import ListUsersPage from './pages/ListUsersPage';
import UserEditPage from './pages/UserEditPage';
import ListProductsPage from './pages/ListProductsPage';
import ProductEditPage from './pages/ProductEditPage';
import ListOrdersPage from './pages/ListOrdersPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='py-4'>
          <Container>
            <Routes>
              <Route path='/order/:id' element={<OrderPage />} />
              <Route path='/placeorder' element={<PlaceOrderPage />} />
              <Route path='/payment' element={<PaymentPage />} />
              <Route path='/shipping' element={<ShippingPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/cart'>
                <Route path=':id' element={<CartPage />} />
                <Route path='' element={<CartPage />} />
              </Route>
              <Route path='/admin/userlist' element={<ListUsersPage />} />
              <Route path='/admin/user/:id/edit' element={<UserEditPage />} />
              <Route path='/admin/productlist' element={<ListProductsPage />} />
              <Route path='/admin/orderlist' element={<ListOrdersPage />} />
              <Route
                path='/admin/product/:id/edit'
                element={<ProductEditPage />}
              />
              <Route path='/search/:keyword' element={<HomePage />} />
              <Route path='/page/:pageNumber' element={<HomePage />} index />
              <Route
                path='/search/:keyword/page/:pageNumber'
                element={<HomePage />}
                index
              />
              <Route path='/' element={<HomePage />} index />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
