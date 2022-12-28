import axios from "axios";
import {cartType, productType, userType} from "../store/tsTypes";

const instance = axios.create({
    baseURL: 'https://fakestoreapi.com/',
    // headers: {
    //     authorization: `Bearer ${token}`
    // }
});

export const getProductsRequest = (limit: number = 20) => {
    return instance.get<productType[]>(`products?limit=${limit}`)
        .then(response => {
            return response.data;
        })
}

export const getOneProductRequest = (id: number | string | undefined) => {
    return instance.get<productType>(`products/${id}`)
        .then(response => {
            return response.data;
        })
}

export const getCategoriesRequest = () => {
    return instance.get<Array<string>>(`products/categories`)
        .then(response => {
            return response.data;
        })
}


export const getProductsByCategoryRequest = (name: string | undefined) => {
    return instance.get<productType[]>(`products/category/${name}`)
        .then(response => {
            return response.data;
        })
}


export const addProductsRequest = (product: productType) => {
    return instance.post<productType>(`products`, product)
        .then(response => {
            return response.data;
        })
}


export const updateProductRequest = ({id, ...product}: productType) => {
    console.log(product)
    return instance.put<productType>(`products/${id}`, product)
        .then(response => {
            return response.data;
        })
}

export const deleteProductRequest = (id: string | number | undefined) => {
    return instance.delete<productType>(`products/${id}`)
        .then(response => {
            return response.data;
        })
}

//----------------------------------------CART--------------------------------------------------------------------------
export const getCartsRequest = () => {
    return instance.get<cartType[]>(`carts`)
        .then(response => {
            return response.data
        })
}


export const getOneCartRequest = (id: string | number | undefined) => {
    return instance.get<cartType>(`carts/${id}`)
        .then(response => {
            return response.data
        })
}

export const getUserCartRequest = (userId: string | number | undefined) => {
    return instance.get<cartType>(`carts/user/`)
        .then(response => {
            return response.data
        })
}

export const addCartRequest = (cart: cartType) => {
    return instance.post<cartType>(`carts`, cart)
        .then(response => {
            console.log(response)
            return response.data
        })
}

export const updateCartRequest = ({id, ...cart}: cartType) => {
    return instance.put(`carts/${id}`, cart)
        .then(response => {
            console.log(response)
            return response.data
        })
}

export const deleteCartRequest = (cartId: string | number | undefined) => {
    return instance.delete<cartType>(`carts/${cartId}`)
        .then(response => {
            return response.data
        })
}


//----------------------------------------USER--------------------------------------------------------------------------
export const getUsersRequest = () => {
    return instance.get<userType[]>(`users`)
        .then(response => {
            return response.data
        })
}

export const getOneUserRequest = (id: string | number | undefined) => {
    return instance.get<userType>(`users/${id}`)
        .then(response => {
            return response.data
        })
}

export const addUserRequest = (user: userType) => {
    return instance.post(`users`, user)
        .then(response => {
            return response.data
        })
}

export const updateUserRequest = ({id, ...user}: userType) => {
    return instance.put(`users/${id}`, user)
        .then(response => {
            return response.data
        })
}

export const deleteUserRequest = (id: string | number | undefined) => {
    return instance.delete<userType>(`users/${id}`)
        .then(response => {
            return response.data
        })
}


export const authUserRequest = (body: string) => {
    return instance.post('auth/login', body).then(response => {
        return response.data
    })
}


