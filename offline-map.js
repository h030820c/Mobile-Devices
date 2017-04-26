var map = document.getElementById("map").style.display = "none";
var timetables = document.getElementById("timetables");
var recent = document.getElementsByClassName('recent-times');

    for (var i = 0; i <= Timetable.length - 1; i++) {
        timetables.innerHTML += "<div class='bus-number' id='" + i + "'><a href='timeTableResults.html' class='busroute'> <p class='bus-route-num'>" + Timetable[i].Route + "</p> <div  class='bus-locations'><p>" + Timetable[i].From + "-" + Timetable[i].To + "</p><div class='recent-times'></div></div></a> </div>";

        for (var q = 0; q < 5; q++) {
            recent[i].innerHTML += "<p>" + Timetable[i].Times[q] + "</p>";
        }
    }