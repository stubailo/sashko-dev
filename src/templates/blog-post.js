import React from "react";
import { graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { scale } from "../utils/typography";
import Image from "gatsby-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";
import { SocialIcons } from "../components/SocialIcons";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx;
  const author = data.site.siteMetadata.author.name;
  const { title: siteTitle } = data.site.siteMetadata;
  const { github, twitter, linkedin } = data.site.siteMetadata.social;
  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize
    : null;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={image}
        pathname={location.pathname}
      />
      <Link className={"head-link"} to={`/`}>
        &lt; Home
      </Link>
      <article className="markdown-body">
        <header>
          <div>
            <h1
              style={{
                marginBottom: "0",
                borderBottom: "none",
                paddingBottom: "15px",
                marginTop: 10
              }}
            >
              {post.frontmatter.title}
              <small
                style={{
                  ...scale(-1 / 5),
                  lineHeight: "22px"
                }}
              >
                {post.frontmatter.description}
              </small>
            </h1>
          </div>

          <div
            style={{
              display: "inline-flex",
              width: "100%",
              paddingBottom: "25px"
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

            <div
              style={{
                display: "flex",
                marginLeft: "10px",
                alignItems: "center",
                width: "100%",
                marginTop: "5px",
                justifyContent: "space-between"
              }}
            >
              <div>
                <p style={{ marginBottom: "0" }}>
                  {post.frontmatter.author || author}
                </p>

                <p
                  style={{
                    ...scale(-1 / 5),
                    display: `block`,
                    marginBottom: 0,
                    opacity: 0.5,
                    fontStyle: "italic"
                  }}
                >
                  {post.frontmatter.date}
                </p>
              </div>

              <SocialIcons {...{ github, linkedin, twitter }} />
            </div>
          </div>
        </header>
        <section className={"mdx-style"}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </section>

        <footer style={{ margin: "30px 0" }}>
          <Bio slug={pageContext.slug} />
        </footer>
      </article>
      <nav style={{ textAlign: "right", margin: "30px 0" }}>
        {post.frontmatter.recommendUrl ? (
          <a href={post.frontmatter.recommendUrl}>
            {post.frontmatter.recommendTitle} →
          </a>
        ) : null}
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        image: featured {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
        author
        authorGithub
        authorTwitter
        authorLinkedin
        recommendUrl
        recommendTitle
        authorImg {
          childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
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
`;
