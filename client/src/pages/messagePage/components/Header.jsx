import React from 'react';
import './Header.scss';
import SKILZYY from '/homeComponent/SKILZYY.png'
import SKILZYYNAME from '/homeComponent/SKILZYYNAME.png'

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">
        <img src={SKILZYYNAME} alt="" />
      </h1>
    </header>
  );
}

export default Header;