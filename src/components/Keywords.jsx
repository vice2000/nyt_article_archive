import React from 'react';
import PropTypes from 'prop-types';


export default function Keywords ({keywords}) {
    return (
        <select>
            <option disabled>Keywords for Selected Month</option>
            {keywords.map(keyword => <option key={keyword} name={keyword}>{keyword}</option>)} 
        </select>
    );
}

Keywords.propTypes = {
    keywords: PropTypes.array
};
