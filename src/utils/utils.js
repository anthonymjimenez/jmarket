export const financial = (x) => Number.parseFloat(x).toFixed(2);

export const isoId = (prop) => prop.pathname.split("/").slice(-1)[0];