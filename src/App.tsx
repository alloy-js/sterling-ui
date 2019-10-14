import React from 'react';
import NavBar from './components/bars/nav-bar';
import GraphView from './components/views/graph-view';

const App: React.FC = () => {
  return (
    <div className='bp3-dark'>
      <NavBar/>
      <GraphView/>
    </div>
  );
};

export default App;
