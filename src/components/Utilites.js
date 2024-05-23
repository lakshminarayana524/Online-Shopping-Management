import React, { useState } from "react";
import AuthToken from "./auth";
import ProductDetails from "./product_detail";

const Utilities = () => {
  const [uId, setuId] = useState('');

  return (
    <div>
      <AuthToken setuId={setuId} /> {/* Pass the setuId function as a prop */}
      <ProductDetails uId={uId} />
    </div>
  );
};

export default Utilities;
