import React from 'react';
import PropTypes from 'prop-types';


class KeywordSelect extends React.Component {

    onChange = (e) => {
        this.props.filterTeasers(e.target.value);
    }

    render() {
        const {keywords, clearFilter} = this.props;
        return (
            <div className="header__keywordfilter">
                <select onChange={this.onChange}>
                    <option disabled>Keywords for Selected Month</option>
                    {keywords.map(keyword => <option key={keyword} name={keyword}>{keyword}</option>)} 
                </select>
                <button onClick={clearFilter}>Clear Filter</button>
            </div>
        );
    }
}

KeywordSelect.propTypes = {
    keywords: PropTypes.array,
    filterTeasers: PropTypes.func,
    clearFilter: PropTypes.func
};

export default KeywordSelect;
