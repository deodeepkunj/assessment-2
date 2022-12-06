import React from "react";
import Loader from "./Loader";

const UserCard = ({ email, name, sendDataToParent, loader }) => {
  const { first, last, title } = name;
  let fullName = `${title} ${first} ${last}`;
  return (
    <div className="card border-0 shadow-lg rounded-lg">
      <div className="card-body">
        <div className="text-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              sendDataToParent(true);
            }}
          >
            Refresh
          </button>
        </div>
        {loader ? (
          <Loader />
        ) : (
          <div>
            <h1>{fullName}</h1>
            <p className="align-left">Email: {email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
