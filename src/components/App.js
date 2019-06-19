import React from 'react';
import Header from "./Header";
import TubeStatusList from './TubeStatusList';

const App = () => {
    return (
      <div>
          <Header/>
          <div className="ui container">
            <TubeStatusList />
          </div>
      </div>
    );
};

export default App;