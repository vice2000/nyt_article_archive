import React from 'react';

class Datepicker extends React.Component {
    render() {
        return(
            <form className="datepicker" action="/" method="POST">
                <input className="datepicker__month" name="date" type="month" min="1851-09" />
                <input type="submit" value="GO!" />
            </form>
        );
    }

}

export default Datepicker;