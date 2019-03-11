
import App from './components/App.jsx';
import React from 'react';
import { render } from 'react-dom';
// import local assets
import './img/poweredby_nytimes_200a.png';
import './scss/bundle.scss';

render(
    <App />,
    document.querySelector('#Root')
);
