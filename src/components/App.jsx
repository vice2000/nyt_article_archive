import React from 'react';
import Ajax from '../utils/Ajax';
import Datepicker from './Datepicker.jsx';
import Teaser from './Teaser.jsx';



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.receiveTeasers = this.receiveTeasers.bind(this);
        this.renderTeasers = this.renderTeasers.bind(this);
        this.getData = this.getData.bind(this);
    }

    async getData (date) {
        const result = await Ajax.post('/', date);
        this.receiveTeasers( result );
    }

    render () {
        return (
            <div>
                <Datepicker getData={this.getData} />
                <div>{this.renderTeasers()}</div>
            </div>
        );

    }

    receiveTeasers( result ) {
        let parsedResult = JSON.parse( result );
        let teasers = parsedResult.response.docs;
        this.setState({ teasers });
    }

    foo() {
        //eslint-disable-next-line
        console.log('foo');
    }

    renderTeasers() {
        if (this.state.teasers) {
            return this.state.teasers.map(teaser => (
                <Teaser
                    key={teaser._id}
                    headline={teaser.headline}
                    pub_date={teaser.pub_date}
                    snippet={teaser.snippet}
                    keywords={teaser.keywords}
                    link={teaser.web_url}
                />
            ));
        }
    }

}

export default App;
