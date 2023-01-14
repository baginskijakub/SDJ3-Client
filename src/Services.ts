import axios from "axios";

function RegisterAnimal(dto: Object): Promise<Object> {
  return axios.post("http://localhost:8080/animals", dto);
}

function FetchAnimals<Promise>() {
  return axios.get("http://localhost:8080/animals");
}

function RegisterProduct<Promise>(dto: Object) {
  return axios.post("http://localhost:8080/products", dto);
}

function FetchProducts<Promise>() {
  return axios.get("http://localhost:8080/products");
}

function DeleteProduct(id: number) {
  const url = `http://localhost:8080/products/${id}`;
  return axios.delete(url);
}

function DeleteAnimal(id: number) {
  const url = `http://localhost:8080/animals/${id}`;
  return axios.delete(url);
}

function FilterProductsByAnimalId(id: number) {
  return axios.get(`http://localhost:8080/products/animal/${id}`);
}

function FilterAnimalsByOrigin(origin: string) {
  return axios.get(`http://localhost:8080/animals?origin=${origin}`);
}

function FilterAnimalsByDate(date: string) {
  return axios.get(`http://localhost:8080/animals?date=${date}`);
}

function FetchAnimalsByProduct(id: number) {
  return axios.get(`http://localhost:8080/animals/product/${id}`);
}

export {
  RegisterAnimal,
  FetchAnimals,
  RegisterProduct,
  FetchProducts,
  DeleteProduct,
  FilterProductsByAnimalId,
  DeleteAnimal,
  FilterAnimalsByOrigin,
  FilterAnimalsByDate,
  FetchAnimalsByProduct,
};
