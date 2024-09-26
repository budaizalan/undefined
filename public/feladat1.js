"use strict";
const clockHrs = document.getElementById("clock-hrs");
const clockMin = document.getElementById("clock-min");
const clockSec = document.getElementById("clock-sec");
function updateClock() {
    const date = new Date();
    const hrs = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    const sec = date.getSeconds().toString().padStart(2, '0');
    console.log(hrs, min, sec);
    if (clockHrs)
        clockHrs.innerHTML = hrs;
    if (clockMin)
        clockMin.innerHTML = min;
    if (clockSec)
        clockSec.innerHTML = sec;
}
setInterval(updateClock, 1000);
