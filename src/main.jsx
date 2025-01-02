import React from 'react';
import { createRoot } from 'react-dom/client';
import styles from './components/Main/Main.module.scss'; 
import RouterPage from './RouterPage.jsx';

createRoot(document.getElementById('root')).render(
  <div className={styles.root}>
    <React.StrictMode>
      <RouterPage />
    </React.StrictMode>
  </div>
);