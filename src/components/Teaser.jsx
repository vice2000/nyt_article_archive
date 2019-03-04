import React from 'react';
import PropTypes from 'prop-types';

class Teaser extends React.Component {

    render () {
        const { headline, pub_date, snippet, keywords, link } = this.props;
        const date = new Date(pub_date);
        return(
            <article>
                <h2><a href={link}>{headline.main}</a></h2>
                <small>{date.getFullYear()}-{date.getMonth()+1}-{date.getDate()}</small>
                <p>{snippet}</p>
                <small>{keywords.join(' | ')}</small>
            </article>
        );
    }
}

Teaser.propTypes =  {
    headline: PropTypes.object,
    pub_date: PropTypes.string,
    snippet: PropTypes.string,
    keywords: PropTypes.array,
    link: PropTypes.string
};

export default Teaser;