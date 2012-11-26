/*
**计算本周在一年中属于第几周
*/

function theWeek(){

//当前date
var now = new Date();

//每月多少日
var monthOfFullDay = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

//当前日，在本年中第几日
var currentDayOfYear = 0;

//是否为润年，即能被4整除
var isFullYear = false;

var currentDayOfWeekIsLastDay = false;

var firstDayOfYearIsFirstDayOfWeek = false;

//当前年份
var year = 0;
if(now.getYear()>=2000)
    year = now.getYear();
else
    year = now.getYear() + 1900;

//当前月份
var month = now.getMonth();

//当前日
var day = now.getDate();

//当前星期几
var week = now.getDay();

//为闰年，设isFullYear为true
if(year%4==0){
    isFullYear = true;
}


//循环计算天数
for(var i=0;i<monthOfFullDay.length;i++){
    //判断数组月份是否小于等于当前月份
    if(i<month){
        //是闰年和2月份
        if(isFullYear && i==1)
            currentDayOfYear = currentDayOfYear + 29;
        else
            currentDayOfYear = currentDayOfYear + monthOfFullDay[i];

    }
    if(i==month)
        currentDayOfYear = currentDayOfYear + day;
}

//设置本年1月1日
var firstDayOfYear = new Date();
firstDayOfYear.setYear(year);
firstDayOfYear.setMonth(0);
firstDayOfYear.setDate(1);

if(firstDayOfYear.getDay()==0){
    firstDayOfYearIsFirstDayOfWeek = true;
}

var weeksOfYear = currentDayOfYear;

//本星期是否为最后一日，否，则减去本星期所有日
if(!currentDayOfWeekIsLastDay){
    weeksOfYear = weeksOfYear + firstDayOfYear.getDay();
}

//是否第一个星期为第一日（即星期日），否，则减去本星期所有日
if(!firstDayOfYearIsFirstDayOfWeek){
    weeksOfYear = weeksOfYear + (7-week-1);
}

return weeksOfYear/7;
}
