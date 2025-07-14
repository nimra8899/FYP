import React from 'react';
import './LogoSearch.css';
import Logo from '../../Img/logo.png';
import SearchIcon from '@mui/icons-material/Search';

const LogoSearch = () => {
  return (
    <div className='LogoSearch'>
      <img src={Logo} alt="App Logo" className="logo-img" />
      <div className="Search">
        <input type="text" placeholder='Search...' />
        <div className="s-icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
