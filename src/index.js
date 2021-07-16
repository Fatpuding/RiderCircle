import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

// ��ȡlocal�б���user, ���浽�ڴ���
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render( <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
/*(<BrowserRouter>
        {renderRoutes(routes)}
    </BrowserRouter>)*/
//ReactDOM.render(<Router />, document.getElementById('root'));
reportWebVitals();
