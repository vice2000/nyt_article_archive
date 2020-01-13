import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ArticleArchive from './ArticleArchive';
import KeywordChart from './KeywordChart';


class App extends React.PureComponent {
    render () {
        return (
            <Switch>
                <Switch>
                    <Route exact path="/" component={ArticleArchive} />
                    <Route path="/chart" component={KeywordChart} />
                </Switch>
            </Switch>
        );
    }
}

export default App;
