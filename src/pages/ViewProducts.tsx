import React, {useEffect, useState} from 'react'
import { FetchProducts } from '../Services'

interface Animal{
    date: string,
    weight: number,
    registrationNumber: number,
    origin: string
}

interface Product{
    name: string,
    id: number,
    price: number,
    usedAnimals: Animal[]
}

export const ViewProducts:React.FC = () => {

    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        FetchProducts().then(res => {
            setProducts(res.data.products)
        }).catch(e => {
            console.log(e)
        })
    }, [])

  return (
    <div>
        {products.map((product: Product) => {
          return( 
             <div className='flex flex-row gap-4'>
                <p>{product.id}</p>
                <p>{product.name}</p>
                <p>{product.price}</p>
                {product.usedAnimals.map(animal => {
                    return(
                        <p>{animal.registrationNumber}</p>
                    )
                })}
            </div>
            )
        })}
    </div>
  )
}

export default ViewProducts