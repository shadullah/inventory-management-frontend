"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";

const myLoader = ({ src }: { src: string }) => {
  return src;
};

type Product = {
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

interface Params {
  id: string;
}

const ProductDetails = ({ params }: { params: Params }) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoad] = useState(true);
  // const user = localStorage.getItem("id");
  const router = useRouter();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("id");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const url = `http://127.0.0.1:8000/products/${id}/`;
        const res = await axios.get(url);
        console.log(res?.data);
        setProduct(res?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/products/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accToken")}`,
        },
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center my-12">Details</h1>

      <div>
        {loading ? (
          <>
            <div className="my-12">Loading....</div>
          </>
        ) : (
          <>
            <div className="max-w-[1200px] mx-auto">
              <div className="block md:flex justify-between items-center">
                <div className="p-12 w-1/2">
                  <Image
                    loader={myLoader}
                    className="h-[500px] w-[500px]"
                    src={product?.image || ""}
                    alt=""
                    height={400}
                    width={400}
                  />
                </div>
                <div className="w-1/2 text-start">
                  <h1 className="text-2xl font-bold">{product?.name}</h1>

                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-bold my-6 text-orange-500">
                      ${product?.price}
                    </h3>
                    <h3 className="text-3xl font-bold my-6 ">
                      Quantity: {product?.quantity}
                    </h3>
                  </div>
                  <p className="text-gray-600  my-6">{product?.description}</p>
                </div>
              </div>
              {product?.user?.id == data ? (
                <>
                  <div className="mb-12 flex justify-around">
                    <Link href={`/products/update/${id}`}>
                      <button className="flex justify-center items-center px-4 py-3 bg-green-600 font-bold text-white">
                        <LiaEdit className="text-3xl mr-3" />
                        Update Product
                      </button>
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="flex justify-center items-center px-4 py-3 bg-red-600 font-bold text-white"
                    >
                      <AiOutlineDelete className="text-3xl mr-3" />
                      Delete Product
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
