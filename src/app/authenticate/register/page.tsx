"use client";
import Button from "@/Components/Button/Button";
import Input from "@/Components/Input/Input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Register = () => {
  //   const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setErr] = useState("");

  const password = watch("password");

  const create = async (data: any) => {
    console.log(data);
    setErr("");
    try {
      const userReg = await axios.post(
        "http://127.0.0.1:8000/users/v1/register/",
        {
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
          confirm_password: data.confirm_password,
        }
      );
      console.log("Registration successfull", userReg.data);
      //   router.push("/");
      window.location.href = "/authenticate/login";
      toast.success("registration done", { duration: 3000 });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center my-12">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-600 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full text-xl text-center font-bold">
              CRUD Inventory
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              href="/authenticate/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              <Input
                label="Username: "
                placeholder="Enter your username"
                {...register("username", {
                  required: true,
                })}
              />
              {errors.username && <p>Username is required</p>}
              <Input
                label="First Name: "
                placeholder="Enter your first_name"
                {...register("first_name", {
                  required: true,
                })}
              />
              {errors.first_name && <p>first name is required</p>}
              <Input
                label="Last Name: "
                placeholder="Enter your last name"
                {...register("last_name", {
                  required: true,
                })}
              />
              {errors.last_name && <p>lastname is required</p>}
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              {errors.email && (
                <p>{errors.email.message && String(errors.email.message)}</p>
              )}

              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && (
                <p>
                  {errors.password.message && String(errors.password.message)}
                </p>
              )}

              <Input
                label="Confirm Password: "
                type="password"
                placeholder="Enter your password"
                {...register("confirm_password", {
                  required: true,
                  validate: (value) =>
                    value === password || "password doesnot match",
                })}
              />
              {errors.confirm_password && (
                <p>
                  {errors.confirm_password.message &&
                    String(errors.confirm_password.message)}
                </p>
              )}

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
