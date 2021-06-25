export const loggedIn = (userData) =>({
    type: 'LOGGED_IN',
    userData
})

export const loggedOut = () =>({
    type : 'LOGGED_OUT'
})

export const setStock = (stockData) =>({
    type : 'SET_STOCK',
    stockData
})