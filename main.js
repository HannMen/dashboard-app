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

// Función para obtener los datos de COVID-19 del país seleccionado y actualizar el gráfico
const updateChartData = (countrySlug, dataType) => {
  axios
    .get(
      `https://api.covid19api.com/country/${countrySlug}?from=2020-01-01T00:00:00Z&to=2022-05-01T00:00:00Z`
    )
    .then((response) => {
      const data = response.data;
      const labels = data.map((d) => d.Date.slice(0, 7));
      const values = data.map((d) => d[dataType]);
      chart.data.labels = labels;
      switch (dataType) {
        case "Confirmed":
          chart.data.datasets[0].data = values;
          break;
        case "Recovered":
          chart.data.datasets[1].data = values;
          break;
        case "Deaths":
          chart.data.datasets[2].data = values;
          break;
      }
      chart.update();
    })
    .catch((error) => console.log(error));
};

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

// Event listener para actualizar el gráfico cuando se selecciona un país
selectCountry.addEventListener("change", (event) => {
  const countrySlug = event.target.value;
  updateChartData(countrySlug, "Confirmed");
  if (event.target.value !== "") {
    defaultOption.disabled = true;
  }
});

// Event listeners para actualizar el gráfico según el botón presionado
confirmedBtn.addEventListener("click", () => {
  const countrySlug = selectCountry.value;
  updateChartData(countrySlug, "Confirmed");
});

recoveredBtn.addEventListener("click", () => {
  const countrySlug = selectCountry.value;
  updateChartData(countrySlug, "Recovered");
});

deathsBtn.addEventListener("click", () => {
  const countrySlug = selectCountry.value;
  updateChartData(countrySlug, "Deaths");
  });