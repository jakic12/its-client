import React from "react";
import "../scss/components/ProjectCard.scss";

import { NavLink } from 'react-router-dom';

export default function ProjectCard({ uid, name, categories }) {
  return (
    <div className="projectCardWrapper">
      <NavLink className="projectCard" to={`/course/${uid}`}>
        <div className="cardThumbnail">
          <img
            src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
            alt="ProjectCard thumbnail"
          />
        </div>
        <div className="title">
          <div className="name">
            <div>{name}</div>
          </div>
          <div className="categories">
            {categories.map((c, i) => (
              <div className="category" key={`cat_${i}`}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export function ProjectCardContainer({ children }) {
  return <div className={`projectCardContainer`}>{children}</div>;
}
