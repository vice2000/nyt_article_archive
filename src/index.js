import App from './components/App.jsx';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// import local assets
import './img/poweredby_nytimes_200a.png';
import './img/icon_menu.svg';
import './img/icon_close.svg';
import './img/bar_chart-24px.svg';
import './img/home-24px.svg';
import './scss/bundle.scss';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector('#Root')
);
