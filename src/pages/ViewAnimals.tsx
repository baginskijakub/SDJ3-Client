import React, {useEffect, useState} from 'react'
import { FetchAnimals } from '../Services'

interface Animal{
    date: string,
    weight: number,
    registrationNumber: number,
    origin: string
}

export const ViewAnimals:React.FC = () => {

    const [animals, setAnimals] = useState<Animal[]>([])

    useEffect(() => {
        FetchAnimals().then(res => {
            setAnimals(res.data.animals)
        }).catch(e => {
            console.log(e)
        })
    }, [])

  return (
    <div>
        {animals.map((animal: Animal) => {
          return( 
             <div className='flex flex-row gap-4'>
                <p>{animal.date}</p>
                <p>{animal.weight}</p>
                <p>{animal.origin}</p>
                <p>{animal.registrationNumber}</p>
            </div>
            )
        })}
    </div>
  )
}

export default ViewAnimals