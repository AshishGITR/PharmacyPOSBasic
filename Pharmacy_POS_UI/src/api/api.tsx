import axios from "axios";

const baseLocalURL = import.meta.env.VITE_BASE_LOCAL_URL;
const renderHostURL = import.meta.env.VITE_RENDER_HOST_URL;
const environment = import.meta.env.VITE_ENVIRONMENT;


const isDevelopemnt = environment === "DEV" ? renderHostURL : baseLocalURL
const API = axios.create({baseURL : isDevelopemnt});
console.log(API);


export const getMedicines = () => API.get("api/medicines");
export const getBatches = (medicineId :number) => API.get(`api/medicines/batches/${medicineId}`);

export const createSale = (data : any) => API.post("api/sales",data)