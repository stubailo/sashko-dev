import React from "react";
import { rhythm, scale } from "../utils/typography";
import "./layout.css";

function Layout({ children }) {
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(34),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
      }}
    >
      <main>{children}</main>
      <footer
        style={{
          opacity: 0.5,
          margin: `${rhythm(1)} 0`,
          ...scale(-1 / 2)
        }}
      >
        © Sashko Stubailo {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default Layout;
