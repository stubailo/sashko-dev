import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges.map(({ node }) => ({
      placeName: "sashko.dev",
      url: node.fields.slug,
      title: node.frontmatter.title,
      description: node.frontmatter.description,
      date: node.frontmatter.date
    }));

    const allPosts = posts.concat(getExternalPosts());
    allPosts.sort((l, r) => new Date(r.date) - new Date(l.date));

    const years = {};
    allPosts.forEach(post => {
      const year = post.date.slice(0, 4);
      if (!Array.isArray(years[year])) {
        years[year] = [];
      }
      years[year].push(post);
    });

    const yearList = Object.keys(years);
    yearList.sort().reverse();

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />

        <h2>Blog posts</h2>
        {yearList.map(year => (
          <div>
            <h4>{year}</h4>
            {years[year].map(post => {
              return <PostCard post={post} />;
            })}
          </div>
        ))}
      </Layout>
    );
  }
}

export default BlogIndex;

function PostCard({ post }) {
  return (
    <div
      key={post.slug}
      style={{
        marginBottom: rhythm(1)
      }}
    >
      <h3
        style={{
          marginBottom: rhythm(1 / 4)
        }}
      >
        {post.url.slice(0, 4) === "http" ? (
          <a href={post.url}>{post.title}</a>
        ) : (
          <Link style={{ boxShadow: `none` }} to={post.url}>
            {post.title}
          </Link>
        )}
      </h3>
      <p style={{ marginBottom: 0 }}>{post.description}</p>
      <small>
        {post.date} on {post.placeName}
      </small>
    </div>
  );
}

function getExternalPosts() {
  return [
    {
      placeName: "freeCodeCamp News",
      url:
        "https://www.freecodecamp.org/news/a-new-approach-to-mocking-graphql-data-1ef49de3d491/",
      title: "A new approach to mocking GraphQL data",
      description: "How we power React component tests and examples at Stripe",
      date: "2018-12-11"
    },
    {
      placeName: "Medium",
      url:
        "https://medium.com/@stubailo/being-present-managing-time-and-avoiding-distractions-11792593931d",
      title: "Being present, managing time, and avoiding distractions",
      description:
        "Some tricks that help me stay sane when the internet is calling",
      date: "2019-01-07"
    }
  ];
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
          }
        }
      }
    }
  }
`;
