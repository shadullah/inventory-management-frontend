"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [id, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("id");
      setUserId(userId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("id");
    setUserId(null);
    window.location.href = "/authenticate/login";
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center py-4">
        <div className="text-3xl">
          <Link href="/">
            CRUD <span className="text-orange-500">Inventory</span>
          </Link>
        </div>
        <div>
          <ul className="flex space-x-4">
            {id ? (
              <>
                <Link href="/authenticate/login">
                  <li>Add Product</li>
                </Link>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <Link href="/authenticate/login">
                  <li>Login</li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
