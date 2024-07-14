import React, { useState, useEffect, useRef } from "react";
import { BsGenderTrans } from "react-icons/bs";
import { PiTShirt } from "react-icons/pi";
import { IoFilterOutline } from "react-icons/io5";
import { LiaShoppingBagSolid } from "react-icons/lia";
import users from "./utils/clothes.json";
import Impdata from "./utils/users.json";
import Story from "./components/Story";
import Main from "./components/Main";
import "./App.css";

const App = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1); // Default to "All"
  const [activeButton, setActiveButton] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedOptions, setSelectedOptions] = useState({});
  const scrollRef = useRef(null);

  useEffect(() => {
    setFilteredData(users.users);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, activeFilter]);

  const applyFilters = () => {
    let data = users.Impdata;

    if (activeFilter !== "All") {
      data = data.filter((user) => user.category === activeFilter);
    }

    setFilteredData(data);
  };

  const handleClickBtn = (id) => {
    setActiveButton(id === activeButton ? null : id);
  };

  const handleCategoryFilter = (item) => {
    setSelectedCategory(item.id);
    setActiveFilter(item.txt);
  };

  const removeOption = (btnId, option) => {
    const currentOptions = selectedOptions[btnId];
    const updatedOptions = currentOptions.filter((opt) => opt !== option);
    setSelectedOptions({
      ...selectedOptions,
      [btnId]: updatedOptions.length > 0 ? updatedOptions : null,
    });
  };

  const handleDropdownChange = (btnId, option) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [btnId]: selectedOptions[btnId]
        ? [...selectedOptions[btnId], option.name]
        : [option.name],
    };
    setSelectedOptions(newSelectedOptions);
  };

  const disableDropdown = () => {
    setActiveButton(null);
  };

  // filter function to go here

  return (
    <div className="app">
      <Story />
      <div
        className="wrapper overflow-x-auto whitespace-nowrap p-2 z-10"
        onScroll={() => disableDropdown()}
      >
        <div className="p-2">
          <div className="flex gap-3">
            {btndata.map((btn) => (
              <div key={btn.id} ref={scrollRef}>
                <button
                  className={`flex items-center justify-center gap-4 p-2 m-1 rounded-md h-[50px] ${
                    activeButton === btn.id
                      ? "bg-white text-black"
                      : "text-white border border-white"
                  }`}
                  onClick={() => handleClickBtn(btn.id)}
                >
                  <span>{btn.icon}</span>
                  <span>{btn.txt}</span>
                  {selectedOptions[btn.id] && (
                    <div className="flex items-center ml-2 mt-2">
                      {selectedOptions[btn.id].map((option) => (
                        <div
                          key={option}
                          className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          {option}
                          <button
                            className="ml-2 text-gray-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeOption(btn.id, option);
                            }}
                          >
                            &#10005;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </button>
                {activeButton === btn.id && (
                  <div className="absolute bg-white text-black mt-2 rounded-md shadow-lg p-2 z-50">
                    {btn.options &&
                      btn.options.map((option) => (
                        <div
                          key={option.id}
                          className={`p-2 cursor-pointer hover:bg-gray-200${
                            selectedOptions[btn.id] &&
                            selectedOptions[btn.id].includes(option.name)
                              ? " bg-gray-200"
                              : ""
                          }`}
                          onClick={() =>
                            selectedOptions[btn.id] &&
                            selectedOptions[btn.id].includes(option.name)
                              ? removeOption(btn.id, option.name)
                              : handleDropdownChange(btn.id, option)
                          }
                        >
                          {option.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="wrapper overflow-x-auto whitespace-nowrap p-2 z-10">
        <div className="flex gap-3 p-2">
          {data.map((item) => (
            <button
              key={item.id}
              onClick={() => handleCategoryFilter(item)}
              className={`flex items-center justify-center gap-2 p-6 bg-[#1A1A1A] rounded-lg h-[40px] ${
                selectedCategory === item.id
                  ? "text-white underline mb-1"
                  : "text-gray-500"
              }`}
              style={
                selectedCategory === item.id
                  ? { textUnderlineOffset: "8px" }
                  : {}
              }
            >
              {item.txt}
            </button>
          ))}
        </div>
      </div>
      <div className="mainComp">
        <Main data={filteredData} />
      </div>
    </div>
  );
};

export default App;

const btndata = [
  {
    id: 1,
    txt: "Gender",
    options: [
      { id: "M", name: "Male" },
      { id: "F", name: "Female" },
    ],
    icon: <BsGenderTrans />,
  },
  {
    id: 2,
    txt: "Collection",
    options: [
      { id: "C1", name: "Collection 1" },
      { id: "C2", name: "Collection 2" },
    ],
    icon: <PiTShirt />,
  },
  {
    id: 3,
    txt: "Sort By Your Choice",
    options: [
      { id: "s1", name: "Recommended" },
      { id: "s2", name: "Customer Rating" },
    ],
    icon: <IoFilterOutline />,
  },
  {
    id: 4,
    txt: "Filter",
    options: [
      { id: 1, name: "100 - 500" },
      { id: 2, name: "500-5000" },
      { id: 3, name: "5000+" },
    ],
    icon: <IoFilterOutline />,
  },
  {
    id: 5,
    txt: "Brand",
    options: [
      { id: "B1", name: "Brand 1" },
      { id: "B2", name: "Brand 2" },
      { id: "B3", name: "Brand 3" },
    ],
    icon: <LiaShoppingBagSolid />,
  },
];

const data = [
  { id: 1, txt: "All" },
  { id: 2, txt: "Tshirt" },
  { id: 3, txt: "Joggers" },
  { id: 4, txt: "Shirts" },
  { id: 5, txt: "Pants" },
  { id: 6, txt: "Cargos" },
  { id: 7, txt: "Jacket" },
  { id: 8, txt: "Blazers" },
  { id: 9, txt: "Sarees" },
  { id: 10, txt: "Suit" },
  { id: 11, txt: "Coords" },
  { id: 12, txt: "Shoes" },
  { id: 13, txt: "Socks" },
  { id: 14, txt: "Bags" },
  { id: 15, txt: "Belt" },
];
