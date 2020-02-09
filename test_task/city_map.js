"use strict"

function CityNameStorage(cityListStr) {

    var self = this;

    self.cityInfoStorage = {};

    var cityList = [];
    var states = [];
    var latitudes = [];
    var longitudes  = [];

    function uniq(arr) {
        var seen = {};
        var sort = [];
        var j = 0;
        for(var i = 0; i < arr.length; i++) {

            if(seen[arr[i]] !== 1) {
                seen[arr[i]] = 1;
                sort[j++] = arr[i];
            }
        }
        return sort;
    }

    self.strConversion =  function () {

        var cityArray = cityListStr.split(';');

        for (var i = 0;i<cityArray.length;i++) {
            if(cityArray[i]=== ""){
                cityArray.splice(i,1);
            }
        }

        function transformArr(cityInfo, i) {
            var curCity = cityInfo.split(',');
            var city  = curCity[0].replace(/"/g,'');
            var state = curCity[1].replace(/"/g,'');

            self.cityInfoStorage[city] =[state,curCity[2],curCity[3]];
        }

        cityArray.forEach(transformArr);

        var downloadedList = JSON.parse(localStorage.getItem("CityMapList"));

        for(var k in downloadedList) {

            if (!(k in self.cityInfoStorage)) {
                self.cityInfoStorage[k] = downloadedList[k];
            }
        }
    };

    self.strConversion();

    self.update = function () {

        cityList = [];
        states = [];
        latitudes = [];
        longitudes  = [];


        cityList = Object.keys(self.cityInfoStorage);

        for(var i = 0;i < cityList.length;i++){
            states[i] = (self.cityInfoStorage[cityList[i]][0]).trim();
            latitudes[i] = Number(self.cityInfoStorage[cityList[i]][1]);
            longitudes[i] =  Number(self.cityInfoStorage[cityList[i]][2]);
        }

        var stateListElem = document.getElementById("state_list");

        stateListElem.innerHTML = "";

        var sortStates = uniq(states)

        for(var i = 0; i < sortStates.length; i++){
            var listItem = document.createElement("option");
            listItem.value = sortStates[i];
            listItem.textContent = sortStates[i];
            stateListElem.appendChild(listItem);
        }
        console.log( cityList,
        states,
        latitudes,
        longitudes);
    };

    self.update();

    console.log(cityList,states,latitudes,longitudes);

    //1) Return the name of the northernmost, easternmost, southernmost or westernmost city from the list, as requested by the caller  direction "n"/"s"/"e"/"w"/
    self.distantCity = function ( direction ) {

        let northIndex = latitudes.indexOf(Number(Math.max(...latitudes)));
        let southIndex = latitudes.indexOf(Number(Math.min(...latitudes)));
        let eastIndex = longitudes.indexOf(Number(Math.max(...longitudes)));
        let westIndex = longitudes.indexOf(Number(Math.min(...longitudes)));

        var northernmost = cityList[northIndex];
        var southernmost = cityList[southIndex];
        var easternmost = cityList[eastIndex];
        var westernmost = cityList[westIndex];


        if(direction === 'n'){
            return northernmost;
        }
        if(direction === 's'){
            return southernmost;
        }
        if(direction === 'e'){
            return easternmost;
        }
        if(direction === 'w'){
            return westernmost;
        }
    };

    //2) Pass longitude and latitude as parameters, and return the name of the city that is closest to that location.
    self.nearestCity = function (latitude ,longitude) {
       console.log(parseInt(latitude ),parseInt(longitude));
       var minDistance = Math.sqrt( Math.pow( (parseInt(latitude) - latitudes[0]),2) + Math.pow( (parseInt(longitude) - latitudes[0]),2) );

       var cityName;


     for (var i=1; i<cityList.length; i++){

            var currDistance = Math.sqrt ( Math.pow( (parseInt(latitude) - latitudes[i]),2) + Math.pow( (parseInt(longitude) - latitudes[i]),2) );

            if(currDistance < minDistance){
             minDistance = currDistance;
             cityName = cityList[i];
            }
     }
        return cityName;
    };

    //3) Return a single string containing just the state abbreviations from the list of cities, each
    // separated by a space. The method should eliminate duplicate states. The result string
    // should not have leading or trailing spaces.
    self.stateList = function () {

        return (uniq(states)).join(' ');
    };

    //the argument to the method is passed two letters abbreviation of the state approx : "NY"
    self.searchByState = function (stateName) {

        var desiredState = (stateName.toUpperCase()).trim();
        var cityListFromState = [];

       for (var i =0;i<states.length;i++) {
           if(desiredState === states[i]){
               cityListFromState.push(cityList[i]) ;
           }
       }
       return cityListFromState;
    };

    self.addCityByForm = function () {

        var formObj = document.forms.addCity;


        var formCityName = formObj.elements.form_cityName.value;
        var formState = formObj.elements.form_state.value.toUpperCase();
        var formLatitude = formObj.elements.form_latitude.value;
        var formLongitude = formObj.elements.form_longitude.value;

        var addBtn = document.getElementById("addBtn");
        addBtn.style.transition = "transform 0.2s ease-in-out";
        addBtn.style.transform = "scale(0.9)";
        setTimeout(function (){
            addBtn.style.transform = "scale(1)";
        },200);

        if(formCityName && formState && formLongitude && formLongitude){
            self.cityInfoStorage[formCityName] =[formState,formLatitude,formLongitude];
            var cityImg = document.getElementById("city_img");
            cityImg.style.transition = "all 1s ease-in-out";
            cityImg.style.transform = "translateX(100px) translateZ(0)";
            cityImg.style.opacity = "0";

            setTimeout(function (){
                cityImg.style.transition = "opacity 1s ease-in-out";
                cityImg.style.opacity = "1";
                cityImg.style.transform = "translateX(0px) translateZ(0)";
            },1000);

            formObj.elements.form_cityName.value = "";
            formObj.elements.form_state.value = "";
            formObj.elements.form_latitude.value = "";
            formObj.elements.form_longitude.value = "";

            document.getElementById("cityName_err").textContent = "";
            document.getElementById("state_err").textContent = "";
            document.getElementById("latitude_err").textContent = "";
            document.getElementById("longitude_err").textContent = "";

            self.update();
            self.drawPipePlot();

        }else {
            if(!formCityName){document.getElementById("cityName_err").textContent = "Required field"}
            if(!formState){document.getElementById("state_err").textContent = "Required field"}
            if(!formLatitude){document.getElementById("latitude_err").textContent = "Required field"}
            if(!formLongitude){document.getElementById("longitude_err").textContent = "Required field"}
        }

    };

    self.savingListAtLockStorage = function () {

        localStorage.setItem("CityMapList",JSON.stringify(self.cityInfoStorage));
        
    };

    self.dataStates = function () {

        var countCitiesInState={};
        for ( var i=0; i<states.length; i++ ) {
            var state=states[i];
            if ( !(state in countCitiesInState) ){
                countCitiesInState[state] = 0;
            }
            countCitiesInState[state]++;
        }

        return countCitiesInState;
    };

    self.drawPipePlot = function() {

        var myCanvas = document.getElementById("myCanvas");
        myCanvas.width = 300;
        myCanvas.height = 300;

        var ctx = myCanvas.getContext("2d");

        function drawLine(ctx, startX, startY, endX, endY){
            ctx.beginPath();
            ctx.moveTo(startX,startY);
            ctx.lineTo(endX,endY);
            ctx.stroke();
        }

        function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.stroke();
        }

        function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(centerX,centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();
        }

        var Piechart = function(options){
            this.options = options;
            this.canvas = options.canvas;
            this.ctx = this.canvas.getContext("2d");
            this.colors = options.colors;

            this.draw = function(){
                var total_value = 0;
                var color_index = 0;
                for (var categ in this.options.data){
                    var val = this.options.data[categ];
                    total_value += val;
                }

                var start_angle = 0;
                for (categ in this.options.data){
                    val = this.options.data[categ];
                    var slice_angle = 2 * Math.PI * val / total_value;

                    drawPieSlice(
                        this.ctx,
                        this.canvas.width/2,
                        this.canvas.height/2,
                        Math.min(this.canvas.width/2,this.canvas.height/2),
                        start_angle,
                        start_angle+slice_angle,
                        this.colors[color_index%this.colors.length]
                    );

                    start_angle += slice_angle;
                    color_index++;
                }
                if (this.options.doughnutHoleSize){
                    drawPieSlice(
                        this.ctx,
                        this.canvas.width/2,
                        this.canvas.height/2,
                        this.options.doughnutHoleSize * Math.min(this.canvas.width/2,this.canvas.height/2),
                        0,
                        2 * Math.PI,
                        "#fff"
                    );
                }
                start_angle = 0;
                for (categ in this.options.data){
                    val = this.options.data[categ];
                    slice_angle = 2 * Math.PI * val / total_value;
                    var pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2);
                    var labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
                    var labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);

                    if (this.options.doughnutHoleSize){
                        var offset = (pieRadius * this.options.doughnutHoleSize ) / 2;
                        labelX = this.canvas.width/2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
                        labelY = this.canvas.height/2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
                    }

                    var labelText = this.options.data[categ] ;
                    this.ctx.fillStyle = "black";
                    this.ctx.font = "bold 20px Arial";
                    this.ctx.fillText(labelText, labelX,labelY);
                    this.ctx.textAlign = "center";
                    start_angle += slice_angle;
                }
                if (this.options.legend){
                    color_index = 0;
                    var legendHTML = "";
                    for (categ in this.options.data){
                        legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
                    }
                    this.options.legend.innerHTML = legendHTML;
                }
            }
        }


        var myPiechart = new Piechart({
                canvas:myCanvas,
                data:CityMap.dataStates(),
                colors: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
                    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
                    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
                    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
                    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
                    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'],
                doughnutHoleSize:0.3,
                legend:myLegend
                });
        self.update();
        myPiechart.draw();
    };

}


