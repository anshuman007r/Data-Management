import Router from'./component/route'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider className="App align-middle mx-auto" style={{height: '100vh', display: 'block'}} store={store}>
    	<PersistGate loading={null} persistor={persistor}>
        	<Router/>
      	</PersistGate>
    </Provider>
  );
}

export default App;
