import React, {useEffect} from 'react';
import Container from "@material-ui/core/Container";
import ToDoList from "../ToDoList/ToDoList";
import Header from "../Header/Header";
import {getAllToDo} from "../../redux/ToDo/toDoReducer";
import {connect} from "react-redux";
import {getToDos} from "../../redux/ToDo/toDoSelectors";
import {db} from '../../api/api'

const MainContent = props => {
    const {toDos, getAllToDo} = props;

    useEffect(() => {
        getAllToDo();
        db.changes({
            since: 'now',
            live: true
        }).on('change', getAllToDo);
    }, []);

    return (
        <Container>
            <Header/>
            {
                !!toDos && <ToDoList/>
            }
        </Container>
    );
};
let mapStateToProps = (state) => ({
    toDos: getToDos(state),
});
export default connect(mapStateToProps, {getAllToDo})(MainContent);