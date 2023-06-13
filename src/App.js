import React from "react";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
//import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import './App.css';

const IMG_ID = 'imgId';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      output: {},
      bBoxes: [],
      confidences: [],
      box: {}
    }
  }

  calcBoundingBoxes = (data) => {
    const regions = data.outputs[0].data.regions;
    this.setState({bBoxes:      regions.map(region => region.region_info.bounding_box), 
                  confidences:  regions.map(region => region.value)});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onDetectSubmit = (event) => {
    this.setState({imageUrl: this.state.input});

    const PAT = '45148ef82a8848ce9f73d68c9f0c5639';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'jackzinn';       
    const APP_ID = 'facial-recognition';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });
    
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
   };

  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
      .then(response => response.text())
      .then(result => {
            const res = JSON.parse(result);
            if (res.status.code === 10000) {
              this.setState({output: res});
              this.calcBoundingBoxes(res);
            } else {
              console.error('Not OK!')
              console.error('description', res.status.description);
              console.error('Reason:', res.outputs[0].status.description);
              throw new Error(res.status.description);
            }
          })
      .catch(error => {
        console.error('Error:', error)
        this.setState({status:false});
        this.setState({output:{}});
      });
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} color="#ffffff"/>
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onDetectSubmit={this.onDetectSubmit} />
          <FaceRecognition 
                status={this.state.status} 
                imageUrl={this.state.imageUrl} 
                imgId = {IMG_ID}
                bBoxes={this.state.bBoxes} 
                confidences={this.state.confidences} 
          />
      </div>
    );
  }
}

export default App;
