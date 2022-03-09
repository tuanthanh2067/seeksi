import { Country, State, City } from "country-state-city";

export const countryOptions = Country.getAllCountries().map((country) => {
  return {
    value: country.name,
    label: country.name,
  };
});
const isoCodeList = Country.getAllCountries().map((country) => {
  return {
    name: country.name,
    isoCode: country.isoCode,
  };
});
const stateCodeList = State.getAllStates().map((state) => {
  return {
    name: state.name,
    isoCode: state.isoCode,
  };
});
let selectedCountryIsoCode;

Country.getAllCountries().map((country) => {
  countryOptions.push({
    value: country.name,
    label: country.name,
  });
  isoCodeList.push({
    name: country.name,
    isoCode: country.isoCode,
  });
  return {};
});

export const filterStateBySelectedCountry = (selectedCountry) => {
  let isoCode = isoCodeList.filter((obj) => obj.name === selectedCountry);
  let stateOptions = [];
  if (isoCode.length > 0) {
    selectedCountryIsoCode = isoCode[0].isoCode;
    State.getAllStates().map((state) => {
      if (state.countryCode === selectedCountryIsoCode) {
        stateOptions.push({
          value: state.name,
          label: state.name,
        });
      }
      return {};
    });
    return stateOptions;
  }
};

export const filterCity = (selectedState, selectedCountry) => {
  let cityOptions = [];
  if (selectedState) {
    let isoCode = stateCodeList.filter((obj) => obj.name === selectedState);
    if (isoCode.length > 0) {
      City.getAllCities().map((city) => {
        if (
          city.stateCode === isoCode[0].isoCode &&
          city.countryCode === selectedCountryIsoCode
        ) {
          cityOptions.push({
            value: city.name,
            label: city.name,
          });
        }
        return {};
      });
    }
  } else {
    let isoCode = isoCodeList.filter((obj) => obj.name === selectedCountry);
    if (isoCode.length > 0) {
      selectedCountryIsoCode = isoCode[0].isoCode;
      City.getAllCities().map((city) => {
        if (city.countryCode === selectedCountryIsoCode) {
          cityOptions.push({
            value: city.name,
            label: city.name,
          });
        }
        return {};
      });
    }
  }
  return cityOptions;
};

export const monthOptions = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

export const generateDateOptions = (month) => {
  let totalDays = 30;
  let maxDays = [
    "January",
    "March",
    "May",
    "July",
    "August",
    "October",
    "December",
  ];
  if (maxDays.includes(month)) {
    totalDays = 31;
  } else if (month === "February") {
    totalDays = 29;
  }

  let date = [];
  for (let i = 1; i <= totalDays; i++) {
    date.push({
      value: i,
      label: i,
    });
  }
  return date;
};

export const generateYearOptions = () => {
  let year = [];
  for (let i = new Date().getFullYear() - 19; i >= 1940; i--) {
    year.push({
      value: i,
      label: i,
    });
  }
  return year;
};
