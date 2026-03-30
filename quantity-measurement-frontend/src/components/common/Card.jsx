import React from "react";
import "./card.css";

/**
 * props:
 * - children: A special React prop that allows you to pass
 * elements/components inside the <Card>...</Card> tags.
 */
const Card = ({ children }) => {
  // Logic: Acts as a "Layout Component." It provides the outer
  // styling (.card) while remaining flexible about what lives inside.
  return <div className="card">{children}</div>;
};

export default Card;
