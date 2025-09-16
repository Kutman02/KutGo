import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './Pages/Home';
import Movie from './Pages/Movie';
import Favorites from './Pages/Favorites';
import Error from './Pages/404';
import { useEffect } from 'react';
import { fetchMenu } from './redux/slices/menuSlice';
import { useAppDispatch } from './redux/hooks';
import MobileHeader from './components/layout/MobileHeader';
import { useLocation } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import BackToTop from './components/layout/BackToTop';
import Movies from './Pages/Movies';
import Faq from './Pages/Faq';
import Help from './Pages/Help';
import Account from './Pages/Account';

type AppMainProps = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AppMain({ theme: _theme, setTheme: _setTheme }: AppMainProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
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
        <BackToTop />
      </BrowserRouter>
    </>
  );
}
export default AppMain;
