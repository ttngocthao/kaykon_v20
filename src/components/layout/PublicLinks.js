import React from "react";
import { Link } from "react-router-dom";
const PublicLinks = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin">Sign in</Link>
        </li>
      </ul>
    </nav>
  );
};

export default PublicLinks;
