import React from "react";
import { graphql } from "gatsby";

import Discuss from "../components/Discuss";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { scale, rhythm } from "../utils/typography";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";
import Profile from "../components/Profile";

import "./blog-post.css";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx;
  const { title: siteTitle } = data.site.siteMetadata;
  const image = post.frontmatter.imgUrl
    ? post.frontmatter.imgUrl.childImageSharp.resize.src
    : null;

  console.log("FRONTMATTER", post.frontmatter);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={image}
        pathname={location.pathname}
      />
      <p>
        <Link to={`/`}>All posts</Link>
      </p>
      <article className="markdown-body">
        <header style={{ marginBottom: rhythm(1) }}>
          <div>
            <h1 style={{ marginBottom: rhythm(1 / 2) }}>
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(1 / 2)
              }}
            >
              {post.frontmatter.description}
            </p>
          </div>
        </header>
        <Profile post={post} />
        <hr />
        <section className={"mdx-style"}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </section>

        <footer style={{ margin: "30px 0" }}>
          <Discuss slug={pageContext.slug} />
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
        imgUrl {
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
