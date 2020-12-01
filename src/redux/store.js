import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import toDoReducer from "./ToDo/toDoReducer";
import dialogReducer from "./Dialog/dialogReducer";

const reducers = combineReducers({
    form: formReducer,
    toDo: toDoReducer,
    dialog: dialogReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;