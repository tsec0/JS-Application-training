async function getInfo() {
    // console.log("TODO...");
    const stopInfoElement = document.getElementById("stopId");
    const stopId = stopInfoElement.value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    const stopNameElement = document.getElementById("stopName");
    const bussList = document.getElementById("buses");

    bussList.innerHTML = ''; // for clearing previous output info
    stopId.vallue = "";

    try {
        const response = await fetch(url) // we receive promise
        const data = await response.json() // we receive promise

        stopNameElement.textContent = data.name;
        Object.entries(data.buses).forEach(([busNumber_key, time_value]) => {
            const li = document.createElement("li");
            li.textContent = `Bus ${busNumber_key} arrives in ${time_value} minutes`
            bussList.appendChild(li);
        });
    } catch (error){ // caught error
        stopNameElement.textContent = "Error";
    }
    //debugger;
}