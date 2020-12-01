const CHANGE_DIALOG = 'dialogReducer/CHANGE_DIALOG';

const initialState = {
    toDoDialogOpen: {
        open: false,
        type: 'add',
        initData: {},
    },
};

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_DIALOG:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
};
export default dialogReducer;

const _changeDialog = data => ({type: CHANGE_DIALOG, data});
export const changeDialog = (data) => {
    return (dispatch) => {
        dispatch(_changeDialog(data));
    }
};