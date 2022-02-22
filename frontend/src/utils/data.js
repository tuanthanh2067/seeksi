import { Country, State, City } from "country-state-city";

export let countryOptions = [];
let isoCodeList = [];
let stateCodeList = [];
let selectedCountryIsoCode;

State.getAllStates().map((state) => {
  stateCodeList.push({
    name: state.name,
    isoCode: state.isoCode,
  });
  return {};
});

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
  { value: "January", label: "Jan" },
  { value: "February", label: "Feb" },
  { value: "March", label: "Mar" },
  { value: "April", label: "Apr" },
  { value: "May", label: "May" },
  { value: "June", label: "Jun" },
  { value: "July", label: "Jul" },
  { value: "August", label: "Aug" },
  { value: "September", label: "Sept" },
  { value: "October", label: "Oct" },
  { value: "November", label: "Nov" },
  { value: "December", label: "Dec" },
];

export const generateDateOptions = () => {
  let date = [];
  for (let i = 1; i <= 31; i++) {
    date.push({
      value: i,
      label: i < 10 ? `0${i}` : i,
    });
  }
  return date;
};

export const generateYearOptions = () => {
  let year = [];
  for (let i = new Date().getFullYear() - 19; i >= 1900; i--) {
    year.push({
      value: i,
      label: i,
    });
  }
  return year;
};
