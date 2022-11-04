import React from 'react';

//css
import './App.css';

//Rotas
import Routes from './Routes';

//Components
import { Template } from './components/MainComponents';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';


function App() {

  return (


    <Template>
      <Header />
      <Routes />
      <Footer />
    </Template>


  );
};

export default App;
