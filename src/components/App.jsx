import React from 'react';
import Ajax from '../utils/Ajax';
import Datepicker from './Datepicker.jsx';
import Teaser from './Teaser.jsx';
import localforage from 'localforage';
import Keywords from './Keywords';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: false };
        this.receiveTeasers = this.receiveTeasers.bind(this);
        this.renderTeasers = this.renderTeasers.bind(this);
        this.getData = this.getData.bind(this);
        this.getHTTP = this.getHTTP.bind(this);
        this.createIndexedDbStorage = this.createIndexedDbStorage.bind(this);
        this.getIndexedDB = this.getIndexedDB.bind(this);
        this.extractKeywords = this.extractKeywords.bind(this);
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
        this.setState({ teasers: result, loading: false });
    }

    receiveTeasers(data, date) {
        const items = data.response.docs;
        let storageObject = [];

        items.map(item => {
            const { _id, headline, web_url, snippet, pub_date, keywords } = item;
            let keywordValues = [];
            for(let kw of keywords) { keywordValues.push(kw.value); }
            storageObject.push(
            { _id, headline, web_url, snippet, pub_date, keywordValues }
        );
            this.createIndexedDbStorage(storageObject, date);
        });
    }

    async createIndexedDbStorage(storageData, date) {
        const indexedDB_key = `${date.year}_${date.month}`;
        await localforage.setItem(indexedDB_key, storageData);
        this.setState({ teasers: storageData, loading: false });
        this.extractKeywords();
    }

    extractKeywords () {
        if (this.state.teasers) {
            let allKeywords = [];
            this.state.teasers.map(teaser => {
                for (let value of teaser.keywordValues) { 
                    allKeywords.push(value);
                }
            });
            this.setState({ allKeywords });
        }
    }
    
    render () {
        return (
            <div>
                <Datepicker getData={this.getData} />
                {this.state.allKeywords &&
                    <Keywords keywords={this.state.allKeywords}></Keywords>
                }
                <div>{ this.state.loading && ('Loading, please wait ...') || this.renderTeasers() }</div>
            </div>
        );

    }

    renderTeasers() {
        if (this.state.teasers) {
            return this.state.teasers.map((teaser, count) => {
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
            });
        }
    }
}

export default App;
