const selectCountry = document.getElementById("select-country");
const selectTime = document.getElementById("select-time");
const myChart = document.getElementById("myChart");
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
        label: "",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

const loadCountries = () => {
  axios
    .get("https://api.covid19api.com/countries")
    .then((response) => {
      const countries = response.data;
      countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.Slug;
        option.text = country.Country;
        selectCountry.add(option);
      });
    })
    .catch((error) => {
      console.log(error);
      alert("Error fetching data");
    });
};

const updateChartData = (countrySlug, dataType, startDateString, endDateString) => {
  axios
    .get(
      `https://api.covid19api.com/dayone/country/${countrySlug}?from=${startDateString}T00:00:00Z&to=${endDateString}T00:00:00Z`
    )
    .then((response) => {
      const data = response.data;
      const labels = data.map((d) => d.Date.slice(0, 10));
      const values = data.map((d) => d[dataType]);
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

loadCountries();

selectCountry.addEventListener("change", () => {
  const countrySlug = selectCountry.value;
  const dataType = confirmedBtn.classList.contains("active")
    ? "Confirmed"
    : recoveredBtn.classList.contains("active")
    ? "Recovered"
    : "Deaths";
  updateChartData(countrySlug, dataType, startDateString, endDateString);
});

confirmedBtn.addEventListener("click", () => {
  confirmedBtn.classList.add("active");
  recoveredBtn.classList.remove("active");
  deathsBtn.classList.remove("active");
  const countrySlug = selectCountry.value;
  updateChartData(countrySlug, "Confirmed", startDateString, endDateString);
});

recoveredBtn.addEventListener("click", () => {
  const countrySlug = selectCountry.value;
  const dataType = "Recovered";
  updateChartData(countrySlug, dataType, startDateString, endDateString);
  });
  
  deathsBtn.addEventListener("click", () => {
  const countrySlug = selectCountry.value;
  const dataType = "Deaths";
  updateChartData(countrySlug, dataType, startDateString, endDateString);
  });
  
  loadCountries(); // load countries when page is loaded initially
