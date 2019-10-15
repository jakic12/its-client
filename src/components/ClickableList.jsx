import React from "react";

// import external libs
import { Route } from "react-router-dom";

// import scss
import "../scss/components/ClickableList.scss";

export const ListItem = (
  label,
  urlName,
  icon,
  exactPath = undefined,
  onClick = undefined,
  props = undefined
) => {
  return {
    exactPath,
    label,
    urlName,
    onClick,
    props,
    icon
  };
};
/**
 * @typedef ClickableListProps
 * @property {Array<Object>|Array<string>} items
 * @property {function(item):void} onItemClick
 * @property {Component} ItemComponent what Component should each item be?
 * @property {function(item):Object} mapItemPropToComponent a function that gets called with the item object and should return an Object of props to be applied to the rendered Component
 */

/**
 * List with clickable items
 * @extends Component<ClickableListProps, {}>
 */
const ClickableList = ({
  items,
  routerMode,
  selected,
  onItemClick,
  ItemComponent = "div",
  mapItemPropToComponent
}) => {
  console.log(ItemComponent);
  return (
    <div className="clickableList">
      {items.map((item, i) => {
        if (typeof item === "string" || item instanceof String) {
          item = ListItem(item);
        }
        const out = match => (
          <ClickableListItem
            item={item}
            index={i}
            mapItemPropToComponent={mapItemPropToComponent}
            onClick={onItemClick}
            Component={ItemComponent}
            selected={match}
          />
        );
        if (routerMode) {
          return (
            /*<div key={i}>
              path:{item.exactPath ? item.exactPath : `/${item.urlName}`}
              exact:{!!item.exactPath ? `true` : `false`}
              children:{({ match }) => <div>{match}</div>}}
            </div>*/
            <Route
              key={`_${i}`}
              path={item.exactPath ? item.exactPath : `/${item.urlName}`}
              exact={!!item.exactPath}
              children={({ match }) => out(match)}
            />
          );
        } else {
          return out(item.urlName === selected);
        }
      })}
    </div>
  );
};

const ClickableListItem = ({
  item,
  index,
  mapItemPropToComponent,
  onClick,
  Component,
  selected
}) => {
  return (
    <Component
      className={`item ${selected ? `selected` : ``}`}
      key={index}
      {...(mapItemPropToComponent ? mapItemPropToComponent(item) : {})}
      onClick={e => {
        if (onClick) onClick(item, index, e);
        if (item.onClick) item.onClick(e);
      }}
    >
      <div className="icon">{item.icon}</div>
      <div className="label">{item.label}</div>
    </Component>
  );
};

export default ClickableList;