var CityMap =  new CityNameStorage("\"Nashville, TN\", 36.17, -86.78;" +
    "\"New York, NY\", 40.71, -74.00;" +
    "\"Atlanta, GA\", 33.75, -84.39;" +
    "\"Denver, CO\", 39.74, -104.98;" +
    "\"Seattle, WA\", 47.61, -122.33;" +
    "\"Los Angeles, CA\", 34.05, -118.24;" +
    "\"Memphis, TN\", 35.15, -90.05;");

console.log(CityMap.cityInfoStorage);



document.getElementById("addBtn").addEventListener('click', CityMap.addCityByForm ,false);

/*window.addEventListener('load',function () {
    var downloadedList = JSON.parse(localStorage.getItem("CityMapList"));

    for(var k in downloadedList){

        if(!(k in CityMap.cityInfoStorage)){
            CityMap.cityInfoStorage[k] = downloadedList[k];
        }
    }

});*/

CityMap.drawPipePlot();

function showCitesListFromState() {

    var citesFromState = document.getElementById("cites_in_state");
    citesFromState.innerHTML = "";
    var selectedValue = document.getElementById("state_list").value;
    var searchedCities  = CityMap.searchByState(selectedValue);
    for (var i =0;i<searchedCities.length;i++){
        var cityItem = document.createElement("li");
        cityItem.textContent = searchedCities[i];
        citesFromState.appendChild(cityItem);
    }
}

document.getElementById("state_list").addEventListener("change",showCitesListFromState,false);


