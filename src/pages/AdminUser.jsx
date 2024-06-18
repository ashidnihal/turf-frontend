import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import { Container } from 'react-bootstrap';
import { adminAllUserAPI, deleteUserAPI } from '../Services/allAPIs';
import Swal from 'sweetalert2';

function AdminUser({ setShowHeader }) {
  const [searchKey, setSearchKey] = useState("");
  console.log(searchKey);
  const [adminUsers, setAdminUsers] = useState([]);
  const navigate = useNavigate();

  const fetchAdminUsers = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      };
      const result = await adminAllUserAPI(searchKey, reqHeader);
      setAdminUsers(result.data);
    }
  };

  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      if (sessionStorage.getItem('token')) {
        const token = sessionStorage.getItem('token');
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        };
        const result=await deleteUserAPI(userId, reqHeader);
        console.log(result);
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
        fetchAdminUsers(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error('Error deleting User:', error);
      Swal.fire('Error!', 'Failed to delete User.', 'error');
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    fetchAdminUsers();
    setShowHeader(false);
    return () => {
      setShowHeader(true);
    };
  }, [setShowHeader, searchKey]); // Add searchKey as a dependency here

  return (
    <div className="container-fluid admin-dashboard">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block sidebar" style={{ backgroundColor: '#f1f2f7', height: '650px' }}>
          <div className="sidebar-sticky">
            <h3 className="sidebar-header m-5">TurfEase</h3>
            <ul className="nav flex-column sidebar-menu">
              <li className="nav-item">
                <Link className="nav-link rounded" to="/admin">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link rounded" style={{ backgroundColor: '#e4e7f5' }} to="/admin/user">Manage Users</Link>
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
            <input 
              className="form-control form-control-dark w-50" 
              type="text" 
              placeholder="Search..." 
              aria-label="Search" 
              value={searchKey} 
              onChange={(e) => setSearchKey(e.target.value)} 
            />
            <div className="user-info mb-2">
              <span className="username me-5">Delicious Burger</span>
              <button className='btn' style={{ backgroundColor: '#f1f2f7' }} onClick={handleLogout}>
                <CiLogout className='fs-3 me-4' /> logout
              </button>
            </div>
          </div>
          <h1 className='mt-5'>Manage Users</h1>
          <p>Welcome to the user management interface. Take control of user accounts and maintain user data effortlessly.</p>
          
          <Container>
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Username</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {adminUsers.map((user, index) => (
                  <tr key={user.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <MDBIcon fas icon="trash" onClick={() => handleDelete(user._id)} />
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </Container>
        </main>
      </div>
    </div>
  );
}

export default AdminUser;
