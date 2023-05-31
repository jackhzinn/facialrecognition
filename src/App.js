import React from "react";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';
import ParticlesBg from 'particles-bg';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} color="#ffffff"/>
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm />
          {/*}
          <FaceRecognition />
          */}

      </div>
    );
  }
}

export default App;
