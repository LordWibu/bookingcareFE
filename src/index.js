import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";


import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const renderApp = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={reduxStore}>
                <IntlProviderWrapper>
                    <App persistor={persistor} />
                </IntlProviderWrapper>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
