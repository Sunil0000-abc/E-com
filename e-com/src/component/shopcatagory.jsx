import React from 'react';
import { Link } from 'react-router-dom';
import jacket from "../assets/jacket.png"
import access from "../assets/access.png"
import cap from "../assets/cap.png"
import shirt from "../assets/tshirt.png"

const Shopcatagory = () => {
  const categories = [
    { name: "Jacket", img:jacket },
    { name: "Tsse", img: ""},
    { name: "Caps", img: cap },
    { name: "Accessories", img: access},
    { name: "Limited", img: shirt},
  ];

  return (
   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 px-15 py-10">
  {categories.map((item, index) => (
    <Link to={`/category/${item.name.toLowerCase()}`} key={index}>
      <div className="w-32 sm:w-36 md:w-40 p-4 shadow-md rounded-lg hover:shadow-lg transition duration-300 text-center">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-24 sm:h-28 object-cover mb-2 rounded"
        />
        <p className="text-sm font-semibold text-[#0f172a]">{item.name}</p>
      </div>
    </Link>
  ))}
</div>


  );
};

export default Shopcatagory;
