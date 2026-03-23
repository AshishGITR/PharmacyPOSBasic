import axios from "axios";

const API = axios.create({baseURL : "https://localhost:7187/api"});

export const getMedicines = () => API.get("/medicines");
export const getBatches = (medicineId :number) => API.get(`/medicines/batches/${medicineId}`);

export const createSale = (data : any) => API.post("/sales",data)