import React from 'react';
import Ajax from '../utils/Ajax';
import dedupeArray from '../utils/dedupeArray';
import Datepicker from './Datepicker';
import Teaser from './Teaser';
import localforage from 'localforage';
import KeywordSelect from './KeywordSelect';

class App extends React.Component {

    state = {
        loading: false,
        filterKeyword: '',
        filteredTeasers: [],
        receivedTeasers: [],
        renderedTeasers: [],
        allKeywords: []
    };

    renderTeasers(teaser, count) {
        const { _id, headline, pub_date, snippet, keywordValues, web_url } = teaser;
        return (
            <Teaser
                key={`${_id}_${count}`}
                headline={headline}
                pub_date={pub_date}
                snippet={snippet}
                keywords={keywordValues}
                link={web_url}
            />
        );
    }

    getData = (date) => {
        const indexedDB_key = `${date.year}_${date.month}`;
        this.setState({ loading: true });
        localforage.keys().then(
            keys => {
                if (keys.indexOf(indexedDB_key) > -1) {
                    this.getIndexedDB(indexedDB_key);
                } else {
                    this.getHTTP(date);
                }
            }
        );
    }

    getHTTP = async (date) => {
        const result = await Ajax.post('/', date);
        this.receiveTeasers(JSON.parse(result), date);
    }

    getIndexedDB = async (key) => {
        const result = await localforage.getItem(key);
        this.setState(
            {   
                receivedTeasers: result.teasers,
                renderedTeasers: result.teasers,
                allKeywords: result.allKeywords,
                loading: false 
            }
        );
    }

    receiveTeasers = (data, date) => {
        const items = data.response.docs;
        let teasers = [];

        items.map(item => {
            const { _id, headline, web_url, snippet, pub_date, keywords } = item;
            let keywordValues = [];
            for(let kw of keywords) { keywordValues.push(kw.value); }
            teasers.push(
                { _id, headline, web_url, snippet, pub_date, keywordValues }
            );
        });
        this.createIndexedDbStorage({ teasers, allKeywords: this.extractKeywords(teasers) }, date);
    }

    createIndexedDbStorage = async (storageData, date) => {
        const { teasers, allKeywords } = storageData;
        const indexedDB_key = `${date.year}_${date.month}`;
        await localforage.setItem(indexedDB_key, storageData);
        this.setState({ receivedTeasers: teasers, renderedTeasers: teasers, allKeywords, loading: false });
    }

    extractKeywords (teasers) {
        let allKeywords = [];
        teasers.map(teaser => {
            for (let value of teaser.keywordValues) { 
                allKeywords.push(value);
            }
        });
        return dedupeArray(allKeywords);
    }

    filterTeasers = (keyword) => {
        let matchingTeasers = [];
        this.setState({ filterKeyword: keyword });
        this.state.receivedTeasers.forEach(teaser => {
            if (teaser.keywordValues.includes(keyword)) {
                matchingTeasers.push(teaser);
            }
        });
        this.setState({ renderedTeasers: matchingTeasers });
    }

    clearFilter = () => {
        this.setState({ renderedTeasers: this.state.receivedTeasers, filterKeyword: false });
    }

    render () {
        const { loading, renderedTeasers, allKeywords } = this.state;
        return (
            <div>
                <header className="header">
                    <a className="header__logo-link" href="http://developer.nytimes.com/"><img className="header__logo-image"src="img/poweredby_nytimes_200a.png" /></a>
                    <Datepicker getData={this.getData} />
                    <KeywordSelect keywords={allKeywords} filterTeasers={this.filterTeasers} clearFilter={this.clearFilter} />
                </header>
                <main className="main">
                    { loading && ('Loading, please wait ...') || renderedTeasers.length === 0 && <h1 className="main__heading">Browse New York Times&#39; Article Teasers back to 1851</h1> || renderedTeasers.length > 0 && renderedTeasers.map(this.renderTeasers) }
                </main>
            </div>
        );
    }
}

export default App;
