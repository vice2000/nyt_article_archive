import React from 'react';
import PropTypes from 'prop-types';
import DateSelector from './DateSelector';

class Datepicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.setRequestDate = this.setRequestDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setRequestDate(date) {
        this.setState( { date } );
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.getData( this.state.date );
    }

    render () {

        return (
            <form
                action="/"
                className="datepicker"
                method="POST"
                onSubmit={this.handleSubmit}
            >
                <DateSelector
                    date={this.setRequestDate}
                />
                <input
                    type="submit"
                    value="GO!"
                />
            </form>
        );

    }

}

Datepicker.propTypes = {
    getData: PropTypes.func
};

export default Datepicker;