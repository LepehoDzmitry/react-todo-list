import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import renderTextField from "../FormComponent/renderTextField";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%'
    },
    paperRoot: {
        width: '18rem',
        padding: '1rem'
    },
    marginBottom: {
        marginBottom: '1rem'
    }
}));

const validate = values => {
    const errors = {};
    const requiredFields = [
        'header',
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    return errors
};

const ToDoForm = props => {
    const classes = useStyles();
    const {type, handleSubmit, valid, error, pristine, submitting} = props;

    return (
        <form onSubmit={handleSubmit}>
            {error && <Typography color={'error'} className={classes.marginBottom}>{error}</Typography>}
            <Field
                name='header'
                component={renderTextField}
                label='Header'
                className={classes.marginBottom}
            />
            <Field
                name='description'
                component={renderTextField}
                label='Description'
                multiline
                className={classes.marginBottom}
            />
            <Button
                color='primary'
                type='submit'
                fullWidth
                disabled={pristine || submitting || !valid}
            >
                {type === 'add' ? 'Add' : 'Edit'}
            </Button>
        </form>
    )
};
export default reduxForm({
    form: 'toDoForm',
    validate
})(ToDoForm)