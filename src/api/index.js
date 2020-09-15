import fakeData from "../data";

export async function fetchExchangeRates() {
  // const response = await window.fetch(
  //   `https://openexchangerates.org/api/latest.json?app_id=fcdeb9aa38cd42feaa672605ceee7a5c`
  // );

  // if (response.ok) {
  //   return response.json();
  // } else {
  //   return Promise.reject(response);
  // }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fakeData);
    }, 1000);
  });
}
