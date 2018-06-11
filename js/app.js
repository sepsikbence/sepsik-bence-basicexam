function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  console.log(userDatas);

  sorted = novekvoAr(userDatas);
  torles = consumablesNulla(sorted);
  notNull = nemNulla(torles);
  drawUrhajo(torles);
  onePersonCrew(torles);
  cargoModel(torles);
  sumPass(torles);
  longestShip2(torles);
  createStats();



  function novekvoAr(arr) {
    arr.sort(function (a, b) {
      return a.cost_in_credits - b.cost_in_credits;
    });
    return arr;
  }
}

function consumablesNulla(arr) {
  for (var i = arr.length - 1; i >= 0; --i) {
    if (arr[i].consumables == null) {
      arr.splice(i, 1);
    }
  }
  return arr;
}

function nemNulla(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j in arr[i]) {
      if (arr[i][j] === null) {
        arr[i][j] = "unknown";
      }
    }
  }
  return arr;
}

function Urhajok(obj, containerPanel) {
  var objThumbnail = document.createElement("div");
  var objPicDiv = document.createElement("div");
  var objPic = document.createElement("img");
  var objDetails = document.createElement("div");
  var objConsumables = document.createElement("div");
  var objDNev = document.createElement("div");
  var objCargo = document.createElement("div");
  var objPas = document.createElement("div");
  var objSpeed = document.createElement("div");
  var objCrew = document.createElement("div");
  var objLength = document.createElement("div");
  var objModel = document.createElement("div");
  var objCost = document.createElement("div");
  var objGyar = document.createElement("div");



  objThumbnail.setAttribute("id", obj.id)
  objThumbnail.classList.add("thumbnail");
  objThumbnail.appendChild(objPicDiv);
  objPicDiv.appendChild(objPic);
  objThumbnail.appendChild(objDetails);
  objPicDiv.classList.add('objPic');
  objPic.setAttribute("src", "/img/" + obj.image);
  objPic.setAttribute("alt", " Nincs kép!");
  objDetails.classList.add("objDetails");
  objDetails.appendChild(objModel);
  objModel.innerText = obj.model;
  objModel.classList.add("model");
  objDetails.appendChild(objGyar);
  objGyar.innerText = "Manufacturer: " + obj.manufacturer;
  objGyar.classList.add("detailDiv");
  objDetails.appendChild(objConsumables);
  objConsumables.innerText = "Consumalbles: " + obj.consumables;
  objConsumables.classList.add("detailDiv");
  objDetails.appendChild(objDNev);
  objDNev.innerText = "Denomination: " + obj.denomination;
  objDNev.classList.add("detailDiv");
  objDetails.appendChild(objCargo);
  objCargo.innerText = "Cargo capacity: " + obj.cargo_capacity;
  objCargo.classList.add("detailDiv");
  objDetails.appendChild(objPas);
  objPas.innerText = "Passengers: " + obj.passengers;
  objPas.classList.add("detailDiv");
  objDetails.appendChild(objSpeed);
  objSpeed.innerText = "Maximum speed: " + obj.max_atmosphering_speed;
  objSpeed.classList.add("detailDiv");
  objDetails.appendChild(objCrew);
  objCrew.innerText = "Crew: " + obj.crew;
  objCrew.classList.add("detailDiv");
  objDetails.appendChild(objLength);
  objLength.innerText = "Length: " + obj.lengthiness;
  objLength.classList.add("detailDiv");
  objDetails.appendChild(objCost);
  objCost.innerText = "Cost in credits: " + obj.cost_in_credits;
  objCost.classList.add("detailDiv");
  containerPanel.appendChild(objThumbnail);
}

function drawUrhajo(array) {
  var targetPanel = document.querySelector(".shapceship-list");
  //targetPanel.innerText = "";
  for (var i = 0; i < array.length; i++) {
    Urhajok(array[i], targetPanel);
  }
}

function createStats() {
  var statsDiv = document.createElement("div");
  var oneCrew = document.createElement("div");
  var cargoName = document.createElement("div");
  var osszUtas = document.createElement("div");
  var leghosszabb = document.createElement("div");
  var leghosszabbPic = document.createElement("img");
  var statsContainer = document.querySelector(".shapceship-list");

  statsContainer.appendChild(statsDiv);
  statsDiv.appendChild(oneCrew);
  oneCrew.innerText = "Egyfős legénységgel rendelkező hajók darabszáma: " + egyeduli;
  statsDiv.appendChild(cargoName);
  cargoName.innerText = "A legnagyobb cargo_capacity-vel rendelkező hajó neve: " + legnagyobbCargo;
  statsDiv.appendChild(osszUtas);
  osszUtas.innerText = "Az összes hajó utasainak száma: " + passengersSum;
  statsDiv.appendChild(leghosszabb);
  leghosszabb.innerText = "A leghosszabb hajó képe: ";
  leghosszabb.appendChild(leghosszabbPic);
  leghosszabbPic.setAttribute("src", "/img/" + longShip.image);
}







var egyeduli = 0;

function onePersonCrew(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].crew == "1") {
      egyeduli++;
    }
  }
}

var legnagyobbCargo = 0;

function cargoModel(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].cargo_capacity > legnagyobbCargo) {
      legnagyobbCargo = arr[i].model;
    }
  }
}

var passengersSum = 0;

function sumPass(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].passengers !== "unknown") {
      passengersSum += Number(arr[i].passengers);
    }
  }
}

var longShip;

function longestShip2(arr) {
  for (var i = 0; i < arr.length; i++) {
    var longest = arr[0];
    if (Number(arr[i].lengthiness) > Number(longest.lengthiness)) {
      longest = arr[i];
    }
  }
  longShip = longest;
}

var searchText = document.querySelector("#search-text");
var SearchButton = document.querySelector("#search-button");
//objSearchButton.addEventListener("click", kereses, false);

function kereses() {
  var sender = event.target;
  var filter = searchInput.value;
  result = [];

  for (var i = 0; i < alive.length; i++) {
    if (
      alive[i].name.toLowerCase().indexOf(filter.toLowerCase()) !=
      -1
    ) {
      result.push(alive[i]);
    }
  }
  if (result.length > 0) {
    drawCharacters(result);
  } else {
    alert("Nem találom!");
  }


}
getData('/json/spaceships.json', successAjax);