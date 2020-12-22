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