import React from "react";
import "../scss/components/ProjectCard.scss";

import { Link } from "react-router-dom";

export default function ProjectCard({ uid, name, tags, imageSrc }) {
  return (
    <div className="projectCardWrapper">
      <Link className="projectCard" to={`/course/${uid}`}>
        <div className="cardThumbnail">
          <img src={imageSrc} alt="ProjectCard thumbnail" />
        </div>
        <div className="title">
          <div className="name">
            <div>{name}</div>
          </div>
          <div className="tags">
            {tags.map((c, i) => (
              <div className="tag" key={`cat_${i}`}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export function ProjectCardContainer({ children }) {
  return <div className={`projectCardContainer`}>{children}</div>;
}
