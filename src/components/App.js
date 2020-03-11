import React from 'react';
import './app.css';
import { StateProvider } from '../store/store';
import AppBarComponent from './appBarComponent/appBar';

function App() {
  return (
    <div>
      <StateProvider>
        <AppBarComponent />
      </StateProvider>
    </div>
  );
} 

export default App;
