import React from 'react';
import PropTypes from 'prop-types';
import DateSelector from './DateSelector';

class Datepicker extends React.Component {

    state = {};

    setRequestDate = (date) => {
        this.setState( { date } );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.getData( this.state.date );
    }

    render () {
        return (
            <form
                action="/"
                className="header__datepicker"
                method="POST"
                onSubmit={this.handleSubmit}
            >
                <DateSelector
                    date={this.setRequestDate}
                />
                <button
                    type="submit"
                >Search!</button>
            </form>
        );
    }
}

Datepicker.propTypes = {
    getData: PropTypes.func
};

export default Datepicker;
