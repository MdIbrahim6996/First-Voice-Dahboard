export const timeArr: { id: number; startDate: Date; endDate: Date }[] = [];
for (let i = 0; i < 12; i++) {
    const startYear = new Date();
    startYear.setMonth(i);
    startYear.setDate(1);
    startYear.setUTCHours(0, 0, 0, 0);

    const endYear = new Date();
    endYear.setFullYear(endYear.getFullYear());
    endYear.setMonth(i + 1);
    endYear.setDate(1);
    endYear.setUTCHours(0, 0, 0, 0);
    const obj = {
        id: i,
        startDate: startYear,
        endDate: endYear,
    };
    timeArr.push(obj);
}
