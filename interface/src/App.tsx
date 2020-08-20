import React from 'react';
import logo from 'assets/svg/logo.svg';

import { Clicker } from 'components/Clicker';

import { withAppData } from 'hocs/withAppData';

function App() {
  return (
    <div className="App">
      <h1>Counter</h1>
      <Clicker />
    </div>
  );
}

export default withAppData(App);
