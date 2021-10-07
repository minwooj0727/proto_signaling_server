const dateformat = require('dateformat');
const fs = require('fs');
module.exports = {


        getDateTime : function(){
                return dateformat(new Date(),'yyyy-mm-dd HH:MM:ss.l');

        },
        writeLog : function(type,log){
                var curDate = dateformat(new Date(),'yyyy-mm-dd HH:MM:ss.l');
                fs.appendFile('server.log', "[" + curDate + "] " + type +"  " + JSON.stringify(log) + "\n", function (err) {
                });
        }
}
