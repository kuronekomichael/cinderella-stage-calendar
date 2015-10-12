var TCal = require('../lib/ticket-calendar');

function testTrainingTicketTimesByDate(tcal, date, expectedHour1, expectedHour2, expectedHour3) {
    var results = tcal.getTrainingTicketTimesByDate(date);

    var date = new Date(date);
    expect(results.length).is.equals(3);
    results.forEach(function(time) {
        // 年月日は指定日と同じ
        expect(date.getYear()).is.equals(time.getYear());
        expect(date.getMonth()).is.equals(time.getMonth());
        expect(date.getDate()).is.equals(time.getDate());
        // 時以外は全て0
        expect(date.getMinutes()).is.equals(0);
        expect(date.getSeconds()).is.equals(0);
        expect(date.getMilliseconds()).is.equals(0);
    });

    expect(results[0].getHours()).is.equals(expectedHour1);
    expect(results[1].getHours()).is.equals(expectedHour2);
    expect(results[2].getHours()).is.equals(expectedHour3);
}

describe('validate', function() {
    it('fails in contructor', function() {
        var tcal = null;
        try {
            tcal = new TCal('Z');
        } catch (e) {
            expect(e.toString()).is.equals('Error: invalid group name. please set in A, B, C, D, E, F, G or H.');
        }
        expect(tcal).is.null;
    });
    it('invalid before 2015-10-1', function() {
        var tcal = new TCal(TCal.GROUP_B);
        expect(tcal.getTrainingTicketTimesByDate.bind(tcal, new Date('2015-09-20')))
            .to.throw('invalid target date. please set a date after 2015-10-1.');
    })
});

[
    {
        group: 'A',
        tests: [
            ['2015-10-24',  8, 12, 19], // Pattern a
            ['2015-10-15', 11, 15, 22], // Pattern b
            ['2015-10-02', 10, 14, 21], // Pattern c
            ['2015-10-01',  9, 13, 20], // Pattern d
        ]
    },
    {
        group: 'B',
        tests: [
            ['2015-10-08',  9, 13, 20], // Pattern a
            ['2015-10-07',  8, 12, 19], // Pattern b
            ['2015-10-22', 11, 15, 22], // Pattern c
            ['2015-10-09', 10, 14, 21], // Pattern d
        ]
    },
    {
        group: 'C',
        tests: [
            ['2015-10-16', 10, 14, 21], // Pattern a
            ['2015-10-11',  9, 13, 20], // Pattern b
            ['2015-10-14',  8, 12, 19], // Pattern c
            ['2015-10-25', 11, 15, 22], // Pattern d
        ]
    },
    {
        group: 'D',
        tests: [
            ['2015-10-12', 11, 15, 22], // Pattern a
            ['2015-10-03', 10, 14, 21], // Pattern b
            ['2015-10-02', 09, 13, 20], // Pattern c
            ['2015-10-13', 08, 12, 19], // Pattern d
        ]
    },
    {
        group: 'E',
        tests: [
            ['2015-10-04',  8, 12, 19], // Pattern a
            ['2015-10-19', 11, 15, 22], // Pattern b
            ['2015-10-10', 10, 14, 21], // Pattern c
            ['2015-10-29',  9, 13, 20], // Pattern d
        ]
    },
    {
        group: 'F',
        tests: [
            ['2015-11-01',  9, 13, 20], // Pattern a
            ['2015-11-08',  8, 12, 19], // Pattern b
            ['2015-11-15', 11, 15, 22], // Pattern c
            ['2015-11-10', 10, 14, 21], // Pattern d
        ]
    },
    {
        group: 'G',
        tests: [
            ['2015-11-05', 10, 14, 21], // Pattern a
            ['2015-11-12',  9, 13, 20], // Pattern b
            ['2015-11-19',  8, 12, 19], // Pattern c
            ['2015-11-14', 11, 15, 22], // Pattern d
        ]
    },
    {
        group: 'H',
        tests: [
            ['2015-11-09', 11, 15, 22], // Pattern a
            ['2015-11-16', 10, 14, 21], // Pattern b
            ['2015-11-23', 09, 13, 20], // Pattern c
            ['2015-11-18', 08, 12, 19], // Pattern d
        ]
    }
].forEach(function(test) {
    describe('tests group "' + test.group + '"', function() {
        var tcal = new TCal(test.group);
        test.tests.forEach(function(args, i) {
            it('gets training ticket times at ' + args[0] + ' in pattern-' + (i + 1), function() {
                testTrainingTicketTimesByDate(tcal, args[0], args[1], args[2], args[3]);
            });
        });
    });
});
