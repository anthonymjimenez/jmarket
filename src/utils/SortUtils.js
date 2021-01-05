const stockVals = ['latestPrice', 'dailyChangePercent', 'marketCap' ]

export const sortAlphaAsc = (val, stocks) => 
    stocks && stocks.sort((a, b) => {
      var nameA = a[val].toUpperCase(); // ignore upper and lowercase
      var nameB = b[val].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }

      // names must be equal
      return 0;
    });


 export const sortAlphaDesc = (val, stocks) => 
    stocks && stocks.sort((a, b) => {
      var nameA = a[val].toUpperCase(); // ignore upper and lowercase
      var nameB = b[val].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
export const sortNumAsc = (val, stocks) =>
    stockVals.includes(val) // make full list for compoment ['latestPrice', 'marketCap', 'etc] <= array could be a util 
      ? stocks.sort((a, b) => b[val] - a[val])
      : stocks.sort((a, b) => b.userData[val] - a.userData[val]);

  export const sortNumDesc = (val, stocks) =>
      stockVals.includes(val)
        ? stocks.sort((a, b) => a[val] - b[val])
        : stocks.sort((a, b) => a.userData[val] - b.userData[val]);