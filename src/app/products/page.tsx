"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const myLoader = ({ src }) => {
  return src;
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoad] = useState(true);
  const [currentP, setCurrentP] = useState(1);
  const [ttlP, setTtlP] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/products/?page=${currentP}`
        );
        console.log(res?.data);
        setProducts(res?.data?.results);
        setTtlP(Math.ceil(res?.data?.count / 4));
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };
    fetchProducts();
  }, [currentP]);

  const truncate = (str, len) => {
    if (str.length <= len) return str;
    return str.slice(0, len) + "...";
  };

  return (
    <div className="my-6">
      <h1 className="text-3xl text-center">Products</h1>

      <div>
        {loading ? (
          <>
            <p className="my-12 text-center">Loading.....</p>
          </>
        ) : (
          <>
            {products.length === 0 ? (
              <>
                <p>No Products found</p>
              </>
            ) : (
              <>
                <div className="grid grid-cols-4 gap-6 my-12">
                  {products.map((prod) => (
                    <div key={prod?.id} className="mb-6">
                      <Image
                        loader={myLoader}
                        src={prod?.image}
                        alt="#"
                        height={0}
                        width={0}
                        className="h-64
                         w-64 rounded-md mb-3"
                      />
                      <h3>{truncate(prod?.name, 50)}</h3>
                      <div className="flex justify-between items-center mt-6">
                        <div>
                          <p>$ {prod?.price}</p>
                        </div>
                        <div>
                          <button className="px-4 py-3 rounded-lg bg-orange-500">
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center my-4 space-x-4">
                  <button
                    onClick={() => setCurrentP((prev) => Math.max(prev - 1, 1))}
                    disabled={currentP === 1}
                    className="bg-gray-800 px-3 py-2"
                  >
                    Prev
                  </button>
                  <span>
                    Page {currentP} of {ttlP}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentP((prev) => Math.min(prev + 1, ttlP))
                    }
                    disabled={currentP === ttlP}
                    className="bg-gray-800 px-3 py-2"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
