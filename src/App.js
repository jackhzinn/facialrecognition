import React from "react";
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import ParticlesBg from 'particles-bg';
import './App.css';

const IMG_ID = 'imgId';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      status: false,
      output: {},
      bBoxes: [],
      confidences: [],
      box: {},
      hw: {}, 
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  calcBoundingBoxes = (data) => {
    const imgFaces = document.getElementById(IMG_ID);
    const width = imgFaces.width;
    const height= imgFaces.height;

    const regions = data.outputs[0].data.regions;
    this.setState({bBoxes:      regions.map(region => region.region_info.bounding_box), 
                  confidences:  regions.map(region => region.value),
                  hw: {height, width}});
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
              this.setState({status: true});
              this.setState({output: res});
              fetch('http://localhost:3000/image', {
                  method: 'put',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({id: this.state.user.id})
              }) // update entries info
                .then(res => res.json())
                .then(count => {
                  this.setState(Object.assign(this.state.user, {entries: count.entries}));
                });
              this.calcBoundingBoxes(res);
            } else {
              console.error('Not OK!')
              console.error('code', res.status.code);
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

  onRouteChange = (route) => {
    if (route==='signout') {
      this.setState({isSignedIn: false});
    } else if (route==='home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { imageUrl, bBoxes, hw, confidences, route } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} color="#ffffff"/>
          { route==='home'  
            ? <div>
                  <Navigation onRouteChange={this.onRouteChange} />
                  <Logo />
                  <Rank 
                    userName={this.state.user.name} 
                    entries= {this.state.user.entries} 
                  />
                  <ImageLinkForm onInputChange={this.onInputChange} onDetectSubmit={this.onDetectSubmit} />
                  <FaceRecognition 
                    status={this.state.status} 
                    imageUrl={imageUrl} 
                    imgId = {IMG_ID}
                    bBoxes={bBoxes} 
                    confidences={confidences} 
                    hw = {hw}
                  />
               </div>
            : (route === 'signin'
                ?
                  <div>
                    <Logo />
                    <SignIn 
                      onRouteChange={this.onRouteChange} 
                      loadUser={this.loadUser} 
                    />
                  </div>
                :
                  <div>
                    <Logo />
                    <Register 
                      onRouteChange={this.onRouteChange} 
                      loadUser={this.loadUser} 
                    />
                  </div>
            )
          }
      </div>
    );
  }
}

export default App;
