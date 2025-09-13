import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './Pages/Home';
import Movie from './Pages/Movie';
import Favorites from './Pages/Favorites';
import Error from './Pages/404';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchMenu } from './redux/slices/menuSlice';
import { useAppDispatch } from './redux/hooks';
import MobileHeader from './components/layout/MobileHeader';
import Movies from './Pages/Movies';
import Faq from './Pages/Faq';
import Help from './Pages/Help';
import Account from './Pages/Account';

function AppMain() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <MobileHeader />
        {/* Main content area */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Favorites />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/menu" element={<Movies />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/help" element={<Help />} />
          <Route path="/account" element={<Account />} />
          {/* Fallback route for 404 errors */}
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default AppMain;
