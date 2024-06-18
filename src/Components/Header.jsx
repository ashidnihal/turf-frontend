import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <div> <Navbar collapseOnSelect expand="lg" className=" pe-5" style={{backgroundColor:'#010b26'}}>
    <Container>
      <Navbar.Brand href="#home" className='text-light '>  <img
              src='https://i.pinimg.com/564x/10/ea/b1/10eab147e0945792e4c08499d97b4314.jpg'
              height='55'
            //   width={60}
              alt=''
              loading='lazy'
            />
            TurfEase</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link href="/" className='text-light'>Home</Nav.Link>

          <Nav.Link href="#features" className='text-light'>Features</Nav.Link>
          <Nav.Link href="#pricing" className='text-light'>Pricing</Nav.Link>
          {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown" className='text-light'>
            <NavDropdown.Item href="#action/3.1" className='text-light'>Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2" className='text-light'>
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3" className='text-light'>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Nav>
        <Nav.Link className='text-light btn btn-warning px-5'>
          <Link to='/login' className='text-light'>Login</Link>
            </Nav.Link>
          {/* <Nav.Link eventKey={2} href="#memes" className='text-light'>
            Dank memes
          </Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar></div>
  )
}

export default Header

// import React, { useState } from 'react';
// import {
//     MDBNavbar,
//     MDBNavbarNav,
//     MDBNavbarItem,
//     MDBNavbarLink,
//     MDBNavbarToggler,
//     MDBContainer,
//     MDBIcon,
//     MDBNavbarBrand,
//     MDBCollapse,
    
//   } from 'mdb-react-ui-kit';
// function Header() {
//     const [showBasic, setShowBasic] = useState(false);
//   return (
//     <header>
//       <MDBNavbar expand='lg' light bgColor='#'style={{backgroundColor:'#010b26'}}>
//         <MDBContainer fluid>
//           <MDBNavbarToggler
//             onClick={() => setShowBasic(!showBasic)}
//             aria-controls='navbarExample01'
//             aria-expanded='false'
//             aria-label='Toggle navigation'
//             style={{ color: 'white' }}
           
//           >
//             <MDBIcon fas icon='bars'  />
//           </MDBNavbarToggler>
//           <MDBNavbarBrand href='#' className='text-light'>
//             <img
//               src='https://i.pinimg.com/564x/10/ea/b1/10eab147e0945792e4c08499d97b4314.jpg'
//               height='55'
//             //   width={60}
//               alt=''
//               loading='lazy'
//             />
//             TurfEase
//           </MDBNavbarBrand>
//           <MDBCollapse navbar show={showBasic}>
//             <MDBNavbarNav right className='mb-2 mb-lg-0 border border-light '>
           
//               <MDBNavbarItem className='mt-2' active>
//                 <MDBNavbarLink className='text-light' aria-current='page' href='#'>
//                   Home
//                 </MDBNavbarLink>
//               </MDBNavbarItem>
//               <MDBNavbarItem className='mt-2'>
//                 <MDBNavbarLink href='#' className='text-light'>Features</MDBNavbarLink>
//               </MDBNavbarItem>
//               <MDBNavbarItem className='mt-2'>
//                 <MDBNavbarLink href='#' className='text-light'>Pricing</MDBNavbarLink>
//               </MDBNavbarItem>
//               <MDBNavbarItem className='mt-2'>
//                 <MDBNavbarLink href='#' className='text-light'>About</MDBNavbarLink>
//               </MDBNavbarItem>
//               <MDBNavbarItem className='mt-2  '>
//                 <div className='text-end'>
//                 <MDBNavbarLink href='#' className='text-light'>login</MDBNavbarLink>
//                 </div>
                
//               </MDBNavbarItem>
//             </MDBNavbarNav>
//           </MDBCollapse>
//         </MDBContainer>
//       </MDBNavbar>

     
//     </header>
//   )
// }

// export default Header