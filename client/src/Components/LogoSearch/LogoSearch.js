import React from 'react';
import './LogoSearch.css';
import Logo from '../../Img/logo.png';

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="App Logo" className="logo-img-full" />
    </div>
  );
};

export default LogoSearch;
