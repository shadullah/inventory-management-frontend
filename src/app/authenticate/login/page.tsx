"use client";
import Button from "@/Components/Button/Button";
import Input from "@/Components/Input/Input";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";

interface loginData {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<loginData>();
  const [error] = useState("");

  const login = async (data: loginData) => {
    console.log(data);
    try {
      const res = await axios.post("http://127.0.0.1:8000/users/v1/login/", {
        username: data.username,
        password: data.password,
      });
      localStorage.setItem("id", res.data.user.id);
      localStorage.setItem("token", res.data.refresh);
      localStorage.setItem("accToken", res.data.access);
      window.location.href = "/";
      console.log("Logged in", res.data);
      toast.success("logged in", { duration: 3000 });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full my-12">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-600 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full text-xl text-center font-bold">
              CRUD Inventory
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account?&nbsp;
            <Link
              href="/authenticate/register"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Username: "
                placeholder="Enter your username"
                type="name"
                {...register("username", {
                  required: true,
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
