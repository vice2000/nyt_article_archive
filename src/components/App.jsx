import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ArticleArchive from './ArticleArchive';


class App extends React.Component {
    render () {
        return (
            <Router>
                <Route path="/" exact component={ArticleArchive} />
            </Router>
        );
    }
}

export default App;
