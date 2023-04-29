const loaderContainer = document.querySelector(".loader-container");
const canvasChart = document.getElementById("myChart");
const dateInterval = document.getElementById("dateInterval");
let myChart = null;
let dateStart = "2022-01-01";
let moneyData = {};

function showLoader() {
  loaderContainer.style.display = "flex";
}

function hideLoader() {
  loaderContainer.style.display = "none";
}

function renderChart() {
  myChart = new Chart(canvasChart, {
    type: "bar",
    data: {
      labels: Object.keys(moneyData.rates),
      datasets: [
        {
          label: "valor del Dolar",
          data: Object.values(moneyData.rates),
          backgroundColor: [
            "rgba(255, 90, 132, 0.2)",
            "rgba(34, 167, 240, 0.2)",
            "rgba(253, 203, 110, 0.2)",
            "rgba(45, 52, 54, 0.2)",
            "rgba(231, 76, 60, 0.2)",
            "rgba(26, 188, 156, 0.2)",
            "rgba(236, 240, 241, 0.2)",
            "rgba(155, 89, 182, 0.2)",
            "rgba(22, 160, 133, 0.2)",
            "rgba(243, 156, 18, 0.2)",
            "rgba(52, 73, 94, 0.2)",
            "rgba(46, 204, 113, 0.2)",
            "rgba(149, 165, 166, 0.2)",
            "rgba(241, 196, 15, 0.2)",
            "rgba(52, 152, 219, 0.2)",
            "rgba(211, 84, 0, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(191, 85, 236, 0.2)",
            "rgba(230, 126, 34, 0.2)",
            "rgba(142, 68, 173, 0.2)",
            "rgba(231, 76, 60, 0.2)",
            "rgba(243, 156, 18, 0.2)",
            "rgba(26, 188, 156, 0.2)",
          ],
          borderColor: [
            "rgba(255, 90, 132, 1.1)",
            "rgba(34, 167, 240, 1.1)",
            "rgba(253, 203, 110, 1.1)",
            "rgba(45, 52, 54, 1.1)",
            "rgba(231, 76, 60, 1.1)",
            "rgba(26, 188, 156, 1.1)",
            "rgba(236, 240, 241, 1.1)",
            "rgba(155, 89, 182, 1.1)",
            "rgba(22, 160, 133, 1.1)",
            "rgba(243, 156, 18, 1.1)",
            "rgba(52, 73, 94, 1.1)",
            "rgba(46, 204, 113, 1.1)",
            "rgba(149, 165, 166, 1.1)",
            "rgba(241, 196, 15, 1.1)",
            "rgba(52, 152, 219, 1.1)",
            "rgba(211, 84, 0, 1.1)",
            "rgba(255, 206, 86, 1.1)",
            "rgba(191, 85, 236, 1.1)",
            "rgba(230, 126, 34, 1.1)",
            "rgba(142, 68, 173,1.1)",
            "rgba(231, 76, 60, 1.1)",
            "rgba(243, 156, 18, 1.1)",
            "rgba(26, 188, 156, 1.1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
}

function filterRates() {
  Object.keys(moneyData.rates).forEach((rate) => {
    if (moneyData.rates[rate] > 23) {
      delete moneyData.rates[rate];
    }
  });
}

async function getMoney() {
  showLoader();

  const response = await axios.get(
    `https://api.frankfurter.app/${dateStart}?base=USD`
  );

  moneyData = response.data;

  filterRates();
  renderChart();
  hideLoader();
}

dateInterval.addEventListener("change", function (event) {
  dateStart = event.target.value;
  myChart.destroy();
  getMoney();
});

//Rutina principal
getMoney();
