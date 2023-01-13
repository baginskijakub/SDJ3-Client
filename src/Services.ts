import axios from 'axios'

function RegisterAnimal<Promise>(dto: Object){
    return axios.post("", dto)
}

function FetchAnimals<Promise>(){
    return axios.get("") 
}

function RegisterProduct<Promise>(dto: Object){
    return axios.post("", dto)
}

function FetchProducts<Promise>(){
    return axios.get("") 
}

export {RegisterAnimal, FetchAnimals, RegisterProduct, FetchProducts}