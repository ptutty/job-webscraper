/**
 * Created by ptutty on 23/03/2016.
 */

var moment = require('moment'); // momentjs library
moment().format();



var args = process.argv.slice(2);

// stringToDate( args[0], args[1] );
stringToDate( 1, "mar" );


function stringToDate(day,month) {

    var year = moment().year();
    var months = ['jan', 'feb', 'mar', 'apr' , 'may', 'june' , 'july' ,'aug' , 'sep' , 'oct', 'nov' , 'dec']; // look up table of months
    var monthAsInt = months.indexOf( month.toLowerCase() );
    var newDateString = year + "/" + monthAsInt + "/" + day;
    var newDateObj = new Date(newDateString);

    console.log(newDateObj);

}


