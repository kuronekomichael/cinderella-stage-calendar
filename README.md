cinderella-stage-calendar
==========================
デレステのトレチケタイムをiCalファイルにしたものです（非公式）

## iCal

- https://raw.githubusercontent.com/kuronekomichael/cinderella-stage-calendar/master/iCal/group-A.ics
- https://raw.githubusercontent.com/kuronekomichael/cinderella-stage-calendar/master/iCal/group-B.ics
- https://raw.githubusercontent.com/kuronekomichael/cinderella-stage-calendar/master/iCal/group-C.ics
- https://raw.githubusercontent.com/kuronekomichael/cinderella-stage-calendar/master/iCal/group-D.ics
- https://raw.githubusercontent.com/kuronekomichael/cinderella-stage-calendar/master/iCal/group-E.ics
- https://raw.githubusercontent.com/kuronekomichael/cinderella-stage-calendar/master/iCal/group-F.ics
- https://raw.githubusercontent.com/kuronekomichael/cinderella-stage-calendar/master/iCal/group-G.ics
- https://raw.githubusercontent.com/kuronekomichael/cinderella-stage-calendar/master/iCal/group-H.ics

## Caution

- 非公式のシロモノです。間違っても公式の運営さんに文句をいわないように
- 間違いがあっても何も保証できません。仕様変更などの情報があればissueをあげてください

## Installation

```javascript
var TicketCalendar = require('./lib/ticket-calendar');
var tCal = new TicketCalendar(TicketCalendar.GROUP_A);
var times = tCal.getTrainingTicketTimesByDate(new Date('2015-10-1'));
console.log(times);

//[ Thu Oct 01 2015 09:00:00 GMT+0900 (JST),
//  Thu Oct 01 2015 13:00:00 GMT+0900 (JST),
//  Thu Oct 01 2015 20:00:00 GMT+0900 (JST) ]
```

## Rule

- グループはA, B, C, D, E, F, G, Hの８つ  
    アプリ起動時に画面左下に表示されます
- パターンは0〜3の４種類
    - パターン0
    - パターン1
    - パターン2
    - パターン3
- 10/1がパターン3、10/2がパターン2、10/3がパターン1, 10/4がパターン0、10/5がパターン3・・・とループしています


グループ | パターン0           | パターン1           | パターン2           | パターン3
-------- | ------------------- | ------------------- | ------------------- | -------------------
A, E     | 08:00、12:00、19:00 | 11:00、15:00、22:00 | 10:00、14:00、21:00 | 09:00、13:00、20:00
B, F     | 09:00、13:00、20:00 | 08:00、12:00、19:00 | 11:00、15:00、22:00 | 10:00、14:00、21:00
C, G     | 10:00、14:00、21:00 | 09:00、13:00、20:00 | 08:00、12:00、19:00 | 11:00、15:00、22:00
D, H     | 11:00、15:00、22:00 | 10:00、14:00、21:00 | 09:00、13:00、20:00 | 08:00、12:00、19:00

## References

- 公式サイト「アイドルマスター シンデレラガールズ スターライトステージ」  
http://cinderella.idolmaster.jp/sl-stage/
- アイマス デレステ攻略まとめwiki【アイドルマスター シンデレラガールズ スターライトステージ】  
http://imascg-slstage-wiki.gamerch.com/%E3%83%88%E3%83%AC%E3%83%81%E3%82%B1%E3%82%BF%E3%82%A4%E3%83%A0
