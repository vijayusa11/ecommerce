import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Products, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import Login from './Login';
import { auth } from './firebase';

const App = () => {
  const [user, loading] = useAuthState(auth);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  var Spinner = require('react-spinkit');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  if (loading) {
    return (
    <AppLoading>
      <AppLoadingContents>
        <img src='data:image/png;base64,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' alt='Vijay Choudhary' />
        <Spinner name='ball-spin-fade-loader' color='purple' fadeIn='none' />
      </AppLoadingContents>
    </AppLoading>
  );
}

  return (
    <>
    {!user ? (
   <Login />
 ) : (
      <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
          </Route>
          <Route path="/checkout" exact>
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route>
        </Switch>
      </div>
    </Router>
 )}
 </>
  );
};

export default App;


const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  > img {
    height: 200px;
    padding: 20px;
    object-fit: contain;
  }
`;