import React from "react";

const Navbar = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center py-4">
        <div className="text-3xl">
          CRUD <span className="text-orange-500">Inventory</span>
        </div>
        <div>
          <ul>
            <li>Login</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
