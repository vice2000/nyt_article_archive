import React from 'react';
import PropTypes from 'prop-types';


class DateSelector extends React.Component {

    state = {}

    set_max_date() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth()+1;
        const mth_leading_zero = month < 10 ? `0${month}` : `${month}`;
        return (`${year}-${mth_leading_zero}`);
    }

    handleChange = (e) => {

        const date = {};
        const raw_date = e.currentTarget.value;
        const date_str = raw_date.split('-');

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