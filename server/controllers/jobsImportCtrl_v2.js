/**
 * Created by ptutty on 18/03/2016.
 */




require('../helpers/jobscraper_async')(function(err, alljobs) {
    if (!err){
        console.log ( alljobs );
    }
});







