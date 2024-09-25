import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center py-4">
        <div className="text-3xl">
          <Link href="/">
            CRUD <span className="text-orange-500">Inventory</span>
          </Link>
        </div>
        <div>
          <ul>
            <Link href="/login">
              <li>Login</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
