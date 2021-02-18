import React from 'react';
import { render } from 'react-dom';
import { StoreProvider } from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);

//start measuring performance in your app, pass a function with the (console.log)

reportWebVitals(console.log)
