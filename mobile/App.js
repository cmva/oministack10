import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

//não mostra o erro na tela, no qual comeca com a msg abaixo
YellowBox.ignoreWarnings([ 
  'Unrecognized WebSocket',
  'Warning'
])

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Routes />
    </>
  );
}



