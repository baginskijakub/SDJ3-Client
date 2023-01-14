import React, { useEffect, useRef, useState } from "react";
import {
  FetchProducts,
  DeleteProduct,
  FilterProductsByAnimalId,
} from "../Services";

interface Animal {
  date: string;
  weight: number;
  registrationNumber: number;
  origin: string;
}

interface Product {
  name: string;
  id: number;
  price: number;
  usedAnimals: Animal[];
}

export const ViewProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [animalFilterId, setAnimalFilterId] = useState<number>(0);

  useEffect(() => {
    FetchProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const deleteProduct = async (id: number) => {
    await DeleteProduct(id);
    setProducts(products.filter((product) => product.id != id));
  };

  return (
    <>
      <div className="flex gap-2 mb-5">
        <p>Enter animal id</p>
        <input
          type="text"
          value={animalFilterId}
          className="border-green-400 border"
          onChange={(e) => setAnimalFilterId(parseInt(e.target.value))}
        ></input>
        <button
          className="bg-green-500 rounded p-1"
          onClick={() => {
            if (!isNaN(animalFilterId)) {
              FilterProductsByAnimalId(animalFilterId)
                .then((res) => {
                  setProducts(res.data);
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          }}
        >
          Filter products
        </button>
        <button
          className="rounded  bg-red-400 p-1"
          onClick={() =>
            FetchProducts()
              .then((res) => {
                setProducts(res.data);
                setAnimalFilterId(0);
              })
              .catch((e) => {
                console.log(e);
              })
          }
        >
          Reset filter
        </button>
      </div>
      <div>
        {products.map((product: Product) => {
          return (
            <div key={product.id} className="flex flex-row gap-4">
              <p>{product.id}</p>
              <p>{product.name}</p>
              <p>{product.price}</p>
              {product.usedAnimals.map((animal) => {
                return (
                  <p key={animal.registrationNumber}>
                    {animal.registrationNumber}
                  </p>
                );
              })}
              <a href={`http://localhost:8080/products/${product.id}`}>
                See details
              </a>
              <button onClick={() => deleteProduct(product.id)}>X</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ViewProducts;
