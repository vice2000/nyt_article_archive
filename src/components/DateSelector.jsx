import React from 'react';
import PropTypes from 'prop-types';


class DateSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    set_max_date(){
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth()+1;
        let mth_leading_zero = month < 10 ? `0${month}` : `${month}`;
        return (`${year}-${mth_leading_zero}`);
    }

    handleChange(e) {

        let date = {};
        let raw_date = e.currentTarget.value;
        let date_str = raw_date.split('-');

        date.year = date_str[0];
        date.month = parseInt(date_str[1], 10); // strip leading zero
        
        this.props.date(date);

    }

    render() {
        return (
            <input
            className="datepicker__month"
            min="1851-09"
            max={this.set_max_date()}
            name="date"
            type="month"
            onChange={this.handleChange}
            />
        );
    }
    
}

DateSelector.propTypes = {
    date: PropTypes.func
};

export default DateSelector;