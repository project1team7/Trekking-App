function saveFavoriteTrail() {
    var getTrailId = event.target.id;
    var getTrailName = event.target.textContent;
    var getAddressId = "trail-address-" + getTrailId.split("-")[2];
    var getAddress = document.getElementById(getAddressId).textContent;
    console.log(getAddress)
    console.log("Clicked event", getTrailName, getAddress)

    var saveTrailsObj = {
        name: getTrailName,
        address: getAddress
    }

    var savedTrails = localStorage.getItem("trails");
    savedTrails = JSON.parse(savedTrails);

    if (!savedTrails) {
        savedTrails = [saveTrailsObj];
        localStorage.setItem("trails", JSON.stringify(savedTrails));
    } else {
        savedTrails.push(saveTrailsObj);
    }
    var savedTrailsMap = savedTrails.map(findObject => findObject.name);
    var savedTrailsFiltered = savedTrails.filter(({ name }, index) => !savedTrailsMap.includes(name, index + 1));
    localStorage.setItem("trails", JSON.stringify(savedTrailsFiltered));
    
}

function loadSavedTrailsToFavoritePage () {
   
    var savedTrails = localStorage.getItem("trails");
    savedTrails = JSON.parse(savedTrails);
    
    // document.getElementById("#favorite-trails").innerHTML = "test";


    for (trails in savedTrails) {
        var getElement = document.getElementById("favorite-trails")
        var createListElement = document.createElement("li");
        createListElement.className = "w-full px-4 py-2 border-b border-green-500 rounded-t-lg border-green-500";
        createListElement.innerHTML = savedTrails[trails].name + "<br>" + savedTrails[trails].address;
        getElement.appendChild(createListElement);

    }
}


