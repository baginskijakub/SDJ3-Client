import React, {useState, useEffect} from 'react'
import {FetchAnimals, RegisterProduct} from "../Services"


interface ProductDto{
    name: string,
    id: number,
    price: number,
    animalsIds: number[]
}

export const CreateProduct:React.FC = () => {
    const [animals, setAnimals] = useState<string[]>([]);
    const[dto, setDto] = useState<ProductDto>()

    const [selectedAnimals, setSelectedAnimals] = useState<string[]>([])
    const[name, setName] = useState<string>("");
    const[price, setPrice] = useState<number>(0)

    // useEffect(() => {
    //     FetchAnimals().then( (res:any) => {
    //         res.data.animals.forEach((animal:any) => {
    //             animals.push(animal.id)
    //         })
    //     }
    //     ).catch((e) => {
    //         console.log(e)
    //     })
    // }, [])

    function handleCheckbox(e:any){
        selectedAnimals.push(e.target.value)
    }

    function OnSubmit(){
        if(dto != undefined){
            RegisterProduct(dto)
        }
        else{
            console.log("Error has occurred")
        }

    }


    const inputStyle:string = "border-zinc-600 border-2";

  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
        <h1>Register product</h1>
        <input type="text" className={inputStyle} value={dto?.name} onChange={(e) => setName(e.target.value)}></input>
        <input type="number" className={inputStyle} value={dto?.price} onChange={(e) => setPrice(parseInt(e.target.value))}></input>
        <div>
            {animals.map(animal => {
                return ( 
                        <input type="checkbox" value={animal} onClick={(e) => handleCheckbox(e)}/>
                )
            })}

        </div>
        <button className="bg-slate-400 w-40" onClick={OnSubmit}>Submit</button>
    </div>
  )
}

export default CreateProduct