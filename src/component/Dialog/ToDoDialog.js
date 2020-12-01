import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ToDoForm from "../Form/ToDoForm";
import Dialog from "@material-ui/core/Dialog";
import {getDialog} from "../../redux/Dialog/dialogSelectors";
import {connect} from "react-redux";
import {changeDialog} from "../../redux/Dialog/dialogReducer";
import {getPositions, getPositionsObject} from "../../redux/ToDo/toDoSelectors";
import {addToDo, updateToDo} from "../../redux/ToDo/toDoReducer";

const DIALOG_NAME = 'toDoDialogOpen';

const ToDoDialog = props => {
    const {dialog, positions, positionsObject, changeDialog, addToDo, updateToDo} = props;

    const handleClose = () => {
        changeDialog({
            [DIALOG_NAME]: {
                open: false,
            }
        });
    };

    const handleSubmit = (data) => {
        if (dialog.type === 'add') {
            const id = new Date().toISOString();
            let _positions = [];
            if (!!positionsObject) {
                _positions = positions.slice();
                _positions.splice(0, 0, id);
            }
            addToDo({
                ...data,
                id,
                isChecked: false,
            });
            addToDo(!!positionsObject ? {
                ...positionsObject,
                positions: _positions.join(),
            } : {
                id: 'positions',
                positions: id,
            })
        } else if (dialog.type === 'edit') {
            updateToDo(data);
        }
        handleClose();
    };

    return (
        <Dialog open={dialog.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">ToDo</DialogTitle>
            <DialogContent>
                <ToDoForm onSubmit={handleSubmit} initialValues={dialog.initData} type={dialog.type}/>
            </DialogContent>
        </Dialog>
    );
};

let mapStateToProps = (state) => ({
    dialog: getDialog(state, DIALOG_NAME),
    positions: getPositions(state),
    positionsObject: getPositionsObject(state),
});

export default connect(mapStateToProps, {
    changeDialog,
    addToDo,
    updateToDo,
})(ToDoDialog);