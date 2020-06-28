import React from "react";
import Image from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";
import { SocialIcons } from "./SocialIcons";

import { rhythm } from "../utils/typography";

function Profile({ post }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            name
          }
          title
          social {
            twitter
            github
            linkedin
          }
        }
      }
      avatar: file(absolutePath: { regex: "/profile-pic.jpeg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const github =
    post.frontmatter.authorGithub || data.site.siteMetadata.social.github;
  const twitter =
    post.frontmatter.authorTwitter || data.site.siteMetadata.social.twitter;
  const linkedin =
    post.frontmatter.authorLinkedin || data.site.siteMetadata.social.linkedin;

  return (
    <div
      style={{
        display: "inline-flex",
        width: "100%",
        marginBottom: rhythm(1)
      }}
    >
      {post.frontmatter.authorImg ? (
        <img
          className={"author-img"}
          srcSet={
            post.frontmatter.authorImg &&
            post.frontmatter.authorImg.childImageSharp.fixed.srcSet
          }
          alt=""
        />
      ) : (
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          style={{
            marginBottom: 0,
            minWidth: 50,
            borderRadius: `100%`
          }}
          imgStyle={{
            borderRadius: `50%`
          }}
        />
      )}

      <div style={{ marginLeft: rhythm(1 / 2) }}>
        <p style={{ marginBottom: 0 }}>
          {data.site.siteMetadata.author.name || post.frontmatter.author}
          {", "}
          {post.frontmatter.date}
        </p>

        <SocialIcons {...{ github, linkedin, twitter }} />
      </div>
    </div>
  );
}

export default Profile;
