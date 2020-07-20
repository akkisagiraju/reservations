import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'Beta',
        endpoint: 'https://4uyxc9c8uh.execute-api.ap-south-1.amazonaws.com/beta'
      }
    ]
  }
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
