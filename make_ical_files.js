var fs = require('fs');
var vobject = require('vobject');
var moment = require('moment');
var TicketCalendar = require('./lib/ticket-calendar');

['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(function(groupName) {
    var calendar = vobject.calendar();
    calendar.setMethod('PUBLISH')
    calendar.setProperty(vobject.property('PRODID', '-//Sleeping Cat Syndrome//EN'));

    // 月初から３ヶ月分を出力
    var tCal = new TicketCalendar(groupName);
    for (
        var date = moment().startOf('month');
        date.isBefore(moment().add(2, 'month').endOf('month'));
        date.add(1, 'day')
    ) {
        tCal.getTrainingTicketTimesByDate(date).forEach(function(startTime, index) {
            var endTime = moment(startTime).add(1, 'hour');

            var event = vobject.event();
            event.setSummary('トレチケタイム' + (index + 1));
            event.setDescription(date.format('YYYY/MM/DD') + ' ' + (index + 1) + '回目のトレチケタイム');
            event.setDTStart(vobject.dateTimeValue(startTime.toISOString()))
            event.setDTEnd(vobject.dateTimeValue(endTime.toISOString()))
            calendar.pushComponent(event);
        })
    }

    fs.writeFileSync('./iCal/group-' + groupName + '.ics', calendar.toICS());
});
