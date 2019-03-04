import React from 'react';
import PropTypes from 'prop-types';


export default function Keywords ({keywords}) {
    return (
        <section>
            <h3>Keywords</h3>
            <p>{keywords.join(', ')}</p>
        </section>
    );
}

Keywords.propTypes = {
    keywords: PropTypes.array
};
