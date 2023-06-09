import loadCountries from "./loadCountries.js";

const selectCountry = document.getElementById("select-country");
const selectTime = document.getElementById("select-time");
const confirmedBtn = document.getElementById("confirmed-btn");
const recoveredBtn = document.getElementById("recovered-btn");
const deathsBtn = document.getElementById("deaths-btn");
const defaultOption = document.createElement("option");
const currentDate = new Date();
const startDateString = "2020-01-01";
const endDateString = currentDate.toISOString().slice(0, 10);

defaultOption.text = "Selecciona un país de la lista";
defaultOption.disabled = true;
defaultOption.selected = true;
selectCountry.add(defaultOption);

const chart = new Chart(document.getElementById("myChart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Confirmados",
        data: [],
        backgroundColor: "#007bff",
        fill: false,
      },
      {
        label: "Recuperados",
        data: [],
        backgroundColor: "#297e46",
        fill: false,
      },
      {
        label: "Fallecidos",
        data: [],
        backgroundColor: "#dc3545",
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 100,
          },
        },
      ],
    },
  },
});

const updateChartData = async (
  countryCode,
  dataType,
  startDateString,
  endDateString
) => { try {
  const response = await axios
    .get(
      `https://corona.lmao.ninja/v2/historical/${countryCode}?start_date=${startDateString}&end_date=${endDateString}`
    )
    .then((response) => {
      const data = response.data.timeline[dataType];
      if (data) {
        const labels = Object.keys(data);
        const values = Object.values(data);
        chart.data.labels = labels;
        chart.data.datasets[0].label = dataType;
        chart.data.datasets[0].data = values;
        chart.update();
      } else {
        console.log("Data not available");
      }
    })
  } catch (error) {
    console.log(error);
    alert("Error fetching data");
  }
};

selectCountry.addEventListener("change", () => {
  const countryCode = selectCountry.value;
  const dataType = selectTime.value;
  updateChartData(countryCode, dataType, startDateString, endDateString);
});

selectTime.addEventListener("change", () => {
  const countryCode = selectCountry.value;
  const dataType = selectTime.value;
  updateChartData(countryCode, dataType, startDateString, endDateString);
});

confirmedBtn.addEventListener("click", () => {
  const countryCode = selectCountry.value;
  updateChartData(countryCode, "cases", startDateString, endDateString);
});

recoveredBtn.addEventListener("click", () => {
  const countryCode = selectCountry.value;
  updateChartData(countryCode, "recovered", startDateString, endDateString);
});

deathsBtn.addEventListener("click", () => {
  const countryCode = selectCountry.value;
  updateChartData(countryCode, "deaths", startDateString, endDateString);
});

loadCountries(selectCountry);
