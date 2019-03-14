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
        if (this.state.date) {
            this.props.getData( this.state.date );
        }
    }

    render () {
        const expandedClass = this.props.expanded ? '' : 'header__datepicker--hidden';
        return (
            <form
                action="/"
                className={'header__datepicker ' + expandedClass}
                method="POST"
                onSubmit={this.handleSubmit}
            >
                <DateSelector
                    date={this.setRequestDate}
                />
                <button
                    type="submit"
                    className="header__button"
                >Search!</button>
            </form>
        );
    }
}

Datepicker.propTypes = {
    getData: PropTypes.func,
    expanded: PropTypes.bool
};

export default Datepicker;
