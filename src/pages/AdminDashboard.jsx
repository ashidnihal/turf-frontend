// src/components/AdminDashboard.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";

const AdminDashboard = ({ setShowHeader }) => {
  useEffect(() => {
    setShowHeader(false);
    return () => {
      setShowHeader(true);
    };
  }, [setShowHeader]);

  return (
    <div className="container-fluid admin-dashboard">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block  sidebar" style={{backgroundColor:'#f1f2f7',height:'650px'}}>
          <div className="sidebar-sticky" >
            <h3 className="sidebar-header m-5">TurfEase</h3>
            <ul className="nav flex-column sidebar-menu">
              <li className="nav-item">
                <Link className="nav-link rounded"  style={{backgroundColor:'#e4e7f5'}} to="/admin">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/user">Manage Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/booking">Manage Bookings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/turfs">Manage Turfs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/customer-review">View Statistics</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/admin/payment">Payment</Link>
              </li>
            
            
            </ul>

           
          </div>
        </nav>

        <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <input className="form-control form-control-dark w-50" type="text" placeholder="Search..." aria-label="Search" disabled />
            <div className="user-info mb-2">
              <span className="username me-5">Delicious Burger</span>
              {/* <div> */}
                <button className='btn ' style={{backgroundColor:'#f1f2f7'}}><CiLogout className='fs-3 me-4' /> logout</button>
            {/* </div> */}
            </div>
          </div>
          <h1 className='mt-5'>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage users, bookings, and view statistics.</p>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Users</h5>
              <p className="card-text">View and manage all registered users.</p>
              <a href="/admin/user" className="btn btn-primary">Manage Users</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Bookings</h5>
              <p className="card-text">View and manage all turf bookings.</p>
              <a href="/admin/booking" className="btn btn-primary">Manage Bookings</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Turfs</h5>
              <p className="card-text">Browse through all available turfs .</p>
              <a href="/admin/turfs" className="btn btn-primary">View Turfs</a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">View Statistics</h5>
              <p className="card-text">View site usage and other statistics.</p>
              <a href="/admin/stats" className="btn btn-primary">View Statistics</a>
            </div>
          </div>
        </div>
      </div>
    
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
