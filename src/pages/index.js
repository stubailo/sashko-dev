import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import External from "./../../content/assets/external";
import { externalPost } from "../components/external";
import { Header } from "../components/Header";
import { rhythm, scale } from "../utils/typography";

const BlogIndex = ({ data }) => {
  let posts = data.allMdx.edges.map(({ node }) => ({
    url: node.fields.slug,
    title: node.frontmatter.title,
    desc: node.frontmatter.description,
    date: node.frontmatter.date,
    imgUrl: node.frontmatter.imgUrl
  }));

  // Merge MDX posts with external posts from configuration
  posts = [...posts, ...externalPost].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <Layout>
      <SEO title="All posts" />
      <Header />

      {posts.map(post => {
        const title = post.title;
        const image = (
          <img
            srcSet={post.imgUrl}
            alt=""
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        );

        return (
          <div
            key={post.url}
            style={{ marginBottom: rhythm(2), display: "flex" }}
          >
            <div
              style={{
                width: rhythm(4),
                height: rhythm(4),
                marginRight: rhythm(1),
                position: "relative"
              }}
            >
              {post.external ? (
                <a href={post.url} target={"_blank"} rel="noopener noreferrer">
                  {image}
                </a>
              ) : (
                <Link to={post.url}>{image}</Link>
              )}
            </div>

            <div>
              <h3
                style={{
                  marginTop: rhythm(3 / 4),
                  marginBottom: rhythm(1 / 4),
                  ...scale(1 / 4)
                }}
              >
                {post.external ? (
                  <a
                    href={post.url}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    {title}
                    <External width="18px" />
                  </a>
                ) : (
                  <Link to={post.url}>{title}</Link>
                )}
              </h3>
              <p style={scale(0)}>
                {post.date} • {post.desc}
              </p>
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
            imgUrl {
              childImageSharp {
                fixed(width: 50, height: 50) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
