import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";
import Github from "./../../content/assets/github";
import Linkedin from "./../../content/assets/linkedin";
import Twitter from "./../../content/assets/twitter";
import { rhythm } from "../utils/typography";
import "./layout.css";

const Layout = ({ location, title, children, github, twitter, linkedin }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpeg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <div className={"head-style"}>
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
            fontSize: `24px`
          }}
          to={`/`}
        >
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            style={{
              minWidth: 50,
              borderRadius: `100%`,
              width: "80px",
              height: "80px"
            }}
            imgStyle={{
              borderRadius: `50%`
            }}
          />
        </Link>

        <div
          style={{
            display: "flex",
            marginLeft: "10px",
            alignItems: "center",
            width: "100%",
            marginTop: "10px",
            justifyContent: "space-between"
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
              fontSize: `24px`,
              fontWeight: "bold"
            }}
            to={`/`}
          >
            {title}
          </Link>
          <div className={"icon-box"}>
            <a
              className={"icon-link"}
              href={`https://github.com/${github}`}
              target={"_blank"}
              rel="noopener noreferrer"
            >
              <Github width="20px" />
            </a>
            <a
              className={"icon-link"}
              href={`https://linkedin.com/in/${linkedin}`}
              target={"_blank"}
              rel="noopener noreferrer"
            >
              <Linkedin width="20px" />
            </a>
            <a
              className={"icon-link"}
              href={`https://twitter.com/${twitter}`}
              target={"_blank"}
              rel="noopener noreferrer"
            >
              <Twitter width="20px" />
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    header = (
      <Link className={"head-link"} to={`/`}>
        &lt; Home
      </Link>
    );
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(34.8),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
      }}
      className={"body-pad"}
    >
      <header style={{ minHeight: 50 }}>{header}</header>
      <main>{children}</main>
      <footer
        style={{
          textAlign: "center",
          fontSize: "12px",
          opacity: 0.5,
          margin: "20px 0"
        }}
      >
        {title}
        &nbsp; © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
