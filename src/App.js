import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';

function App() {
  const { isLoading, cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems('random'));
  }, []);

  return (
    <main>
      {isLoading ? (
        <div className="loading">
          <h1>Loading....</h1>
        </div>
      ) : (
        <>
          {isOpen && <Modal />}
          <Navbar />
          <CartContainer />
        </>
      )}
    </main>
  );
}

export default App;
