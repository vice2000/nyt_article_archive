import React from 'react';
import PropTypes from 'prop-types';

class KeywordSelect extends React.PureComponent {

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
        const { expanded, keywords, filterKeyword } = this.props;
        const { value, initialValue } = this.state;
        const modifierClass = value || filterKeyword ? '' : 'header__input--inactive';
        const expandedClass = expanded ? '' : 'header__keywordfilter--hidden';
        return (
            <form
                className={'header__keywordfilter ' + expandedClass}
                onSubmit={this.handleSubmit}
            >
                <fieldset className="header__fieldset">
                    <label className="header__label" htmlFor="keywordselect">Filter by single Keyword</label>
                    <select
                        id="keywordselect"
                        className={'header__input header__input--stretched ' + modifierClass}
                        onChange={this.onChange}
                        value={filterKeyword || value || initialValue}
                    >
                        <option
                            disabled
                            value={filterKeyword || initialValue}
                        >
                            {filterKeyword || initialValue}
                        </option>
                        {
                            keywords.map(keyword => {
                                const { kw, count } = keyword;
                                return (
                                    <option key={kw} name={kw} value={kw}>
                                        {`${kw} (${count})`}
                                    </option>
                                );
                            })
                        }
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
    expanded: PropTypes.bool,
    filterKeyword: PropTypes.string
};

export default KeywordSelect;
