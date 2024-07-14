import React, { useState } from "react";
import usersData from "./../utils/users.json";
import "../App.css";
const Story = () => {
  const users = usersData.users;

  const [ringVisibility, setRingVisibility] = useState(users.map(() => true));

  const hideRing = (index) => {
    const updatedVisibility = [...ringVisibility];
    updatedVisibility[index] = false;
    setRingVisibility(updatedVisibility);
  };

  const userElements = users.map((user, index) => (
    <div key={user.id} className=" flex-shrink-0 inline-block m-1">
      <div className="inline-flex gap-3 p-4 -mb-6">
        <ul className="flex space-x-6">
          <li className="flex flex-col items-center space-y-2">
            <a
              href=""
              className="block bg-black p-2 rounded-full hover:-rotate-6"
              onClick={() => hideRing(index)}
            ></a>
            <img
              src={user.img}
              alt=""
              className={`h-24 w-24 rounded-full ${
                ringVisibility[index] ? "ring ring-white ring-offset-1" : ""
              }`}
            />
            <span className="text-white text-sm"> {user.name}</span>
          </li>
        </ul>
      </div>
    </div>
  ));

  return (
    <div
      className="story flex overflow-x-auto whitespace-nowrap p-1"
      style={{ width: "100%" }}
    >
      {userElements}
    </div>
  );
};

export default Story;
