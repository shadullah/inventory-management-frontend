"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const myLoader = ({ src }: { src: string }) => {
  return src;
};

type Prod = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  user: {
    id: string;
  };
};

type ApiResponse = {
  count: number;
  results: Prod[];
};

const Products = () => {
  const [products, setProducts] = useState<Prod[]>([]);
  const [loading, setLoad] = useState(true);
  const [currentP, setCurrentP] = useState(1);
  const [ttlP, setTtlP] = useState(1);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = searchQ
          ? `http://127.0.0.1:8000/products/?search=${searchQ}`
          : `http://127.0.0.1:8000/products/?page=${currentP}`;
        const res = await axios.get<ApiResponse>(url);
        console.log(res?.data);
        setProducts(res?.data?.results || []);
        setTtlP(Math.ceil(res?.data?.count / 4));
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };
    fetchProducts();
  }, [currentP, searchQ]);

  const truncate = (str: string, len: number) => {
    if (str.length <= len) return str;
    return str.slice(0, len) + "...";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentP(1);
    setLoad(true);
  };

  return (
    <div className="my-6">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-center">Products</span>
        </div>
        <div>
          <form onSubmit={handleSearch} className="">
            <div className="flex items-center px-6 py-3 rounded-lg mt-6">
              <input
                type="text"
                className="bg-transparent border-b-2 bg-gray-300 p-[2.5px] outline-none w-full"
                placeholder="Search Here..."
                name="search"
                onChange={(e) => setSearchQ(e.target.value)}
                value={searchQ}
              />
              <button type="submit" className="">
                <BiSearchAlt2 className="text-3xl border-b-2 p-1 " />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        {loading ? (
          <>
            <p className="my-12 text-center">Loading.....</p>
          </>
        ) : (
          <>
            {searchQ && products?.length === 0 ? (
              <>
                <p>No Products found</p>
              </>
            ) : (
              <>
                <div className="grid grid-cols-4 gap-6 my-12">
                  {products?.map((prod) => (
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
                          <Link href={`products/${prod?.id}`}>
                            <button className="px-4 py-3 rounded-lg bg-orange-500">
                              Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center my-4 space-x-4 mb-12">
                  <button
                    onClick={() => setCurrentP((prev) => Math.max(prev - 1, 1))}
                    disabled={currentP === 1}
                    className="bg-gray-800 px-3 py-2 rounded-md"
                  >
                    &larr; Prev
                  </button>
                  <span className="font-bold text-md">
                    Page {currentP} of {ttlP}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentP((prev) => Math.min(prev + 1, ttlP))
                    }
                    disabled={currentP === ttlP}
                    className="bg-gray-800 px-3 py-2 rounded-md"
                  >
                    Next &rarr;
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
