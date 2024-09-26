"use client";
import useUsers from "@/Hooks/useUsers";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useEffect, useState } from "react";

interface ProductData {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
}

interface ProdProps {
  prod?: ProductData;
}

const Product_crud = ({ prod }: ProdProps) => {
  const { register, handleSubmit, setValue } = useForm<ProductData>();
  const router = useRouter();
  const [user] = useUsers();
  const [tok, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("accToken");
    if (storedData) {
      setToken(storedData);
    }
    console.log(storedData);
  }, []);

  useEffect(() => {
    if (prod) {
      setValue("name", prod.name);
      setValue("description", prod.description);
      setValue("quantity", prod.quantity);
      setValue("price", prod.price);
      setValue("image", prod.image);
    }
  }, [prod, setValue]);

  const addOrUpdate = async (data: ProductData) => {
    console.log(data);
    const config = {
      headers: {
        Authorization: `Bearer ${tok}`,
      },
    };
    console.log(config);
    if (prod) {
      await axios.put(
        `http://127.0.0.1:8000/products/${prod.id}/`,
        {
          name: data.name,
          description: data.description,
          quantity: data.quantity,
          price: data.price,
          image: data.image,
          user: user?.id || "",
        },
        config
      );
      console.log("product updated success");
      router.push(`/products/${prod.id}`);
    } else {
      await axios.post(
        "http://127.0.0.1:8000/products/",
        {
          name: data.name,
          description: data.description,
          quantity: data.quantity,
          price: data.price,
          image: data.image,
          user: user?.id,
        },
        config
      );
      console.log("poduct added success");
      router.push("/");
    }
  };

  return (
    <div>
      <h1 className="text-3xl my-3 text-center">
        {prod ? "Update Products" : "Add Products"}
      </h1>
      <div>
        <form
          onSubmit={handleSubmit(addOrUpdate)}
          className="my-12 w-1/2 mx-auto"
        >
          <div className="space-y-5">
            <Input
              label="Name: "
              placeholder="Name of the product"
              type="text"
              className="mb-3"
              {...register("name", {
                required: true,
                maxLength: 1000,
              })}
            />
            <label className="">Description: </label>
            <br />
            <textarea
              rows={6}
              placeholder="Write product Description here.."
              className="rounded-lg w-full text-black p-2"
              {...register("description", {
                required: true,
                maxLength: 10000,
              })}
            />
            <Input
              label="Quantity: "
              type="number"
              placeholder="Enter product quantity"
              {...register("quantity", {
                required: true,
              })}
            />
            <Input
              label="Price: "
              type="number"
              placeholder="Enter product price"
              {...register("price", {
                required: true,
              })}
            />
            <Input
              label="Image URL: "
              type="url"
              placeholder="Enter product price"
              {...register("image", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full">
              {prod ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product_crud;
