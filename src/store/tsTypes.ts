export type productReducerType = {
    product: productType | null | undefined
    products: Array<productType> | null | undefined
    categories: Array<string> | undefined
    error: '' | string | unknown
    isLoading: true | false
}

export type authReducerType = {
    error: '' | string | unknown
    token: string | null,
    isLogin: true | false
    isLoading: true | false
}

export type cartReducerType = {
    cart: cartType | null | undefined,
    carts: Array<cartType> | null | undefined,
    error: '' | string | unknown
    isLoading: true | false
}

export type userReducerType = {
    user: userType | null | undefined,
    users: Array<userType> | null | undefined,

    error: '' | string | unknown
    isLoading: true | false
}

export type ratingType = {
    rate: number
    count: number
}

export type productType = {
    id: number | string | undefined
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: ratingType
}


export type cartProductType = {
    productId: number
    quantity: number
}

export type cartType = {
    id: number
    userId: number
    date: string
    products: Array<cartProductType>
    __v: number
}

export type geolocationType = {
    lat: string,
    long: string
}

export type addressType = {
    geolocation: geolocationType
    city: string
    street: string
    number: number
    zipcode: string
}

export type nameType = {
    firstname: string
    lastname: string
}

export type userType = {
    address: addressType,
    id: number | undefined
    email: string
    username: string
    password: string
    name: nameType
    phone: string
    __v: number
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type RegistrationModalType = {
    setIsModalRegisterOpen: (a: boolean) => void,
    isModalRegisterOpen: boolean,
    openNotification: (message: string, description: string, type: NotificationType) => void
}

export type LoginModalType = {
    setUsername:(a: string) => void,
    setIsModalLoginOpen: (a: boolean) => void,
    isModalLoginOpen: boolean,
    openNotification: (message: string, description: string, type: NotificationType) => void
}