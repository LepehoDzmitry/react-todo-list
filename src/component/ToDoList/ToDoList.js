import React from 'react';
import ToDoItem from "./ToDoItem/ToDoItem";
import {getPositions, getPositionsObject, getToDos} from "../../redux/ToDo/toDoSelectors";
import {connect} from "react-redux";
import Box from "@material-ui/core/Box";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {updateToDoDND} from "../../redux/ToDo/toDoReducer";

const ToDoList = props => {
    const {toDos, positions, positionsObject, updateToDoDND} = props;

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        let _positions = positions.slice();
        _positions.splice(source.index, 1);
        let firstCheckedIndex = Math.min(...toDos.filter(toDo => toDo.isChecked).map(toDo => _positions.indexOf(toDo.id)));
        _positions.splice(destination.index > firstCheckedIndex ? firstCheckedIndex : destination.index, 0, draggableId);

        updateToDoDND({
            ...positionsObject,
            positions: _positions.join(),
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'todo'}>
                {(provided) => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <ToDoItem
                                key={toDo.id}
                                toDo={toDo}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </DragDropContext>
    );
};

let mapStateToProps = (state) => ({
    toDos: getToDos(state),
    positions: getPositions(state),
    positionsObject: getPositionsObject(state),
});

export default connect(mapStateToProps, {
    updateToDoDND,
})(ToDoList);