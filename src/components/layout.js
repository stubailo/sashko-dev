import React from "react";

import { rhythm } from "../utils/typography";
import "./layout.css";

class Layout extends React.Component {
  render() {
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
        }}
      >
        <main>{this.props.children}</main>
        <p>Find me on: Twitter, Medium, GitHub</p>
      </div>
    );
  }
}

export default Layout;
