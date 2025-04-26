import React from "react";

const OvalSpinner = ({ width = "w-12", height = "h-12", border="border-4" }) => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className={`${width} ${height} ${border} border-[#5D5FEF] border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default OvalSpinner;
