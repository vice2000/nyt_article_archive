import React from 'react';
import PropTypes from 'prop-types';
import KeywordSelect from './KeywordSelect';
import Datepicker from './Datepicker';

class Header extends React.Component {

    render () {
        const { allKeywords, filterTeasers, getData, clearFilter } = this.props;
        return(
            <header className="header">
                <a className="header__logo-link" href="http://developer.nytimes.com/"><img className="header__logo-image" src="img/poweredby_nytimes_200a.png" alt="nytimes api logo"/></a>
                <Datepicker getData={getData} />
                <KeywordSelect keywords={allKeywords} filterTeasers={filterTeasers} clearFilter={clearFilter} />
                <button className="header__menu-toggle" aria-expanded="false"></button>
            </header>
        );
    }
}

Header.propTypes = {
    allKeywords: PropTypes.array,
    getData: PropTypes.func,
    filterTeasers: PropTypes.func,
    clearFilter: PropTypes.func
};

export default Header;