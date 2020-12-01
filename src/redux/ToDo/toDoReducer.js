import {ApiAddToDo, ApiDeleteToDo, ApiGetAllToDos, ApiUpdateToDo} from "../../api/api";

const ADD_TODO = 'toDoReducer/ADD_TODO';
const UPDATE_TODO_DND = 'toDoReducer/UPDATE_TODO_DND';

const initialState = [];

const toDoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return action.data.map(item => item.doc);
        case UPDATE_TODO_DND:
            return state.slice().map(item => item.id === action.data.id ? action.data : item);
        default:
            return state;
    }
};
export default toDoReducer;

const _addToDo = (data) => ({type: ADD_TODO, data});
export const addToDo = (toDo) => {
    return async () => {
        try {
            await ApiAddToDo(toDo);
        } catch (e) {
            console.log(e);
        }
    };
};

export const getAllToDo = () => {
    return async (dispatch) => {
        if (typeof dispatch === "function") {
            try {
                await ApiGetAllToDos()
                    .then((data) => {
                        dispatch(_addToDo(data.rows));
                    });
            } catch (e) {
                console.log(e);
            }
        }
    };
};

export const updateToDo = (data) => {
    return async () => {
        try {
            await ApiUpdateToDo(data)
        } catch (e) {
            console.log(e);
        }
    };
};

const _updateToDoDND = (data) => ({type: UPDATE_TODO_DND, data});
export const updateToDoDND = (data) => {
    return async (dispatch) => {
        try {
            dispatch(_updateToDoDND(data));
            await ApiUpdateToDo(data)
        } catch (e) {
            console.log(e);
        }
    };
};

export const deleteToDo = (toDo) => {
    return async () => {
        try {
            await ApiDeleteToDo(toDo);
        } catch (e) {
            console.log(e);
        }
    };
};