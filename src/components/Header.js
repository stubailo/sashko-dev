import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { rhythm, scale } from "../utils/typography";
import { SocialIcons } from "./SocialIcons";

export function Header() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          social {
            twitter
            github
            linkedin
          }
        }
      }
    }
  `);

  return (
    <header
      style={{
        maxWidth: rhythm(20),
        marginBottom: rhythm(2)
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <h1
          style={{
            marginBottom: 0,
            marginRight: rhythm(1 / 2),
            ...scale(3 / 5)
          }}
        >
          {data.site.siteMetadata.title}
        </h1>
        <SocialIcons {...data.site.siteMetadata.social} />
      </div>

      <p style={{ marginBottom: rhythm(1 / 2) }}>
        {data.site.siteMetadata.description}
      </p>
    </header>
  );
}
