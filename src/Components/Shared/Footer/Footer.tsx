import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <p className="text-center text-lg">
        &copy; Copyright Reserved by{" "}
        <Link className="font-bold" href="https://shadullah.vercel.app/">
          Shadullah
        </Link>
      </p>
    </div>
  );
};

export default Footer;
