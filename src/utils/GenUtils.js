export const financial = (x) => Number.parseFloat(x).toFixed(2);

export const isoId = (prop) => prop.pathname.split("/").slice(-1)[0];

export const post = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteAction = {
  headers: {
    "Content-type": "application/json",
  },
  method: "DELETE",
};

export const put = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const checkResponse = (resp) => {
  console.log(resp)
    if(!resp.ok) { 
    throw new Error(resp.statusText)
    }
    return resp
}

export const url = "http://localhost:3000/api/v1/"

export const findUpComingStocks = (stocks) => 
  
stocks.sort((a,b) => a.marketCap - b.marketCap).slice(0,30)

export const findPopularStocks = (stocks) => {
  return stocks && stocks.sort((a,b) => b.marketCap - a.marketCap).slice(0,30)
}
export const findPopularTags = (stocks) => {
  let adminTags = (stocks && stocks.map(s => s.tags).flat().reduce(function (allNames, name) {
     if (name in allNames) {
       allNames[name]++
     }
     else {
       allNames[name] = 1
     }
     return allNames

   }, {}))
   
   var sortable = [];

   for (var tag in adminTags) {
       sortable.push([tag, adminTags[tag]])
   }

   sortable.sort((a,b) => b[1] - a[1])
   
   return sortable.slice(0, 17)
 }
 
 export const extractShuffle = (stocks, amount) => {
  return shuffle(stocks).slice(0,amount)
 }
export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}