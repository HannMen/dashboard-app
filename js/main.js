<<<<<<< HEAD
// Obtener la referencia a los elementos del DOM
const selectCountry = document.getElementById("select-country");
const myChart = document.getElementById("myChart");
=======
import loadCountries from "./loadCountries.js";

const selectCountry = document.getElementById("select-country");
const selectTime = document.getElementById("select-time");
>>>>>>> sebastian
const confirmedBtn = document.getElementById("confirmed-btn");
const recoveredBtn = document.getElementById("recovered-btn");
const deathsBtn = document.getElementById("deaths-btn");
const defaultOption = document.createElement("option");
<<<<<<< HEAD
=======
const currentDate = new Date();
const startDateString = "2020-01-01";
const endDateString = currentDate.toISOString().slice(0, 10);

>>>>>>> sebastian
defaultOption.text = "Selecciona un país de la lista";
defaultOption.disabled = true;
defaultOption.selected = true;
selectCountry.add(defaultOption);
<<<<<<< HEAD
// import { loadCountries, updateChartData } from "./covid.js";


// Configuración inicial del gráfico
const chart = new Chart(myChart, {
  type: "line",
  data: {
    labels: ['2020', '2021', '2022', '2023'],
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
=======

const chart = new Chart(document.getElementById("myChart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
>>>>>>> sebastian
        fill: false,
      },
    ],
  },
  options: {
<<<<<<< HEAD
    responsive: true,
    maintainAspectRatio: false,
  },
});

// // Obtener la lista de países y agregarlos al menú desplegable
axios
  .get("https://corona.lmao.ninja/v2/countries?yesterday&sort")
  .then(async (response) => {
    const countries = response.data;
    countries.sort((a, b) => (a.Country > b.Country ? 1 : -1));
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.Slug;
      option.textContent = country.Country;
      selectCountry.appendChild(option);
    });
  })
  .catch((error) => console.log(error));


// Función para obtener los datos de COVID-19 del país seleccionado y actualizar el gráfico
async function updateChartData(countrySlug, dataType) {
  try {
    const response = await axios.get(`https://corona.lmao.ninja/v2/historical/${countryCode}?start_date=${startDateString}&end_date=${endDateString}`);
    const data = response.data;
    const labels = data.map((d) => d.Date);
    const values = data.map((d) => d.Cases || d.Recovered || d.Deaths);
    chart.data.labels = labels;
    switch (dataType) {
      case "confirmed":
        chart.data.datasets[0].data = values;
        break;
      case "recovered":
        chart.data.datasets[1].data = values;
        break;
      case "deaths":
        chart.data.datasets[2].data = values;
        break;
    }
    chart.update();
  } catch (error) {
    console.log(error);
  }
}

// Event listener para actualizar el gráfico cuando se selecciona un país
selectCountry.addEventListener("change", (event) => {
  const countrySlug = event.target.value;
  updateChartData(countrySlug, "confirmed");
  if (event.target.value !== "") {
    defaultOption.disabled = true;
  }
});

// Event listeners para actualizar el gráfico según el botón presionado
confirmedBtn.addEventListener("click", () => {
  const countrySlug = selectCountry.value;
  updateChartData(countrySlug, "confirmed");
});

recoveredBtn.addEventListener("click", () => {
  const countrySlug = selectCountry.value;
  updateChartData(countrySlug, "recovered");
});

deathsBtn.addEventListener("click", () => {
  const countrySlug = selectCountry.value;
  updateChartData(countrySlug, "deaths");
});

// loadCountries();

=======
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100
        }
      }]
    }
  }
  ,
});

const updateChartData = (countryCode, dataType, startDateString, endDateString) => {
  axios
    .get(
      `https://corona.lmao.ninja/v2/historical/${countryCode}?start_date=${startDateString}&end_date=${endDateString}`
    )
    .then((response) => {
      const data = response.data.timeline[dataType];
      const labels = Object.keys(data);
      const values = Object.values(data);
      chart.data.labels = labels;
      chart.data.datasets[0].label = dataType;
      chart.data.datasets[0].data = values;
      chart.update();
    })
    .catch((error) => {
      console.log(error);
      alert("Error fetching data");
    });
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
>>>>>>> sebastian
