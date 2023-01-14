import React, { useState, useEffect } from "react";
import { FetchAnimals, RegisterProduct } from "../Services";

interface ProductDto {
  name: string;
  price: number;
  animalsIds: number[];
}

export const CreateProduct: React.FC = () => {
  const [animals, setAnimals] = useState<number[]>([]);
  const [dto, setDto] = useState<ProductDto | undefined>(undefined);

  const [selectedAnimals, setSelectedAnimals] = useState<number[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    FetchAnimals()
      .then((res: any) => {
        const temp: number[] = [];
        res.data.forEach((animal: any) => {
          temp.push(animal.registrationNumber);
        });
        setAnimals(temp);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setDto({
      name: name,
      price: price,
      animalsIds: selectedAnimals,
    });
  }, [name, price, selectedAnimals]);

  function handleCheckbox(e: any) {
    setSelectedAnimals([...selectedAnimals, e.target.value]);
  }

  function OnSubmit() {
    if (dto != undefined) {
      RegisterProduct(dto);
    } else {
      console.log("Error has occurred");
    }
  }

  const inputStyle: string = "border-zinc-600 border-2";

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>Register product</h1>
      <p>Name</p>
      <input
        type="text"
        className={inputStyle}
        value={dto?.name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <p>Price</p>
      <input
        type="text"
        className={inputStyle}
        value={dto?.price}
        onChange={(e) => setPrice(parseInt(e.target.value))}
      ></input>
      <div>
        {animals.map((animal) => {
          return (
            <>
              <label key={animal}>{animal}</label>
              <input
                type="checkbox"
                key={animal}
                value={animal}
                onClick={(e) => handleCheckbox(e)}
              />
            </>
          );
        })}
      </div>
      <button className="bg-slate-400 w-40" onClick={OnSubmit}>
        Submit
      </button>
    </div>
  );
};

export default CreateProduct;
