import React from 'react';
import ContentAB from './component/content';

import HeaderAB from './component/header';
import ToolBar from './component/toolbar';

import "./sass/main.scss";

function App() {
  return (
    <div className="App">
      <HeaderAB />
      <ToolBar />
      <ContentAB />
    </div>
  );
}

export default App;

