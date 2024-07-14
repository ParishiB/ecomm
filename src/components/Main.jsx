import React from "react";

const Main = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center ">
        <div className="text-white text-center">No items found</div>
      </div>
    );
  }

  const img0 = data[0]?.img || "";
  const img1 = data[1]?.img || "";
  const img3 = data[3]?.img || "";
  const img5 = data[5]?.img || "";

  return (
    <div>
      <div className="">
        <div className="grid grid-cols-3 text-white">
          <div className="">
            <img src={img3} alt="" className="h-full w-full" />
          </div>
          <div className="">
            <div className="">
              <img src={img1} alt="" className="h-full w-full" />
            </div>
            <div className="">
              <img src={img5} alt="" className="h-full w-full" />
            </div>
          </div>
          <div className="">
            <img src={img0} alt="" className="h-full w-full" />
          </div>
        </div>
        <div className="grid grid-cols-3 text-white">
          <div className="">
            <img src={img0} alt="" className="h-full w-full" />
          </div>
          <div className="">
            <div className="">
              <img src={img1} alt="" className="h-full w-full" />
            </div>
            <div className="">
              <img src={img5} alt="" className="h-full w-full" />
            </div>
          </div>
          <div className="">
            <div className="">
              <img src={img1} alt="" className="h-full w-full" />
            </div>
            <div className="">
              <img src={img5} alt="" className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
