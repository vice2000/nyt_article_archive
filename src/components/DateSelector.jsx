import React from 'react';
import PropTypes from 'prop-types';


class DateSelector extends React.Component {

    state = {}

    set_max_date() {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth()+1;
        let mth_leading_zero = month < 10 ? `0${month}` : `${month}`;
        return (`${year}-${mth_leading_zero}`);
    }

    handleChange = (e) => {

        let date = {};
        let raw_date = e.currentTarget.value;
        let date_str = raw_date.split('-');

        date.year =  date_str[0];
        date.month = String(parseInt(date_str[1], 10)); // strip leading zero
        
        this.props.date(date);

    }

    render() {
        return (
            <fieldset className="header__fieldset">
                <label className="header__label" htmlFor="dateSelector">Select Year and Month</label>
                <input
                    min="1851-09"
                    max={this.set_max_date()}
                    name="date"
                    type="month"
                    onChange={this.handleChange}
                    placeholder="Type in year and month, e.g. '2019-03'"
                    className="header__input"
                    id="dateSelector"
                    required
                    pattern="\d{4}-\d{2}"
                />
            </fieldset>
        );
    }
    
}

DateSelector.propTypes = {
    date: PropTypes.func
};

export default DateSelector;