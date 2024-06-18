import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import HomePage from './pages/HomePage';
import UserAuthentication from './pages/UserAuthentication';
import UserDashboard from './pages/UserDashboard';
import PartnerWithUs from './pages/PartnerWithUs';
import ExistingTurfs from './pages/ExistingTurfs';
import AdminDashboard from './pages/AdminDashboard';
import AdminUser from './pages/AdminUser';
// import AdminBooking from './pages/AdminUser';
import AdminManage from './pages/AdminManage';
import Payment from './Components/Payment';
import AdminTurf from './pages/AdminTurf';


function App() {
  const [showHeader, setShowHeader] = useState(true);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/login'} element={<UserAuthentication />} />
        <Route path={'/register'} element={<UserAuthentication register />} />
        <Route path={'/dashboard'} element={<UserDashboard setShowHeader={setShowHeader} />} />
        <Route path={'/partner-with-us'} element={<PartnerWithUs setShowHeader={setShowHeader} />} />
        <Route path={'/existingTurf'} element={<ExistingTurfs setShowHeader={setShowHeader} />} />
        <Route path={'/admin'} element={<AdminDashboard setShowHeader={setShowHeader} />} />
        <Route path={'/admin/user'} element={<AdminUser setShowHeader={setShowHeader} />} />
        <Route path={'/admin/booking'} element={<AdminManage setShowHeader={setShowHeader} />} />
        <Route path={'/admin/turfs'} element={<AdminTurf setShowHeader={setShowHeader} />} />

        <Route path="/payment" component={Payment} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
