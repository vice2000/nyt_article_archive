import React from 'react';
import Ajax from '../utils/Ajax';
import sortKeywords from '../utils/sortKeywords';
import Teaser from './Teaser';
import localforage from 'localforage';
import Header from './Header';


class App extends React.Component {

    state = {
        loading: false,
        filterKeyword: '',
        filteredTeasers: [],
        receivedTeasers: [],
        renderedTeasers: [],
        allKeywords: []
    };

    componentDidMount() {
        this.evaluateUrlParam();

    }

    evaluateUrlParam = () => {
        // infer date for request body from url param
        let apiDate = {};
        let indexedDbKey = '';
        // check if param is a valid idb key at all
        if(window.location.search.match(/\?\d{4}_\d{1}/g)) {
            indexedDbKey = window.location.search.replace(/\?/g, '');
            apiDate.year = indexedDbKey.split('_')[0];
            apiDate.month = indexedDbKey.split('_')[1];
            this.checkIndexedDbKey(indexedDbKey, apiDate);
        }
    }

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
        const indexedDb_key = `${date.year}_${date.month}`;
        this.setState({ loading: true });
        localforage.keys().then(
            keys => {
                if (keys.indexOf(indexedDb_key) > -1) {
                    this.checkIndexedDbKey(indexedDb_key, date);
                } else {
                    this.getHTTP(date);
                }
            }
        );
    }

    getHTTP = async (date) => {
        try {
            const result = await Ajax.post('/', date);
            this.receiveTeasers(JSON.parse(result), date);
        } catch (error) {
            console.error(error);
        }
    }

    checkIndexedDbKey = async (indexedDbKey, date) => {
        let now = new Date().getTime();
        try {
            const result = await localforage.getItem(indexedDbKey);
            // check if IDB entry is older than one hour
            if (now - result.createdAt <= 3600000) {
                // if not, use entries to render teasers
                this.setState(
                    {
                        receivedTeasers: result.teasers,
                        renderedTeasers: result.teasers,
                        allKeywords: result.allKeywords,
                        loading: false 
                    }
                );
            } else {
                // if so, throw it away and get fresh data via api request
                await localforage.removeItem(indexedDbKey);
                this.getHTTP(date);
            }
        } catch (error) {
            console.error(error);
        }

    }

    receiveTeasers = (data, date) => {
        const items = data.response.docs;
        const createdAt = new Date().getTime();
        let teasers = [];

        items.map(item => {
            const { _id, headline, web_url, snippet, pub_date, keywords } = item;
            let keywordValues = [];
            for(let kw of keywords) { keywordValues.push(kw.value); }
            teasers.push(
                { _id, headline, web_url, snippet, pub_date, keywordValues }
            );
        });
        this.createIndexedDbStorage({ createdAt, teasers, allKeywords: this.extractKeywords(teasers) }, date);
    }

    createIndexedDbStorage = async (storageData, date) => {
        const { teasers, allKeywords } = storageData;
        const indexedDB_key = `${date.year}_${date.month}`;
        try {
            await localforage.setItem(indexedDB_key, storageData);
            this.setState({ receivedTeasers: teasers, renderedTeasers: teasers, allKeywords, loading: false });
        } catch (error) {
            console.error(error);
        }
    }

    extractKeywords (teasers) {
        let allKeywords = [];
        teasers.map(teaser => {
            for (let value of teaser.keywordValues) { 
                allKeywords.push(value);
            }
        });
        return sortKeywords(allKeywords);
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
                <Header
                    allKeywords={allKeywords}
                    getData={this.getData}
                    filterTeasers={this.filterTeasers}
                    clearFilter={this.clearFilter}
                />
                <main className="main">
                    {loading && ('Loading, please wait ...') || renderedTeasers.length === 0 && <h1 className="main__heading">Browse New York Times&#39; Article Teasers back to 1851</h1> || renderedTeasers.length > 0 && renderedTeasers.map(this.renderTeasers)}
                </main>
            </div>
        );
    }
}

export default App;
