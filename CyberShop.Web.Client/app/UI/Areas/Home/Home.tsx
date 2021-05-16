import * as React from 'react'
import ReactDOM from 'react-dom';
import App from './HomePage';
import {render} from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>,
  document.getElementById('approot')
);