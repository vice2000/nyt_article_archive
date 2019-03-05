import React from 'react';
import Ajax from '../utils/Ajax';
import dedupeArray from '../utils/dedupeArray';
import Datepicker from './Datepicker';
import Teaser from './Teaser';
import localforage from 'localforage';
import KeywordSelect from './KeywordSelect';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            filterKeyword: '',
            filteredTeasers: false,
            receivedTeasers: false,
            renderedTeasers: false,
            allKeywords: false
        };
        this.receiveTeasers = this.receiveTeasers.bind(this);
        this.getData = this.getData.bind(this);
        this.getHTTP = this.getHTTP.bind(this);
        this.createIndexedDbStorage = this.createIndexedDbStorage.bind(this);
        this.getIndexedDB = this.getIndexedDB.bind(this);
        this.extractKeywords = this.extractKeywords.bind(this);
        this.filterTeasers = this.filterTeasers.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    getData (date) {
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

    async getHTTP (date) {
        const result = await Ajax.post('/', date);
        this.receiveTeasers(JSON.parse(result), date);
    }

    async getIndexedDB (key) {
        const result = await localforage.getItem(key);
        this.setState(
            {
                renderedTeasers: result.teasers,
                allKeywords: result.allKeywords,
                loading: false 
            }
        );
    }

    receiveTeasers(data, date) {
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

    async createIndexedDbStorage(storageData, date) {
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

    filterTeasers(keyword) {
        let matchingTeasers = [];
        this.setState({ filterKeyword: keyword });
        this.state.receivedTeasers.forEach(teaser => {
            if (teaser.keywordValues.includes(keyword)) {
                matchingTeasers.push(teaser);
            }
        });
        this.setState({ renderedTeasers: matchingTeasers });
    }

    clearFilter() {
        this.setState({ renderedTeasers: this.state.receivedTeasers, filterKeyword: false });
    }

    render () {
        return (
            <div>
                <Datepicker getData={this.getData} />
                { this.state.loading &&
                  ('Loading, please wait ...') ||
                  this.state.allKeywords &&
                  <div>
                      <KeywordSelect keywords={this.state.allKeywords} filterTeasers={this.filterTeasers}/>
                      <button onClick={this.clearFilter}>Clear Filter</button>
                  </div>
                }
                { this.state.loading && <div></div> || this.state.renderedTeasers &&
                  <div>
                      {this.state.renderedTeasers.map((teaser, count) => {
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
                      })
                      }</div>
                }
            </div>
        );

    }
}

export default App;
