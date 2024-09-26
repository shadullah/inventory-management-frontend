"use client";
import Product_crud from "@/Components/Shared/Product_crud";
import axios from "axios";
// import Product_crud from "../add/page";
import { useEffect, useState } from "react";

interface ProductData {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
  user: {
    id: string;
  };
}

interface Params {
  id: string;
}

const Update = ({ params }: { params: Params }) => {
  const [prod, setProd] = useState<ProductData | null>(null);
  //   const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchedItem = async () => {
      try {
        const res = await axios.get(
          `https://inventory-management-backend-nu.vercel.app/products/${id}/`
        );
        console.log(res.data);
        setProd(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedItem();
  }, [id]);

  return (
    <div>
      {prod ? (
        <>
          <div>
            <Product_crud prod={prod} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Update;
