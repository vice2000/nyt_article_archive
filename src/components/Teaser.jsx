import React from 'react';
import PropTypes from 'prop-types';

class Teaser extends React.Component {

    render() {
        const { headline, pub_date, snippet, keywords, link } = this.props;
        // replace "-" in date string so Safari mobile can parse it
        const date = new Date(pub_date.match(/\d{4}-\d{2}-\d{2}/g).join().replace(/-/g, '/'));
        return(
            <article className="teaser">
                <h2 className="teaser__headline"><a href={link}>{headline.main}</a></h2>
                <small className="teaser__date">{date.getFullYear()}-{date.getMonth()+1}-{date.getDate()}</small>
                <p className="teaser__snippet">{snippet}</p>
                <small className="teaser__keywords">{keywords.join(' | ')}</small>
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
