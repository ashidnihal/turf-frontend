import { serverURL } from "./serverURL";
import { commonAPI } from "./commonAPI";


// register api call

export const registerAPI =async(user)=>{
    return await commonAPI("post",`${serverURL}/register`,user,"")
}
// login api call

export const loginAPI =async(user)=>{
    return await commonAPI("post",`${serverURL}/login`,user,"")
}

// add turf call

export const addTurfApi= async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${serverURL}/turf/add-turf`,reqBody,reqHeader)
}

export const allTurfAPI= async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${serverURL}/turf/get-all-turf?search=${searchKey}`,"",reqHeader)
}
// user turf
export const userTurfAPI= async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${serverURL}/turf/getturf?search=${searchKey}`,"",reqHeader)
}

// book turf
export const bookTurfAPI = async (reqBody, reqHeader) => {
    return await commonAPI("post", `${serverURL}/turf/book`, reqBody, reqHeader);
};
// Verify booking
export const verifyBookingAPI = async (reqBody, reqHeader) => {
    return await commonAPI("post", `${serverURL}/turf/verify-booking`, reqBody, reqHeader);
};


// admin all turf

export const adminAllTurfAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${serverURL}/turf/admin/allturf?search=${searchKey}`,"",reqHeader)
}


export const adminAllUserAPI=async(searchKey,reqHeader)=>{

    return await commonAPI("get",`${serverURL}/turf/admin/users?search=${searchKey}`,"",reqHeader)
}

export const adminBookinngAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${serverURL}/turf/admin/bookings?search=${searchKey}`,"",reqHeader)
}

// delete booking
export const deleteBookingAPI = async(bookingId,reqHeader)=> {
    return await commonAPI("delete",`${serverURL}/turf/delete-a-booking/${bookingId}`, {}, reqHeader);
  };


  // delete turf
export const deleteTurfAPI = async(turfId,reqHeader)=> {
    return await commonAPI("delete",`${serverURL}/turf/delete-a-turf/${turfId}`, {}, reqHeader);
  };

    // delete user
export const deleteUserAPI = async(userId,reqHeader)=> {
    return await commonAPI("delete",`${serverURL}/turf/delete-a-user/${userId}`, {}, reqHeader);
  };