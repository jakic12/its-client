import React from "react";
import "../scss/components/ImageTagCard.scss";

import { Link } from "react-router-dom";

export default function ImageTagCard({ uid, name, tags, imageSrc }) {
  return (
    <div className="imageTagCardWrapper">
      <Link className="imageTagCard" to={`/course/${uid}`}>
        <div className="cardThumbnail">
          <img src={imageSrc} alt="ImageTagCard thumbnail" />
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

export function ImageTagCardContainer({ children }) {
  return <div className={`imageTagCardContainer`}>{children}</div>;
}
