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

const initialState = {
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

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
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

    fetch("http://localhost:3000/imageDetect", {
                  method: 'post',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({'input': this.state.input})
              })
      .then(res => {console.log('before json',res); return res.json()})
      .then(res => {
        console.log(res)
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
                })
                .catch(console.log);
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
    if (route==='signin') {
      this.setState({isSignedIn: false});
      this.setState(initialState);
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
