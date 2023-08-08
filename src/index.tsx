import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomThemeProvider } from "./theme";
import { App } from './routes/app'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <App/>
    </CustomThemeProvider>
  </React.StrictMode>
);
