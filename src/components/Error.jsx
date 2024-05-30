import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-full h-100vh justify-center items-center flex-col">
      <p>404 NOT FOUND</p>
      <NavLink to="/">back to home</NavLink>
    </div>
  );
};

export default Error;
