import React from "react"
import {graphql} from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {scale} from "../utils/typography"
import "github-markdown-css/github-markdown.css"
import "./blog-post.css"
import Github from "../../content/assets/github";
import Linkedin from "../../content/assets/linkedin";
import Twitter from "../../content/assets/twitter";

const BlogPostTemplate = ({data, pageContext, location}) => {
	const post = data.markdownRemark;
	const author = data.site.siteMetadata.author.name;
	const {title: siteTitle} = data.site.siteMetadata;
	const {avatar, github, twitter, linkedin} = data.site.siteMetadata.social;

	return (
		<Layout location={location} title={siteTitle}>
			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
			/>
			<article className="markdown-body">
				<header>
					<div>
						<h1 style={{marginBottom: '0', borderBottom: 'none', paddingBottom: '15px', marginTop: 10}}>
							{post.frontmatter.title}
							<small
								style={{
									...scale(-1 / 5),
									display: `block`,
									marginBottom: 0,
									opacity: 0.5,
									fontStyle: 'italic',
									marginTop: '5px',
									lineHeight: '1.25rem'
								}}
							>
								{post.frontmatter.description}
							</small></h1>


					</div>

					<div style={{display: 'inline-flex', width: '100%', paddingBottom: '25px'}}>

						<img style={{
							width: '50px', borderRadius: "50%",
							margin: 'auto'
						}}
						     srcSet={(post.frontmatter.authorImg && post.frontmatter.authorImg.childImageSharp.fixed.srcSet) || avatar}
						     alt=""/>


						<div style={{
							display: 'flex', marginLeft: '10px', alignItems: 'center',
							width: '100%',
							marginTop: '5px',
							justifyContent: 'space-between'
						}}>

							<div>
								<p style={{marginBottom: '0'}}>
									{post.frontmatter.author || author}
								</p>

								<p
									style={{
										...scale(-1 / 5),
										display: `block`,
										marginBottom: 0,
										opacity: 0.5,
										fontStyle: 'italic',
									}}
								>
									{post.frontmatter.date}
								</p>
							</div>


							<div style={{marginRight: '50px'}}>
								<a style={{boxShadow: 'none', margin: '0 10px'}}
								   href={`https://github.com/${post.frontmatter.authorGithub || github}`} target={"_blank"}
								   rel="noopener noreferrer">
									<Github width="20px"/>
								</a>
								<a style={{boxShadow: 'none', margin: '0 10px'}}
								   href={`https://linkedin.com/in/${post.frontmatter.authorLinkedin || linkedin}`} target={"_blank"}
								   rel="noopener noreferrer">
									<Linkedin width="20px"/>
								</a>
								<a style={{boxShadow: 'none', margin: '0 10px'}}
								   href={`https://twitter.com/${post.frontmatter.authorTwitter || twitter}`} target={"_blank"}
								   rel="noopener noreferrer">
									<Twitter width="20px"/>
								</a>
							</div>
						</div>
					</div>

				</header>
				<section dangerouslySetInnerHTML={{__html: post.html}}/>

				<footer style={{margin: '30px 0'}}>
					<Bio slug={pageContext.slug}/>
				</footer>
			</article>
			<nav style={{textAlign: 'right', margin: '30px 0'}}>
				{post.frontmatter.recommendUrl ?
					<a href={post.frontmatter.recommendUrl}>{post.frontmatter.recommendTitle} →</a>
					:
					null
				}
			</nav>
		</Layout>
	)
};

export default BlogPostTemplate

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
                    avatar
                    linkedin
                }
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
                description
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
    }
`;
