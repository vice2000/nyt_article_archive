import React from 'react';
import PropTypes from 'prop-types';
import KeywordSelect from './KeywordSelect';
import Datepicker from './Datepicker';
import { Link } from 'react-router-dom';

class Header extends React.PureComponent {

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
                <a className="header__link-logo" href="http://developer.nytimes.com/">
                    <img
                        className="header__image-logo"
                        src="img/poweredby_nytimes_200a.png"
                        alt="nytimes api logo"
                    />
                </a>
                <div className="header__form-container">
                    <Datepicker expanded={expanded} getData={getData} />
                    <KeywordSelect
                        keywords={allKeywords}
                        filterTeasers={filterTeasers}
                        clearFilter={clearFilter}
                        expanded={expanded}
                        filterKeyword={filterKeyword}
                    />
                </div>
                <nav className="header__navigation">
                    <Link to={'./chart'} className="header__link-chart" title="Keyword Chart">
                        <div className="header__image-chart">
                            <span className="visuallyhidden">Keyword Chart</span>
                        </div>
                    </Link>
                    <button
                        className="header__menu-toggle"
                        aria-expanded={this.state.expanded}
                        onClick={this.toggleMenu}>
                        <span className="visuallyhidden">Toggle Menu</span>
                    </button>
                </nav>
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