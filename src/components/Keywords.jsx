import React from 'react';
import PropTypes from 'prop-types';


class Keywords extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.propagateFilterValue(e.target.value);
    }

    render() {
        const {keywords} = this.props;
        return (
            <select onChange={this.onChange}>
                <option disabled>Keywords for Selected Month</option>
                {keywords.map(keyword => <option key={keyword} name={keyword}>{keyword}</option>)} 
            </select>
        );
    }
}

Keywords.propTypes = {
    keywords: PropTypes.array,
    propagateFilterValue: PropTypes.func
};

export default Keywords;
