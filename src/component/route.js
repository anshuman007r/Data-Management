import  { BrowserRouter as Router , Switch } from 'react-router-dom'
import LoginPage from './Login'
import HomePage from './Homepage'
import AuthenticateRoute from './AuthenticateRoute';
import ProtectiveRoute from './ProtetiveRoute';

function route(props) {
        return (
            <div>
                <Router>
                    <Switch>
                        <AuthenticateRoute exact path = '/'  component = {LoginPage}/>
                        <ProtectiveRoute path = '/home'  component = {HomePage}/>
                    </Switch>
                </Router>
            </div>
        );
}

export default route;