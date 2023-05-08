const loadCountries = (selectCountry) => {
  axios

    .get("https://corona.lmao.ninja/v2/countries?yesterday&sort")

    .then((response) => {
      const countries = response.data;

      countries.forEach((country) => {
        const option = document.createElement("option");

        option.value = country.countryInfo.iso3;

        option.text = country.country;

        selectCountry.add(option);
      });
    })

    .catch((error) => {
      console.log(error);

      alert("Error fetching data");
    });
};

export default loadCountries;
