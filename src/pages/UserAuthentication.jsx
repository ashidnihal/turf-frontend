import React, { useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { loginAPI, registerAPI } from '../Services/allAPIs';
function UserAuthentication({register}) {
  const navigate= useNavigate()
  const[userData,setuserData]=useState({
    username:"",
    email:"",
    password:""
  })
  const handleRegister=async(e)=>{
    e.preventDefault()
    if(!userData.username||!userData.email||!userData.password){
      
      Swal.fire({
        title: 'Warning',
        text: 'please fill the form',
        icon: 'warning',
        confirmButtonText: 'Back'
      })
      
    }else{
      const result= await registerAPI(userData)
      console.log(result);
      if(result.status===200){
       
        Swal.fire({
          title: 'Success',
          text: 'User Registerd',
          icon: 'success',
          confirmButtonText: 'Back'
        })
        setuserData({
          username:"",
          email:"",
          password:""
        })
        navigate('/login')
      }
      else if(result.response.status===406){
        
        Swal.fire({
          title: 'Error',
          text: result.response.data,
          icon: 'error',
          confirmButtonText: 'Back'
        })
      }
    }
    console.log(userData);

  }
  const handleLogin=async(e)=>{
    e.preventDefault()
    if(!userData.email||!userData.password){
      
      Swal.fire({
        title: 'Warning',
        text: 'please fill the form',
        icon: 'warning',
        confirmButtonText: 'Back'
      })
      
    }else{
      const result= await loginAPI(userData)
      console.log(result);
      if(result.status===200){
       
        sessionStorage.setItem("username",result.data.existingUser.username)
        sessionStorage.setItem("token",result.data.token)

        Swal.fire({
          title: 'Success',
          text: 'Login Success',
          icon: 'success',
          confirmButtonText: 'ok'
        })
        setuserData({
         
          email:"",
          password:""
        })
        if(userData.email == "admin@gmail.com"){
          navigate('/admin')
        }else{
        navigate('/dashboard')

        }
      }
      else if(result.response.status===404){
        
        Swal.fire({
          title: 'Error',
          text: result.response.data,
          icon: 'error',
          confirmButtonText: 'Back'
        })
      }
    }
    console.log(userData);

  }

  return (
    <div style={{backgroundColor:'#010b26'}}>  <MDBContainer fluid>

    <MDBRow className='d-flex justify-content-center align-items-center h-100 '>
      <MDBCol col='12'>

        <MDBCard className=' text-white my-5 mx-auto border border-light' style={{borderRadius: '1rem', maxWidth: '400px',backgroundColor:'#010b26'}}>
          <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
          <img
              src='https://i.pinimg.com/564x/10/ea/b1/10eab147e0945792e4c08499d97b4314.jpg'
              height='75'
            //   width={60}
              alt=''
              loading='lazy'
            />
            <h2 className="fw-bold mb-4 text-uppercase">TurfEase</h2>
            {/* <p className="text-white-50 mb-5">Please enter your login and password!</p> */}
            {
              register &&
            <MDBInput wrapperClass='mb-4 mx-5 w-100' onChange={e=>{setuserData({...userData,username:e.target.value})}} value={userData.username} labelClass='text-white' label='User name' id='formControlLg' type='text' size="lg"/>

            }
            <MDBInput wrapperClass='mb-4 mx-5 w-100' onChange={e=>{setuserData({...userData,email:e.target.value})}} value={userData.email} labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' onChange={e=>{setuserData({...userData,password:e.target.value})}} value={userData.password} labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"/>

            <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
           { register?
            <MDBBtn onClick={handleRegister} outline className='mx-2 px-5' color='white' size='lg'>
              Register
            </MDBBtn>:<MDBBtn onClick={handleLogin} outline className='mx-2 px-5' color='white' size='lg'>
              Login
            </MDBBtn>}

            <div className='d-flex flex-row mt-3 mb-1'>
              <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                <MDBIcon fab icon='facebook-f' size="lg"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                <MDBIcon fab icon='twitter' size="lg"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                <MDBIcon fab icon='google' size="lg"/>
              </MDBBtn>
            </div>

            <div>
            {
                register?
                <div >
                  <p className="mt-3">Already Registered?<Link to={'/login'}><a href="#!" class="text-white-50 fw-bold">Login here</a></Link></p>
                  
                </div>
                :
                <div >

                  <p className="mt-3">Don't have an account?<Link to={'/register'}><a href="#!" class="text-white-50 fw-bold">Sign Up</a></Link> </p>
                </div>
              
            }
            </div>
          </MDBCardBody>
        </MDBCard>

      </MDBCol>
    </MDBRow>

  </MDBContainer></div>
  )
}

export default UserAuthentication