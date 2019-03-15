import React from 'react';
import PropTypes from 'prop-types';


class KeywordSelect extends React.Component {

    state = {
        initialValue: 'Select Keyword',
        value: ''
    }

    onChange = (e) => {
        // replace count passed as string literal
        // in the actual keyword
        const value = e.target.value.replace(/(\s\(\d+\))$/,'');
        this.props.filterTeasers(value);
        this.setState({ value });
    }

    handleSubmit = (e) => {
        const { clearFilter } = this.props;
        e.preventDefault();
        this.setState({ value: '' });
        clearFilter();
    }

    render() {
        const { keywords } = this.props;
        const inactiveClass = this.state.value ? '' : 'header__input--inactive';
        const expandedClass = this.props.expanded ? '' : 'header__keywordfilter--hidden';
        return (
            <form 
                className={'header__keywordfilter ' + expandedClass} 
                onSubmit={this.handleSubmit}
            >
                <fieldset className="header__fieldset">
                    <label className="header__label" htmlFor="keywordselect">Filter by single Keyword</label>
                    <select
                        id="keywordselect"
                        className={'header__input header__input--stretched ' + inactiveClass}
                        onChange={this.onChange}
                        value={this.state.value || this.state.initialValue}
                    >
                        <option
                            disabled
                            value="Select Keyword"
                        >
                        Select Keyword
                        </option>
                        {keywords.map(keyword => <option key={keyword} name={keyword} value={keyword}>{keyword}</option>)} 
                    </select>
                </fieldset>
                <button className="header__button" type="submit">Clear Filter</button>
            </form>
        );
    }
}

KeywordSelect.propTypes = {
    keywords: PropTypes.array,
    filterTeasers: PropTypes.func,
    clearFilter: PropTypes.func,
    expanded: PropTypes.bool
};

export default KeywordSelect;
