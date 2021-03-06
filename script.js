function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 15,
        disableDefaultUI: true
    });
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = {
        bus: {
            icon: 'Images/Icons/icon.png'
        },
        busstop: {
            icon: 'Images/Icons/bus-stop.png'
        },
        info: {
            icon: 'info-i_maps.png'
        }
    };
    var thisBusTimes = "";

    function addMarker(feature) {
        var content = "";

        function addContent() {
            thisBusTimes = "";
            content = "";
            infowindow.open(map, marker);
            if (features[marker.get("id")].type == "bus") {
                for (var w = 0; w <= Timetable[marker.get("id")].Times.length - 1; w++) {
                    thisBusTimes += "<p>" + Timetable[marker.get("id")].Times[w] + "</p>";
                    content = "<div class='clicked-bus-times'><h4>" + Timetable[marker.get('id')].Route + "</h4><div id='bus-from-to '> <h5>" + Timetable[marker.get("id")].From + "-" + Timetable[marker.get("id")].To + "</h5></div><div id='This-bus-times'>" + thisBusTimes + "</div> </div>";
                }
            } else if (features[marker.get("id")].type == "busstop") {
                for (var b = 0; b < features[marker.get("id")].Buses.length; b++) {
                    content += "<div class='clicked-bus-times'><h4>" + features[marker.get('id')].Buses[b].Route + "</h4><div id='bus-from-to'> <h5>" + features[marker.get("id")].Buses[b].From + "-" + features[marker.get("id")].Buses[b].To + "</h5></div></div>";
                }
            }
            infowindow.setContent(content);
        }
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map,
            id: feature.BusNum
        });
        var infowindow = new google.maps.InfoWindow();
        marker.addListener('click', addContent);
    }
    var features = [
        {
            position: new google.maps.LatLng(53.0101, -2.1814),
            type: 'busstop',
            BusNum: '0',
            Buses: [Timetable[0], Timetable[3], Timetable[8]]
          }, {
            position: new google.maps.LatLng(53.008241, -2.180795),
            type: 'busstop',
            BusNum: '1',
            Buses: [Timetable[3], Timetable[6], Timetable[8]]
          }, {
            position: new google.maps.LatLng(53.0110, -2.1809),
            type: 'bus',
            BusNum: '2'
          }, {
            position: new google.maps.LatLng(53.008011, -2.177792),
            type: 'bus',
            BusNum: '3'
          }];

    for (var i = 0, feature; feature = features[i]; i++) {
        addMarker(feature);
    }
}

function initMap2() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 53.0104,
            lng: -2.2247
        },
        zoom: 19,
        disableDefaultUI: true
    });
    var marker = new google.maps.Marker({
        position: map.center,
        map: map
    });
}
var position = 1;
var hamburger = document.getElementById("hamburger-btn");
var sideNav = document.getElementById("hamburger-nav");
hamburger.addEventListener("click", hamburgerMove, false);

