var moment = require('moment');
require('moment-range');

TicketCalendar.GROUP_A = 'A';
TicketCalendar.GROUP_B = 'B';
TicketCalendar.GROUP_C = 'C';
TicketCalendar.GROUP_D = 'D';
TicketCalendar.GROUP_E = 'E';
TicketCalendar.GROUP_F = 'F';
TicketCalendar.GROUP_G = 'G';
TicketCalendar.GROUP_H = 'H';

var groupTable = {
    //----[Pattern  0]--[Pattern  1]--[Pattern  2]--[Pattern  3]
    'A': [[08, 12, 19], [11, 15, 22], [10, 14, 21], [09, 13, 20]],
    'B': [[09, 13, 20], [08, 12, 19], [11, 15, 22], [10, 14, 21]],
    'C': [[10, 14, 21], [09, 13, 20], [08, 12, 19], [11, 15, 22]],
    'D': [[11, 15, 22], [10, 14, 21], [09, 13, 20], [08, 12, 19]],
};
groupTable['E'] = groupTable['A'];
groupTable['F'] = groupTable['B'];
groupTable['G'] = groupTable['C'];
groupTable['H'] = groupTable['D'];

// 基準日 <2015-10-1> が Pattern 3。翌日以降がPattern 2, 1, 0, 3, 2, 1, 0...と回っていく
var baseDateOnPattern3 = moment('2015-10-01', 'YYYY-MM-DD');
// 2015-10-01 = Pattern 3
// 2015-10-02 = Pattern 2
// 2015-10-03 = Pattern 1
// 2015-10-04 = Pattern 0
// 2015-10-05 = Pattern 3
// 2015-10-06 = Pattern 2
// 2015-10-07 = Pattern 1
// 2015-10-08 = Pattern 0
//      ：         ：

function TicketCalendar(group) {
    if (! /^[A-H]$/.test(group)) {
        throw new Error('invalid group name. please set in A, B, C, D, E, F, G or H.');
    }
    this.group = group;
}

TicketCalendar.prototype.getTrainingTicketTimesByDate = function(aDate) {
    var aDate = moment(aDate);
    if (aDate.isBefore(baseDateOnPattern3)) {
        throw new Error('invalid target date. please set a date after 2015-10-1.');
    }

    var pattern = 3 - (aDate.diff(baseDateOnPattern3, 'days') % 4);
    return groupTable[this.group][pattern].map(function(hour) {
        return new Date(aDate.year(), aDate.month(), aDate.date(), hour);
    });
}

module.exports = TicketCalendar;
