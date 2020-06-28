import React from "react";
const Discuss = ({ slug }) => {
  const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://sashko.dev${slug}`
  )}`;

  return (
    <a href={discussUrl} target={"_blank"} rel="noopener noreferrer">
      Discuss on Twitter
    </a>
  );
};

export default Discuss;
