import React from 'react';
import '../scss/ProjectCard.scss'

export default function ProjectCard({ name, categories }){
    console.log(name, categories)
    return (
        <div className="projectCard">
            <div className="cardThumbnail">
                <img src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg" alt="ProjectCard thumbnail"/>
            </div>
            <div className="title">
                <div className="name">{name}</div>
                <div className="categories">{categories.map((c, i) =>
                    <div className="category" key={`cat_${i}`}>{c}</div>
                )}</div>
            </div>
        </div>
    )
}

export function ProjectCardContainer({ children }){
    return <div className={`projectCardContainer`}>
        {children}
    </div>
}