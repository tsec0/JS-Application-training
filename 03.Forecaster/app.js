const enumIcon = {
    "Sunny": "&#x2600",
    "Partly sunny": "&#x26C5",
    "Overcast": "&#x2601",
    "Rain": "&#x2614",
    "Degrees": "&#176",
}

function attachEvents() {
    //console.log("TODO...");
    document.getElementById('submit').addEventListener('click', getWeather);
}

async function getWeather() {
    const url = "http://localhost:3030/jsonstore/forecaster/locations";
    const townName = document.getElementById("location").value;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const info = data.find(town => town.name === townName);

        if(!info){
            return 
        }
        createForecaster(info.code);
    } catch (error) {
        forecastContainer.textContent = "Error";
        forecastContainer.style.display = 'block';
    }
}

async function createForecaster(code) {
    const currentSection = document.getElementById("current");
    const forecastContainer = document.getElementById("forecast");
    const upcomingContainer = document.getElementById("upcoming");
    // const forecastSection = document.querySelector("#forecast");

    const urlToday = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
    const urlUpcoming = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

    //TODO use promise.all
    try {
        cosnt [responseToday, responseUpcoming] = Promise.all([
            fetch(urlToday),
            fetch(urlUpcoming)
        ]);

        // const responseToday = await fetch(urlToday);
        const dataToday = await responseToday.json();

        // const responseUpcoming = await fetch(urlUpcoming);
        const dataUpcoming = await responseUpcoming.json();

        const todayHTMLTemp = createToday(dataToday);
        currentSection.appendChild(todayHTMLTemp);

        const upcomingHTMLTemp = createUpcoming(dataUpcoming);
        upcomingContainer.appendChild(upcomingHTMLTemp);

        forecastContainer.style.display = 'block';
    } catch (error) {
        forecastContainer.textContent = "Error";
        forecastContainer.style.display = 'block';
    }
}

function createToday(data) {
    const { condition, high, low } = data.forecast; // destructuring

    // Creating HTML Tree;
    const conditionContainer = document.createElement("div");
    conditionContainer.classList.add('forecasts');

    const condIconSpan = document.createElement("span");
    condIconSpan.classList.add("condition", "symbol");
    condIconSpan.innerHTML = enumIcon[condition];

    const conditionSpan = document.createElement("span");
    conditionSpan.classList.add("condition");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("forecast-data");
    nameSpan.textContent = data.name;

    const tempSpan = document.createElement("span");
    tempSpan.classList.add("forecast-data");
    tempSpan.innerHTML = `${low}${enumIcon["Degrees"]}/${high}${enumIcon["Degrees"]}`;

    const conditionTxtSpan = document.createElement("span");
    conditionTxtSpan.classList.add("forecast-data");
    conditionTxtSpan.textContent = condition;

    // adding elements to HTML tree
    conditionSpan.appendChild(nameSpan);
    conditionSpan.appendChild(tempSpan);
    conditionSpan.appendChild(conditionTxtSpan);

    conditionContainer.appendChild(condIconSpan);
    conditionContainer.appendChild(conditionSpan);

    return conditionContainer;
}

function createUpcoming(data) {
    const containerUpcoming = document.createElement("div");
    containerUpcoming.classList.add('forecast-info');

    data.forecast.forEach(data => {
        const spanHolder = generateSpans(data);
        containerUpcoming.appendChild(spanHolder)
    });

    return containerUpcoming;
}

function generateSpans(data) {
    const { condition, high, low } = data; // destructuring

    const condUpcomSpan = document.createElement("span");
    condUpcomSpan.classList.add("upcoming");

    const iconSpan = document.createElement("span");
    iconSpan.classList.add("symbol");
    iconSpan.innerHTML = enumIcon[condition];

    const tempSpan = document.createElement("span");
    tempSpan.classList.add("forecast-data");
    tempSpan.innerHTML = `${low}${enumIcon["Degrees"]}/${high}${enumIcon["Degrees"]}`;

    const conditionTxtSpan = document.createElement("span");
    conditionTxtSpan.classList.add("forecast-data");
    conditionTxtSpan.textContent = condition;

    condUpcomSpan.appendChild(iconSpan);
    condUpcomSpan.appendChild(tempSpan);
    condUpcomSpan.appendChild(conditionTxtSpan);

    return condUpcomSpan;
}

attachEvents();