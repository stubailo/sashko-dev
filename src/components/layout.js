import React from "react"
import {Link} from "gatsby"
import Github from "./../../content/assets/github"
import Linkedin from "./../../content/assets/linkedin"
import Twitter from "./../../content/assets/twitter"
import {rhythm} from "../utils/typography"
import "./layout.css"

const Layout = ({location, title, children, avatar, github, twitter, linkedin}) => {
	const rootPath = `${__PATH_PREFIX__}/`;
	let header;

	if (location.pathname === rootPath){
		header = (
			<div className={'head-style'}>
				<Link
					style={{
						boxShadow: `none`,
						color: `inherit`,
						fontSize: `24px`
					}}
					to={`/`}
				>
					<img style={{
						width: '80px', borderRadius: "50%",
						margin: 'auto'
					}} src={avatar} alt=""/>
				</Link>

				<div style={{
					display: 'flex', marginLeft: '10px', alignItems: 'center',
					width: '100%',
					marginTop: '10px',
					justifyContent: 'space-between'
				}}>

					<Link
						style={{
							boxShadow: `none`,
							color: `inherit`,
							fontSize: `24px`,
							fontWeight: 'bold'
						}}
						to={`/`}
					>
						{title}
					</Link>
					<div className={'icon-box'}>
						<a className={'icon-link'} href={`https://github.com/${github}`} target={"_blank"}
						   rel="noopener noreferrer">
							<Github width="20px"/>
						</a>
						<a className={'icon-link'} href={`https://linkedin.com/in/${linkedin}`}
						   target={"_blank"} rel="noopener noreferrer">
							<Linkedin width="20px"/>
						</a>
						<a className={'icon-link'} href={`https://twitter.com/${twitter}`} target={"_blank"}
						   rel="noopener noreferrer">
							<Twitter width="20px"/>
						</a>
					</div>
				</div>
			</div>
		)
	} else {
		header = (
			<Link
				className={'head-link'}
				to={`/`}
			>
				&lt; Home
			</Link>
		)
	}
	return (
		<div
			style={{
				marginLeft: `auto`,
				marginRight: `auto`,
				maxWidth: rhythm(34.8),
				padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
			}}
			className={'body-pad'}
		>
			<header style={{minHeight: 50}}>{header}</header>
			<main>{children}</main>
			<footer style={{textAlign: 'center', fontSize: '12px', opacity: 0.5, margin: '20px 0'}}>
				{ title }
				&nbsp; © {new Date().getFullYear()}, Built with
				{` `}
				<a href="https://www.gatsbyjs.org">Gatsby</a>
			</footer>
		</div>
	)
};

export default Layout
