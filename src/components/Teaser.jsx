import React from 'react';
import PropTypes from 'prop-types';

class Teaser extends React.Component {

    render() {
        const { headline, pub_date, snippet, keywords, link } = this.props;
        // replace "-" in date string so Safari mobile can parse it
        const date = new Date(pub_date.match(/\d{4}-\d{2}-\d{2}/g).join().replace(/-/g, '/'));
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
