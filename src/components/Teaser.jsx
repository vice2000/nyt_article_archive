import React from 'react';
import PropTypes from 'prop-types';

class Teaser extends React.PureComponent {

    componentDidMount() {
        const { urlHash, id } = this.props;
        // reassign urlHash if actual Teaser matching
        // browser history is rendered
        if ( urlHash === `#${id}`) {
            location.hash = urlHash;
        }
    }

    setClickedRef = node => this.clickedRef = node

    renderKeywords = (keyword, index) => {
        return (
            <button
                key={`${keyword}_${index}`}
                className="teaser__button teaser__link"
                onClick={this.handleKeywordClick}
            >
                {keyword}
            </button>
        );
    }

    handleLinkClick = (e) => {
        const id = e.target.dataset.id;
        const searchDate = e.target.dataset.searchdate;
        history.replaceState(null, null, `${location.origin}?${searchDate}#${id}`);
    }

    handleKeywordClick = (e) => {
        const { filterTeasers } = this.props;
        filterTeasers(e.target.textContent, this.clickedRef);
    }

    render() {
        const { id, headline, pub_date, snippet, keywords, link } = this.props;
        // replace "-" in date string so Safari mobile can parse it
        const date = new Date(pub_date.match(/\d{4}-\d{2}-\d{2}/g).join().replace(/-/g, '/'));
        const searchDate = `${date.getFullYear()}_${date.getMonth() + 1}`;

        return(
            <article
                id={id}
                className="teaser"
                ref={this.setClickedRef}
            >
                <h2
                    className="teaser__headline">
                    <a
                        href={link}
                        onClick={this.handleLinkClick}
                        data-searchdate={searchDate}
                        data-id={id}
                        className="teaser__link"
                    >
                        {headline.main}
                    </a>
                </h2>
                <small className="teaser__date">{date.getFullYear()}-{date.getMonth()+1}-{date.getDate()}</small>
                <p className="teaser__snippet">{snippet}</p>
                {keywords.map(this.renderKeywords)}
            </article>
        );
    }
}

Teaser.propTypes =  {
    headline: PropTypes.object,
    id: PropTypes.string,
    pub_date: PropTypes.string,
    snippet: PropTypes.string,
    keywords: PropTypes.array,
    link: PropTypes.string,
    filterTeasers: PropTypes.func,
    urlHash: PropTypes.string
};

export default Teaser;
