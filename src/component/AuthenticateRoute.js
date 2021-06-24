import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AuthenticateRoute(props){
    const { component: Component , ...rest} = props
    const loggedIn = useSelector(state => state.reducer.loggedIn)
    console.log(loggedIn)

    return (
        <Route { ...rest} render={ (props) =>(
            !loggedIn? (<Component {...props} />): (<Redirect to="/home"/>)
        )}/>
    )


}

export default AuthenticateRoute