function hamburgerMove() {

    if (position == 1) {
        position = 0;
        sideNav.className = "side-nav-open";
    } else {
        position = 1;
        sideNav.className = "side-nav";;
    }
}
//Search Results
var searchButton = document.getElementById("Search-Button");
var displayResults = document.getElementById("display-results");
var radio = document.getElementsByName("search-radio");
for (var x = 0; x < radio.length; x++) {
    radio[x].addEventListener('change', function () {
        var searchType = this.value;
        localStorage.setItem("Type", searchType);
    });
}
var found = [];
if (searchButton) {
    searchButton.addEventListener("click", function () {
        var searchBar = document.getElementById("search-bar").value;
        localStorage.setItem("Choice", searchBar);;
    });
}
for (var k = 0; k < Timetable.length; k++) {
    if (localStorage.getItem("Type") == "From") {
        if (localStorage.getItem("Choice") == Timetable[k].From) {
            found.push(Timetable[k]);
        }
    } else if (localStorage.getItem("Type") == "To") {
        if (localStorage.getItem("Choice") == Timetable[k].To) {
            found.push(Timetable[k]);
        }
    } else {
        if (localStorage.getItem("Choice") == Timetable[k].Route) {
            found.push(Timetable[k]);
        }
    }
}
if (displayResults) {
    if (found.length <= 0) {
        displayResults.innerHTML = "<h3 id='nodata'>No Results Found</h3>";
    } else {
        for (var l = 0; l < found.length; l++) {
            displayResults.innerHTML += "<div class='bus-number' id='" + found[l].id + "'><a href='timeTableResults.html' class='busroute'> <p class='bus-route-num'>" + found[l].Route + "</p> <div  class='bus-locations'><p>" + found[l].From + "-" + found[l].To + "</p><div class='recent-times'></div></div></a> </div>";
        }
    }
}
var busTimes = document.getElementById('bus-times');
var recent = document.getElementsByClassName('recent-times');
if (busTimes) {
    for (var i = 0; i <= Timetable.length - 1; i++) {
        busTimes.innerHTML += "<div class='bus-number' id='" + i + "'><a href='timeTableResults.html' class='busroute'> <p class='bus-route-num'>" + Timetable[i].Route + "</p> <div  class='bus-locations'><p>" + Timetable[i].From + "-" + Timetable[i].To + "</p><div class='recent-times'></div></div></a> </div>";
        for (var q = 0; q < 5; q++) {
            recent[i].innerHTML += "<p>" + Timetable[i].Times[q] + "</p>";
        }
    }
}
var chosenNum = document.getElementsByClassName('bus-number');
for (var a = 0; a < chosenNum.length; a++) {
    chosenNum[a].addEventListener("click", detailNum);
}

function detailNum(event) {
    localStorage.setItem("Chosen", this.id);

}
//Bus times Results
var busNumber = document.getElementById("bus-number");
var mapImage = document.getElementById("map2");
var timeTableDetailTimes = document.getElementById("timeTable-detail-times");
var busFromTo = document.getElementById("bus-from-to");
var busNum = localStorage.getItem("Chosen");
if (busNumber) {
    busNumber.innerHTML = "<h1>" + Timetable[busNum].Route + "</h1>";
    mapImage.innerHTML = "<img src='Images/maps/" + Timetable[busNum].map + ".png' alt='" + Timetable[busNum].from + "-" + Timetable[busNum].to + " Map' class='mapimage'>";
}
if (busFromTo) {
    busFromTo.innerHTML = "<h2>" + Timetable[busNum].From + "-" + Timetable[busNum].To + "</h2>";
}
if (timeTableDetailTimes) {
    for (var e = 0; e <= Timetable[busNum].Times.length - 1; e++) {
        timeTableDetailTimes.innerHTML += "<p>" + Timetable[busNum].Times[e] + "</p>";
    }
}

var BusRouteList = document.getElementById("BusRouteList");

if (BusRouteList) {
    for (var r = 0; r < Timetable[busNum].Stops.length; r++) {
        BusRouteList.innerHTML += "<div class='route-list-row'><img src='Images/Icons/bus-stop.png' alt='bus stop icon'><p class='bus-stop-location'>" + Timetable[busNum].Stops[r] + "</p></div>";
    }

}

var showMore = document.getElementById('show-more');
if (showMore) {
    showMore.addEventListener("click", showHide, false);
    var pos = "hide";

    function showHide() {
        if (pos == "hide") {
            timeTableDetailTimes.style.height = "133px";
            showMore.innerHTML = "show less";
            pos = "show";
        } else {
            timeTableDetailTimes.style.height = "70px";
            showMore.innerHTML = "show more";
            pos = "hide";
        }
    }
}

