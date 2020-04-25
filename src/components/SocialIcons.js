import React from "react";
import Github from "./../../content/assets/github";
import Linkedin from "./../../content/assets/linkedin";
import Twitter from "./../../content/assets/twitter";
import { rhythm } from "../utils/typography";

function SocialIconLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ marginRight: rhythm(1 / 4) }}
    >
      {children}
    </a>
  );
}

export function SocialIcons({ github, linkedin, twitter }) {
  return (
    <div>
      <SocialIconLink href={`https://github.com/${github}`}>
        <Github width={rhythm(1 / 2)} />
      </SocialIconLink>
      <SocialIconLink href={`https://linkedin.com/in/${linkedin}`}>
        <Linkedin width={rhythm(1 / 2)} />
      </SocialIconLink>
      <SocialIconLink href={`https://twitter.com/${twitter}`}>
        <Twitter width={rhythm(1 / 2)} />
      </SocialIconLink>
    </div>
  );
}
