import axios from "axios";

const API_URL = "http://localhost:8000";




// GET API PPC
export const getPearsonPC = async (data) => {
    const respone = await axios.post(`${API_URL}/pearson`, data)
    console.log(respone.data)
    return respone.data;
}


// GET API COSINE
export const getCosine = async (data) => {
    const response = await axios.post(`${API_URL}/cosine`, data);
    return response.data;
};


// GET API ACOSINE
export const getACosine = async (data) => {
    const response = await axios.post(`${API_URL}/acosine`, data);
    return response.data;
};


// GET API BC
export const getBC = async (data) => {
    const response = await axios.post(`${API_URL}/bc`, data);
    return response.data;
};