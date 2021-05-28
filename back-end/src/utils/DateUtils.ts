export const buildDateAndHoursDayCurrent = () => {
    const dateCurrent = new Date();
    const yearCurrent = dateCurrent.getFullYear();
    const monthCurrent = dateCurrent.getMonth();
    const dayCurrent = dateCurrent.getDate();

    const initialDayInMilliseconds = new Date(yearCurrent, monthCurrent, dayCurrent).getTime();
    const finishDayInMilliseconds = new Date(yearCurrent, monthCurrent, dayCurrent, 23, 59, 59).getTime();

    return [initialDayInMilliseconds, finishDayInMilliseconds];
}