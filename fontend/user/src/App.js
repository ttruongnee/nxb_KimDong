import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import '@fontsource/roboto';
import NotFound from './NotFound';
import Header from './component/header/header';
import Navbar from './component/navbar/navbar';
import Banner from './component/banner/banner';
import Home from './component/home/home';
import Category from './component/category/category';
import Footer from './component/footer/footer';
import Product from './component/product/product';
import Shoppingcart from './component/shoppingcart/shoppingcart';
import Banner2 from './component/banner2/banner2';
import Ads from './component/ads/ads';
import Login from './component/login/login';
import Payment from './component/payment/payment';


function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Navbar />
            <Banner />
            <Home />
            <Footer />
          </>
        }
      />
      <Route
        path="/theloai/:id_theloai"
        element={
          <>
            <Header />
            <Navbar />
            <Banner2 />
            <Category />
            <Footer />
          </>
        }
      />
      <Route
        path="/quangcao/:id_quangcao"
        element={
          <>
            <Header />
            <Navbar />
            <Banner2 />
            <Ads />
            <Footer />
          </>
        }
      />
      <Route
        path="/giohang"
        element={
          <>
            <Header />
            <Navbar />
            <Banner2 />
            <Shoppingcart />
            <Footer />
          </>
        }
      />
      <Route path="/truyen/:id_truyen"
        element={
          <>
            <Header />
            <Navbar />
            <Product />
            <Footer />
          </>
        }>
      </Route>

      <Route path="/dangnhap"
        element={
          <>
            <Header />
            <Navbar />
            <Banner2 />
            <Login />
            <Footer />
          </>
        }>
      </Route>

      <Route path="/payment"
        element={
          <>
            <Header />
            <Navbar />
            <Banner2 />
            <Payment />
            <Footer />
          </>
        }>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

