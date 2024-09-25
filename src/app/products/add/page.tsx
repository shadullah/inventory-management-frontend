"use client";
import Button from "@/Components/Button/Button";
import Input from "@/Components/Input/Input";
import useUsers from "@/Hooks/useUsers";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface ProductData {
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
}

const Product_crud = () => {
  const { register, handleSubmit } = useForm<ProductData>();
  const router = useRouter();
  const [user] = useUsers();
  const tok = localStorage.getItem("accToken");

  const add = async (data: ProductData) => {
    console.log(data);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/products/",
        {
          name: data.name,
          description: data.description,
          quantity: data.quantity,
          price: data.price,
          image: data.image,
          user: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        }
      );
      console.log("poduct added success", res.data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl my-3 text-center">Add Products</h1>
      <div>
        <form onSubmit={handleSubmit(add)} className="my-12 w-1/2 mx-auto">
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
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product_crud;
