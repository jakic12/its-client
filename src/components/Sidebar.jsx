import React from "react";

// import scss
import "../scss/components/Sidebar.scss";

const Sidebar = ({ title, body, footer, hide }) => {
  return (
    <aside className={`sidebar ${hide ? `hidden` : ``}`}>
      <div className="sidebarInner">
        <div className="title">{title}</div>
        <div className="body">{body}</div>
        <div className="footer">{footer}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
