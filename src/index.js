import React from 'react';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './Redux/store'
import "../node_modules/video-react/dist/video-react.css"; // import css
import {
    BrowserRouter as Router,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <Router>
    <App />
    </Router>,
    </Provider>,);
