// Obtener la referencia a los elementos del DOM
const selectCountry = document.getElementById("select-country");
const myChart = document.getElementById("myChart");
const confirmedBtn = document.getElementById("confirmed-btn");
const recoveredBtn = document.getElementById("recovered-btn");
const deathsBtn = document.getElementById("deaths-btn");
const defaultOption = document.createElement("option");
defaultOption.text = "Selecciona un país de la lista";
defaultOption.disabled = true;
defaultOption.selected = true;
selectCountry.add(defaultOption);

// Configuración inicial del gráfico
const chart = new Chart(myChart, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Confirmados",
        data: [],
        borderColor: "#007bff",
        fill: false,
      },
      {
        label: "Recuperados",
        data: [],
        borderColor: "#6c757d",
        fill: false,
      },
      {
        label: "Fallecidos",
        data: [],
        borderColor: "#dc3545",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});

// Obtener la lista de países y agregarlos al menú desplegable
axios
  .get("https://api.covid19api.com/countries")
  .then((response) => {
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
function updateChartData(countrySlug, dataType) {
  axios
    .get(
      `https://api.covid19api.com/total/dayone/country/${countrySlug}/status/${dataType}`
    )
    .then((response) => {
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
    })
    .catch((error) => console.log(error));
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
