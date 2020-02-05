"use strict"

function CityNameStorage(cityListStr) {

    var self = this;

    self.cityInfoStorage = {};

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

    var cityList = Object.keys(self.cityInfoStorage);
    let states = [];
    let latitudes = [];//широта
    let longitudes  = [];//долгота(вдоль экватора)


    console.log(cityList,latitudes,longitudes,states);


    for(var i = 0;i < cityList.length;i++){
        states[i] = (self.cityInfoStorage[cityList[i]][0]).trim();
        latitudes[i] = Number(self.cityInfoStorage[cityList[i]][1]);
        longitudes[i] =  Number(self.cityInfoStorage[cityList[i]][2]);
    }

    //аргументом к методу передаем направление n/s/e/w/
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
    }

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
    }

    self.stateList = function () {
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

        return (uniq(states)).join(' ');
    }

    //аргументом к методу передаем две буквы абревиатура штата прим : "NY"
    self.searchByState = function (stateName) {

        var desiredState = (stateName.toUpperCase()).trim();
        var cityListFromState = [];

       for (var i =0;i<states.length;i++) {
           if(desiredState === states[i]){
               cityListFromState.push(cityList[i]) ;
           }
       }

       if(cityListFromState.length === 0||cityListFromState.length === undefined){
           return `1)The list of cities does not contain the city located in this state;\n 2) The state name does not exist;\n 3) The argument for this method is entered incorrectly(example:\"NY\")`;
       }
       return cityListFromState;
    }

    self.addCityByForm = function () {

        var formObj = document.forms.addCity;


        var formCityName = formObj.elements.form_cityName.value;
        var formState = formObj.elements.form_state.value;
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

        }else {
            if(!formCityName){document.getElementById("cityName_err").textContent = "Required field"}
            if(!formState){document.getElementById("state_err").textContent = "Required field"}
            if(!formLatitude){document.getElementById("latitude_err").textContent = "Required field"}
            if(!formLongitude){document.getElementById("longitude_err").textContent = "Required field"}
        }


    }

    self.savingListAtLockStorage = function () {

        localStorage.setItem("CityMapList",JSON.stringify(self.cityInfoStorage));
        
    }

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

window.addEventListener('load',function () {
    var downloadedList = JSON.parse(localStorage.getItem("CityMapList"));
    console.log(localStorage.getItem("CityMapList"));

    for(var k in downloadedList){

        if(!(k in CityMap.cityInfoStorage)){
            CityMap.cityInfoStorage[k] = downloadedList[k];
        }
    }
});

