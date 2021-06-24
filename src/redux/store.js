import { AsyncStorage } from 'AsyncStorage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from './reducer'

const rootReducer = combineReducers({
    reducer : reducer
})

const persistConfig = {
    // Root
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'reducer',
    ],
    timeout: null,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(
        createLogger(),
    ),
);

const persistor = persistStore(store);

export { store, persistor};