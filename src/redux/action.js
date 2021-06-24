export const loggedIn = (userData) =>({
    type: 'LOGGED_IN',
    userData
})

export const loggedOut = () =>({
    type : 'LOGGED_OUT'
})

export const addStock = (stockData) =>({
    type : 'ADD_STOCK',
    stockData
})