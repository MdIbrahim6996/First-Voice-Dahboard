"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeArr = void 0;
exports.timeArr = [];
for (var i = 0; i < 12; i++) {
    var startYear = new Date();
    startYear.setMonth(i);
    startYear.setDate(1);
    startYear.setUTCHours(0, 0, 0, 0);
    var endYear = new Date();
    endYear.setFullYear(endYear.getFullYear());
    endYear.setMonth(i + 1);
    endYear.setDate(1);
    endYear.setUTCHours(0, 0, 0, 0);
    var obj = {
        id: i,
        startDate: startYear,
        endDate: endYear,
    };
    exports.timeArr.push(obj);
}
