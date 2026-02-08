
const Title = ({ title, subTitle, align }) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center
    ${align === "left" && "items-start text-left"}`}>
      <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-500/90 mt-2 max-w-156 md:text-base">{subTitle}</p>
    </div>
  );
};

export default Title;
