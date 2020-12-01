import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import Checkbox from "@material-ui/core/Checkbox";
import {Box} from "@material-ui/core";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import {changeDialog} from "../../../redux/Dialog/dialogReducer";
import {connect} from "react-redux";
import {Draggable} from "react-beautiful-dnd";
import {deleteToDo, updateToDo} from "../../../redux/ToDo/toDoReducer";
import {getPositions, getPositionsObject, getToDos} from "../../../redux/ToDo/toDoSelectors";

const useStyles = makeStyles(theme => ({
    header: {
        marginLeft: '1rem',
        marginRight: 'auto',
    }
}));
const DIALOG_NAME = 'toDoDialogOpen';

const ToDoItem = props => {
    const classes = useStyles();
    const {toDos, toDo, index, updateToDo, deleteToDo, changeDialog} = props;
    const {positions, positionsObject} = props;

    const handleChange = () => {
        let _positions = positions.slice();
        let checkedIndex = _positions.indexOf(toDo.id);
        _positions.splice(checkedIndex, 1);
        if (!toDo.isChecked) {
            let firstCheckedIndex = Math.min(...toDos.filter(toDo => toDo.isChecked).map(toDo => _positions.indexOf(toDo.id)));
            if (firstCheckedIndex === 0) {
                if (_positions.length === 0) {
                    _positions.splice(0, 0, toDo.id);
                } else {
                    _positions.splice(_positions.length, 0, toDo.id);
                }
            } else {
                _positions.splice(firstCheckedIndex, 0, toDo.id);
            }
        } else {
            _positions.splice(0, 0, toDo.id);
        }
        updateToDo({
            ...toDo,
            isChecked: !toDo.isChecked,
        });
        updateToDo({
            ...positionsObject,
            positions: _positions.join(),
        });
    };

    const deleteBtnClick = (event) => {
        deleteToDo(toDo);
        if (positions.length > 1) {
            updateToDo({
                ...positionsObject,
                positions: positions.filter(position => position !== toDo.id).join(),
            });
        } else {
            deleteToDo(positionsObject);
        }
        event.stopPropagation();
    };

    const editBtnClick = (event) => {
        changeDialog({
            [DIALOG_NAME]: {
                open: true,
                type: 'edit',
                initData: toDo,
            }
        });
        event.stopPropagation();
    };

    return (

        <Draggable draggableId={toDo.id} index={index} isDragDisabled={toDo.isChecked}>
            {(provided) => (
                <Accordion
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <AccordionSummary
                        expandIcon={toDo.description && <ExpandMoreIcon/>}
                    >
                        <Box display='flex'
                             alignItems='center'
                             width={1}
                        >
                            <Checkbox
                                checked={toDo.isChecked}
                                onChange={handleChange}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                            />
                            <Typography
                                variant={'h6'}
                                className={classes.header}
                                style={toDo.isChecked ? {textDecoration: 'line-through'} : {}}
                            >{toDo.header}</Typography>
                            <IconButton onClick={deleteBtnClick}>
                                <DeleteOutlineIcon/>
                            </IconButton>
                            <IconButton
                                onClick={editBtnClick}
                                disabled={toDo.isChecked}
                            >
                                <EditIcon/>
                            </IconButton>
                        </Box>
                    </AccordionSummary>
                    {
                        toDo.description
                        &&
                        <AccordionDetails>
                            <Typography>{toDo.description}</Typography>
                        </AccordionDetails>
                    }
                </Accordion>
            )}
        </Draggable>
    );
};

let mapStateToProps = (state) => ({
    toDos: getToDos(state),
    positions: getPositions(state),
    positionsObject: getPositionsObject(state),
});

export default connect(mapStateToProps, {
    changeDialog,
    updateToDo,
    deleteToDo,
})(ToDoItem);