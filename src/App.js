import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import React from "react";
import MainContent from "./component/MainContent/MainContent";
import {Provider} from "react-redux";
import store from "./redux/store";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#303030'
        },
        secondary: {
            main: '#ff3d00'
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <MainContent/>
            </Provider>
        </ThemeProvider>
    );
}
export default App;
