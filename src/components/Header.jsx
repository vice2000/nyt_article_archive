import React from 'react';
import PropTypes from 'prop-types';
import KeywordSelect from './KeywordSelect';
import Datepicker from './Datepicker';

class Header extends React.Component {

    state = {
        expanded: false
    }

    toggleMenu = () => {
        const { expanded } = this.state;
        this.setState({ expanded: !expanded });
    }

    render () {
        const { expanded } = this.state;
        const { allKeywords, filterTeasers, getData, clearFilter, filterKeyword } = this.props;
        return(
            <header className="header"
                data-expanded={expanded}
            >
                <a className="header__logo-link" href="http://developer.nytimes.com/">
                    <img 
                        className="header__logo-image"
                        src="img/poweredby_nytimes_200a.png"
                        alt="nytimes api logo"
                    />
                </a>
                {}
                <Datepicker expanded={expanded} getData={getData} />
                <KeywordSelect 
                    keywords={allKeywords}
                    filterTeasers={filterTeasers}
                    clearFilter={clearFilter}
                    expanded={expanded}
                    filterKeyword={filterKeyword}
                />
                <button
                    className="header__menu-toggle"
                    aria-expanded={this.state.expanded}
                    onClick={this.toggleMenu}>
                    <span className="visuallyhidden">Toggle Menu</span>
                </button>
            </header>
        );
    }
}

Header.propTypes = {
    allKeywords: PropTypes.array,
    getData: PropTypes.func,
    filterTeasers: PropTypes.func,
    clearFilter: PropTypes.func,
    filterKeyword: PropTypes.string
};

export default Header;