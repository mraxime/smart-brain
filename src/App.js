import React, { useReducer, useState } from 'react';
import Particles from 'react-particles-js';
import 'tachyons';
import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import {
  initialAppState,
  initialUserState,
  particlesOptions,
} from './constants';
import { calculateFaceLocation } from './utils';

const reducer = (appState, action) => {
  switch (action.type) {
    case 'resetAppState':
      return initialAppState;
    case 'resetUserState':
      return initialUserState;
    default:
      const result = { ...appState };
      result[action.type] = action.value;

      return result;
  }
};

const App = () => {
  const [appState, dispatch] = useReducer(reducer, initialAppState);
  const { imgLinkInput, imageUrl, box, route, isSignedIn } = appState;
  const [user, setUser] = useState(initialUserState);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: name, value });
  };

  // Get the object from calculateFaceLocation and set it to box state
  const displayFacebox = (boxValues, dispatch) => {
    dispatch({ type: 'box', value: boxValues });
  };

  const onPictureSubmit = () => {
    dispatch({ type: 'imageUrl', value: imgLinkInput });
    fetch('https://powerful-oasis-38299.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: imgLinkInput,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch('https://powerful-oasis-38299.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser((prevUser) => {
                return {
                  ...prevUser,
                  entries: count,
                };
              });
            })
            .catch(console.log);
        }
        displayFacebox(calculateFaceLocation(response), dispatch);
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    if (route === 'signout') {
      // Clear state
      dispatch({ type: 'resetUserState' });
      dispatch({ type: 'resetAppState' });
    } else if (route === 'home') {
      dispatch({ type: 'isSignedIn', value: true });
    }
    dispatch({ type: 'route', value: route });
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home' ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />{' '}
        </div>
      ) : route === 'signin' ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
};

export default App;
