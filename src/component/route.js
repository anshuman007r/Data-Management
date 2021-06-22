import  { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import LoginPage from './Login'
import HomePage from './Homepage'

function route(props) {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path = '/'  component = {HomePage}/>
                        <Route path = '/login'  component = {LoginPage}/>
                    </Switch>
                </Router>
            </div>
        );
}

export default route;