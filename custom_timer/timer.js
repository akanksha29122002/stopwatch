const customTime = {}
var paused = true
var minutes
var timerDate
var remainingTime = 0
var darkTheme = false

const audio = new Audio();
audio.src = "../audio/sound_trim.mp3"  // same audio clip is used for pause,reset

function $id(id) {
    return document.getElementById(id);
}

const setCustomTime = (minutes) => {
    paused = true
    audio.play();
    customTime.minutes = minutes
    $id('minutes').innerHTML = minutes
    $id('seconds').innerHTML = '00'
    minutes = customTime.minutes
    timerDate = new Date(new Date().getTime() + minutes * 60000)
    remainingTime = 0
    paused = true
    $id('timer-control').innerHTML = 'Play'
    $id('counter-background').classList.remove('inactive');
    $id('counter-background').classList.add('active');
    customTime.seconds = 60*customTime.minutes
}

const reset=()=>{
    audio.play();
    clearInterval(interval);
    setCustomTime(time.value);
}
var interval = 0;
const startCustomTimerCounter = (action) => {
    audio.play();
    paused = !paused;

    $id('timer-control').innerHTML = paused ? 'Play' : 'Pause';
    if (!paused) {
        $id('counter-background').classList.remove('active');
        $id('counter-background').classList.add('inactive');
        $id('focus').classList.remove('hidden');
        if(darkTheme){
            $('.inactive').css({"background": "black", "color": "white"})
        }
        else{
            $('.inactive').css({"background": "rgb(5, 30, 54)", "color": "rgb(169, 188, 214)"});
        }
    } else {
        $id('counter-background').classList.remove('inactive');
        $id('counter-background').classList.add('active');
        if(darkTheme){
            $('.active').css({"color":"#7fe9d4", "background": "#191212"})
        }
        else{
            $('.active').css({ "background": "linear-gradient(to right, #191654, #43C6AC)" });
        }
    }
    const updateTimer = () => {
        console.log("hi")
        if (!paused && customTime.seconds  > 0) {
            customTime.seconds--;
            const minutes = Math.floor(customTime.seconds / 60);
            const seconds = customTime.seconds % 60;
            $id('minutes').innerHTML = minutes
            $id('seconds').innerHTML = seconds
        }
        if(customTime.seconds == 0){
            reset()
        }
    }
    interval = setInterval(updateTimer, 1000);
}

setCustomTime(time.value);


function setLightTheme(){
    darkTheme = false;
    $('.navbar').css({ "background-color": "rgb(5, 30, 54)" });
    $('.active').css({ "background": "linear-gradient(to right, #191654, #43C6AC)" });
    $('.inactive').css({"background": "rgb(5, 30, 54)"});
    $('#light').prop("checked", false);
}

function setDarkTheme(){
    darkTheme = true;
    $('.navbar').css({ "background-color": "black" });
    $('.active').css({"color":"#7fe9d4", "background": "#191212"})
    $('.inactive').css({"background": "black", "color": "white"})
    $('#light').prop("checked", true);
}

var prefersDarkThemeMql = window.matchMedia("(prefers-color-scheme: dark)");

prefersDarkThemeMql.addEventListener("change", function(mql) {
    if (localStorage.getItem("darkmode") === null && mql.matches) {
        setDarkTheme();
    } else {
        setLightTheme();
    }
})

$(document).ready(function ()
{

    if (
        localStorage.getItem("darkmode") == "true" ||
        (localStorage.getItem("darkmode") === null && prefersDarkThemeMql.matches)
    )
    {
        setDarkTheme();
    }

    $('#light').on("change paste keyup", function (e)
    {
        if (!e.target.checked)
        {
            setLightTheme();
            localStorage.setItem("darkmode", false);
        }
        else
        {
            setDarkTheme();
            localStorage.setItem("darkmode", true);
        }
    });
});