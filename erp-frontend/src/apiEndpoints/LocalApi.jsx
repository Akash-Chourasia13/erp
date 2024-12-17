import axios from 'axios';

const registerBaseUrl = 'http://127.0.0.1:8000/';
const axiosInstance = axios.create({
    baseURL:registerBaseUrl,
    headers:{
        'Content-Type':'application/json'
    }
});

// Add a request Interceptor to attach the access token
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
        },
        (error) => {
            return Promise.reject(error);
        }
);

// Add a response interceptor to handle expired tokens
axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest = error.config;
        // Check if the token is expired(status 401) and refresh the token
        if(
            error.response && 
            error.response.status === 401 &&
            !originalRequest._retry
        ){
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');
            if(refreshToken){
                try{
                const refreshResponse = await axiosInstance.post(
                    `${registerBaseUrl}token/refresh/`,
                    { refresh: refreshToken}
                );
                const newAccessToken = refreshResponse.data.access;
                // Update tokens
                localStorage.setItem('access_token',newAccessToken);
                // Retry the failed request with the new access token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
                }catch(refreshError){
                    console.error('Refresh token failed',refreshError);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login'; // Redirect to login page
                }
            }
        }
        return Promise.reject(error);
    }
);


//Post Request for creating a new user
export const createUser = (userData) => {
    return axios.post(`${registerBaseUrl}useradmin/addAdminUser/`,userData);
}; 

//Post Request for creating a new partner
export const createPartner = (formPartner) => {
    return axiosInstance.post('useradmin/addPartner/',formPartner);
}; 

//Post Request for creating a new Product
export const createProduct = (newValue) => {
    return axiosInstance.post('product/addProduct/',newValue);
};

//Get Request for getting the brands
export const getBrands = () => {
    return axiosInstance.get('product/getBrand/');
};

//Post Request for creating a new Brand
export const createBrand = (newValue) => {
    return axiosInstance.post('product/addBrand/',newValue);
};

//Get Request for getting the models
export const getModels = () => {
    return axiosInstance.get('product/getModel/');
};

//Post Request for creating a new Model
export const createModel = (newValue) => {
    return axiosInstance.post('product/addModel/',newValue);
};

//Get Request for getting the Colors
export const getColors = () => {
    return axiosInstance.get('product/getColor/');
};

//Post Request for creating a new Color
export const createColor = (newValue) => {
    return axiosInstance.post('product/addColor/',newValue);
};

//Get Request for getting the partners
export const getPartners = () => {
    return axiosInstance.get('useradmin/getPartner/');
};

//Get Request for getting the products
export const getProducts = () => {
    return axiosInstance.get('product/getProduct/');
};


// Post Request for login in
export const loginUser = async(loginData) => {
    try{
        const response = await axios.post(`${registerBaseUrl}useradmin/userLogin/`,loginData);
        const {access,refresh} = response.data;
        // Save Token in Local Storage
        localStorage.setItem('access_token',access);
        localStorage.setItem('refresh_token',refresh);
        console.log('Login Successful!');
        return {
            data: response.data,
            status: response.status,
        };
    }catch(error){console.error('Login Failed',error);
        throw error;
    }

}


export default axiosInstance;
