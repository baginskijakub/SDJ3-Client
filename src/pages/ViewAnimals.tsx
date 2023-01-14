import React, { useEffect, useState } from "react";
import {
  FetchAnimals,
  DeleteAnimal,
  FilterAnimalsByDate,
  FilterAnimalsByOrigin,
  FetchAnimalsByProduct,
} from "../Services";

interface Animal {
  date: string;
  weight: number;
  registrationNumber: number;
  origin: string;
}

export const ViewAnimals: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [originFilter, setOriginFilter] = useState<string | undefined>(
    undefined
  );
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
  const [productId, setProductId] = useState<number | undefined>(undefined);
  const [animalsIds, setAnimalsIds] = useState<number[]>([]);

  useEffect(() => {
    FetchAnimals()
      .then((res) => {
        setAnimals(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (productId != undefined) {
      FetchAnimalsByProduct(productId)
        .then((res) => {
          setAnimalsIds(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [productId]);

  const deleteAnimal = async (id: number) => {
    await DeleteAnimal(id);
    setAnimals(animals.filter((animal) => animal.registrationNumber != id));
  };

  return (
    <>
      <p>Filters:</p>
      <div className="flex gap-2 mb-5">
        <p>Origin filter</p>
        <input
          type="text"
          value={originFilter}
          className="border-green-400 border"
          onChange={(e) => setOriginFilter(e.target.value)}
        ></input>
        <p>Date filter</p>
        <input
          type="text"
          value={dateFilter}
          className="border-green-400 border"
          onChange={(e) => setDateFilter(e.target.value)}
        ></input>
        <button
          className="bg-green-500 rounded p-1"
          onClick={() => {
            if (originFilter != undefined && originFilter != "") {
              FilterAnimalsByOrigin(originFilter)
                .then((res) => {
                  setAnimals(res.data);
                })
                .catch((e) => {
                  console.log(e);
                });
            } else if (dateFilter != undefined && dateFilter != "") {
              FilterAnimalsByDate(dateFilter)
                .then((res) => {
                  setAnimals(res.data);
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          }}
        >
          Filter animals
        </button>
        <button
          className="rounded  bg-red-400 p-1"
          onClick={() =>
            FetchAnimals()
              .then((res) => {
                setAnimals(res.data);
                setDateFilter("");
                setOriginFilter("");
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
        {animals.map((animal: Animal) => {
          return (
            <div
              key={animal.registrationNumber}
              className="flex flex-row gap-4"
            >
              <p>{animal.date}</p>
              <p>{animal.weight}</p>
              <p>{animal.origin}</p>
              <p>{animal.registrationNumber}</p>
              <a
                href={`http://localhost:8080/animals/${animal.registrationNumber}`}
              >
                See details
              </a>
              <button onClick={() => deleteAnimal(animal.registrationNumber)}>
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <p>
          See all the registrations numbers of animals included in the product
          (write id of product below)
        </p>
        <input
          type="text"
          className="border border-red-500"
          value={productId == undefined || isNaN(productId) ? "" : productId}
          onChange={(e) => setProductId(parseInt(e.target.value))}
        ></input>
        {productId != undefined && !isNaN(productId)
          ? animalsIds.map((id) => <p>{id}</p>)
          : ""}
      </div>
    </>
  );
};

export default ViewAnimals;
