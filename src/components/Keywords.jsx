import React from 'react';
import PropTypes from 'prop-types';


export default function Keywords ({keywords}) {
    return (
        <article>
            <h3>Keywords</h3>
            {keywords.join(', ')}
        </article>
    );
}

Keywords.propTypes = {
    keywords: PropTypes.array
};
