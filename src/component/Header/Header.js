import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {connect} from "react-redux";
import {changeDialog} from "../../redux/Dialog/dialogReducer";
import ToDoDialog from "../Dialog/ToDoDialog";

const DIALOG_NAME = 'toDoDialogOpen';

const Header = props => {
    const {changeDialog} = props;

    const handleClickOpen = () => {
        changeDialog({[DIALOG_NAME]: {
                open: true,
                type: 'add',
                initData: {}
            }
        });
    };

    return (
        <Box
            my={3}
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            <Typography
                variant='h4'
                component='h2'
                align='center'
                display='inline'
            >React ToDo list</Typography>
            <Box
                ml={4}
            >
                <Fab
                    size='small'
                    color='secondary'
                    aria-label='add'
                    display='inline'
                    onClick={handleClickOpen}
                >
                    <AddIcon/>
                </Fab>
            </Box>
            <ToDoDialog/>
        </Box>
    );
};
export default connect(null, {changeDialog})(Header);