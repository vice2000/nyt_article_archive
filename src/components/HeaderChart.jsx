import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <a className="header__link-logo" href="http://developer.nytimes.com/">
                <img
                    className="header__image-logo"
                    src="img/poweredby_nytimes_200a.png"
                    alt="nytimes api logo"
                />
            </a>
            <nav className="header__navigation">
                <Link to={'./'} className="header__link-home" title="Home">
                    <div className="header__image-home">
                        <span className="visuallyhidden">Home</span>
                    </div>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
