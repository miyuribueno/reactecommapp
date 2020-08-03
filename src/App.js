import React from 'react';
import './App.css';
import MyProvider from './MyProvider';
import Basic from './components/Forms/Basic';


class App extends React.Component {
  render() {
    return (
      <div className="App">
          <MyProvider />
          {/* <Basic /> */}
      </div>
    );
  }
}

export default App;
