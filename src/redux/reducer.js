const initialState ={
    loggedIn : false,
    userData : {},
    stockData : []
}


const reducer = (state = initialState, action) =>{
    switch(action.type){
        case 'LOGGED_IN':
            return {
                ...state,
                loggedIn: !state.loggedIn,
                userData : action.userData
            }
        case 'LOGGED_OUT' :
            return {
                ...state,
                loggedIn : !state.loggedIn,
                userData : {}
            }
        case 'SET_STOCK' :
            return {
                ...state,
                stockData : action.stockData
            }
        default :
            return state
    }
}

export default reducer