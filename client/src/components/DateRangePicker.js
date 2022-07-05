import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';

class DateRangePickerComponent extends React.Component {
    handleSelect(date){
        console.log(date); // native Date object
      }
      render(){
        return (
          <Calendar
            date={new Date()}
            onChange={this.handleSelect}
          />
        )
      }
}

export default DateRangePickerComponent;