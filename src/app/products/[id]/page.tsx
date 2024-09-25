"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductDetails = ({ params }: any) => {
  const { id } = params;
  const [product, setProduct] = useState("");
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const url = `http://127.0.0.1:8000/products/${id}/`;
        const res = await axios.get(url);
        console.log(res?.data);
        // setProduct(res?.data?.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };
    fetchDetails();
  }, [id]);

  return (
    <div>
      <h1 className="text-4xl text-center my-12">Details</h1>
    </div>
  );
};

export default ProductDetails;
