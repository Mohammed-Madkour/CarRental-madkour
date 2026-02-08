import React from "react";

const Title = ({ title, subTitle }) => {
  return (
    <>
      <h1 className="font-medium text-3xl max-sm:text-2xl">{title}</h1>
      <p className="text-sm md:text-base text-gray-500/90 max-w-156 mt-2">
        {subTitle}
      </p>
    </>
  );
};

export default Title;
