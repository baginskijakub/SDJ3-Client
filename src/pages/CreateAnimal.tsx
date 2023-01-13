import React, {useState, useEffect} from 'react'
import {RegisterAnimal} from "../Services"


interface  AnimalDto{
    date: string,
    weight: number,
    registrationNumber: number,
    origin: string,
    productId: number
}

export const CreateAnimal:React.FC = () => {
    const[animalDto, setAnimalDto] = useState<AnimalDto>()
    const[date, setDate] = useState<string>("")
    const[weight, setWeight] = useState<number>(0)
    const[regNo, setRegNo] = useState<number>(0)
    const[origin, setOrigin] = useState<string>("")

    useEffect(() => {
        setAnimalDto({
            date: date,
            weight: weight,
            registrationNumber: regNo,
            origin: origin,
            productId: 0
        })
    }, [date, weight, regNo, origin])

    function OnSubmit(){
        if(animalDto != undefined){
            RegisterAnimal(animalDto)
        }
        else{
            console.log("Error has occurred")
        }

    }

    const inputStyle:string = "border-zinc-600 border-2"

  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
        <h1>Register animal</h1>
        <p>Data(DD/MM/YYYY)</p>
        <input type="text" className={inputStyle} value={animalDto?.date} onChange={(e) => setDate(e.target.value)}></input>
        <p>Weight(kg)</p>
        <input type="number" className={inputStyle} value={animalDto?.weight} onChange={(e) => setWeight(parseInt((e.target.value)))}></input>
        <p>Registration number</p>
        <input type="number" className={inputStyle} value={animalDto?.registrationNumber} onChange={(e) => setRegNo(parseInt((e.target.value)))}></input>
        <p>Origin</p>
        <input type="text" className={inputStyle} value={animalDto?.origin} onChange={(e) => setOrigin(e.target.value)}></input>
        <button className="bg-slate-400 w-40" onClick={OnSubmit}>Submit</button>

    </div>
  )
}



export default CreateAnimal