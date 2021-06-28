import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectiveRoute(props){
    const { component: Component , ...rest} = props
    const loggedIn = useSelector(state => state.reducer.loggedIn)
    return (
        <Route {...rest} render={ (props) =>(
            loggedIn? (<Component {...props} />): (<Redirect to="/"/>)
        )}/>
    )
}

export default ProtectiveRoute