var tabChecked = document.getElementsByClassName("tab-checked");
var tabUnchecked = document.getElementsByClassName("tab-unchecked");
if(tabUnchecked[0]){
tabUnchecked[0].addEventListener("click", function(){
    this.className += " tab-checked";
        tabUnchecked[1].classList.remove("tab-checked");
    BusRouteList.style.display = "none";
        showMore.style.display = "block";
    timeTableDetailTimes.style.display = "flex";
});
tabUnchecked[1].addEventListener("click", function(){
 this.className += " tab-checked";
    tabUnchecked[0].classList.remove("tab-checked");
      BusRouteList.style.display = "block";
    showMore.style.display = "none";
    timeTableDetailTimes.style.display = "none";
});
}
//Favorites
var favouriteBtn = document.getElementById("favourite-btn");
if (localStorage.getItem("Favourite") == null) {
    var favourites = [];
} else {
    var favourites = JSON.parse(localStorage.getItem("Favourite"));
}
if (favouriteBtn) {
    favouriteBtn.addEventListener("click", addFavourite);

    function addFavourite() {
        favourites.push({
            'route': Timetable[busNum].Route,
            'from': Timetable[busNum].From,
            'to': Timetable[busNum].To
        });
        localStorage.setItem("Favourite", JSON.stringify(favourites));
    
    }
}
//Display Favourites
var displayFavourites = document.getElementById("display-favourites");
if (displayFavourites) {
    var chosenFav = JSON.parse(localStorage.getItem("Favourite"));
    if (chosenFav !== null) {
        DisplayFavourites();
    } else {
        displayFavourites.innerHTML += "No Favourites added";
    }
}

var timetables = document.getElementById("timetables");
if (timetables) {
    timetables.innerHTML += "<h2>My Favourites</h2>";
    var fav = JSON.parse(localStorage.getItem("Favourite"));
    if(fav.length !=0){
    for (var j = 0; j < fav.length; j++) {

        timetables.innerHTML += "<div class='bus-number' id='" + j + "'><a href='timeTableResults.html' class='busroute'> <p class='bus-route-num'>" + fav[j].route + "</p> <div  class='bus-locations'><p>" + fav[j].from + "-" + fav[j].to + "</p></div></div>";


    }
    }
}
var show = "open";
var editBtn = document.getElementById('edit-btn');
var deleteBtns = document.getElementsByClassName('delete-btn');
if (editBtn) {
    editBtn.addEventListener("click", showHideDelete, false);

    function showHideDelete() {
        if (show === "open") {
            for (var i = 0; i < deleteBtns.length; i++) {
                animateLeft(deleteBtns[i], 90, 3);
            }
            show = "close";
        } else {
            for (var i = 0; i < deleteBtns.length; i++) {
                animateRight(deleteBtns[i], 3, 90);
            }
            show = "open";
        }
    }
}

function deleteFavourite() {
    var choice = this.value;
    var favourites = JSON.parse(localStorage.getItem("Favourite"));
    favourites.splice(choice, 1);
    localStorage.setItem("Favourite", JSON.stringify(favourites));
    displayFavourites.innerHTML = "";
    DisplayFavourites();
}


function animateLeft(obj, from, to) {
    if (from <= to) {} else {
        var box = obj;
        box.style.marginLeft = from + "px";
        setTimeout(function () {
            animateLeft(obj, from - 1, to);
        }, 0.5)
    }
}

function animateRight(obj, from, to) {
    if (from >= to) {} else {
        var box = obj;
        box.style.marginLeft = from + "px";
        setTimeout(function () {
            animateRight(obj, from + 1, to);
        }, 0.5)
    }
}

function DisplayFavourites() {
    chosenFav = JSON.parse(localStorage.getItem("Favourite"));
    for (var y = 0; y < chosenFav.length; y++) {
        displayFavourites.innerHTML += "<div class='overflow-div'><div class='bus-number' id='" + y + "'><a href='timeTableResults.html' class='busroute'> <p class='bus-route-num'>" + chosenFav[y].route + "</p> <div  class='bus-locations'><p>" + chosenFav[y].from + "-" + chosenFav[y].to + "</p></div></a><button class='delete-btn' value='" + y + "'>Delete</button></div><img src='Images/Icons/waste-bin.png' alt='delete button trash can' class='delete-btn trash-can' value'"+y+"' ></div>";
    }
    deletebtnAL();
}

function deletebtnAL() {
    deleteBtns = document.getElementsByClassName('delete-btn');
    for (var ty = 0; ty < deleteBtns.length; ty++) {

        deleteBtns[ty].addEventListener("click", deleteFavourite, false);

    }
}