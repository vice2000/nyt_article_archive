import React from 'react';
import PropTypes from 'prop-types';


export default function Keywords ({keywords}) {
    return (
        <div>{keywords.join(', ')}</div>
    );
}

Keywords.propTypes = {
    keywords: PropTypes.array
};
