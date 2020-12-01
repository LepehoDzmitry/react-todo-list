import React from 'react';
import TextField from '@material-ui/core/TextField';

const renderTextField = ({
                             label,
                             input,
                             type,
                             meta: {touched, invalid, error},
                             ...custom
                         }) => (
    <TextField
        label={label}
        placeholder={label}
        type={type}
        fullWidth
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);
export default renderTextField;
