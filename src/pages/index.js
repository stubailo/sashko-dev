import React from "react"
import {Link, graphql} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import External from './../../content/assets/external'
import { externalPost } from "../components/external";

const BlogIndex = ({data, location}) => {
	const siteTitle = data.site.siteMetadata.title;
	const {avatar, github, twitter, linkedin} = data.site.siteMetadata.social;
	let posts = data.allMarkdownRemark.edges.map(({node}) => ({
		url: node.fields.slug,
		title: node.frontmatter.title,
		desc: node.frontmatter.description,
		date: node.frontmatter.date,
		imgUrl: node.frontmatter.imgUrl && node.frontmatter.imgUrl.childImageSharp.fixed.srcSet,
		publish: node.frontmatter.publish
	})).filter((node) => node.publish);

	posts = [...posts, ...externalPost].sort((a, b) => new Date(b.date) - new Date(a.date));

	return (
		<Layout location={location} title={siteTitle} avatar={avatar} twitter={twitter} github={github} linkedin={linkedin}>
			<SEO title="All posts"/>
			{posts.map((node) => {
				const title = node.title;
				return (
					<article key={node.url}>
						<header
							style={{display: 'flex', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #efefef'}}>
							{node.external ?
								<a href={node.url} style={{boxShadow: 'none'}} target={'_blank'} rel="noopener noreferrer"><img
									srcSet={node.imgUrl} style={{minWidth: '150px', height: '150px', marginBottom: '0',maxWidth: '150px',objectFit: 'cover'}} alt=""/> </a> :
								<Link style={{boxShadow: `none`, height: '150px'}} to={node.url}>
									<img srcSet={node.imgUrl} style={{minWidth: '150px', height: '150px', marginBottom: '0',maxWidth: '150px',objectFit: 'cover'}} alt=""/>
								</Link>
							}

							<div style={{marginLeft: '20px', marginTop: '-15px'}}>
								<small style={{opacity: '0.75', fontStyle: 'italic'}}>{node.date}</small>
								<h3
									style={{
										// marginBottom: rhythm(1 / 4),
										margin: '0 0 5px 0',
										lineHeight: '28px',
									}}
								>
									{node.external ? <a href={node.url} style={{boxShadow: 'none', fontWeight: 'bold'}} target={'_blank'}
									                    rel="noopener noreferrer">{title} <External width="18px"/></a> :
										<Link style={{boxShadow: `none`, fontWeight: 'bold'}} to={node.url}>
											{title}
										</Link>
									}
								</h3>
								<p
									style={{fontSize: '14px', marginBottom: 0, fontWeight: '300'}}
									dangerouslySetInnerHTML={{
										__html: node.desc,
									}}
								/>
							</div>
						</header>

					</article>
				)
			})}
		</Layout>
	)
};

export default BlogIndex

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
                social {
                    twitter
                    github
                    avatar
                    linkedin
                }
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
                        publish
                        imgUrl  {
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
