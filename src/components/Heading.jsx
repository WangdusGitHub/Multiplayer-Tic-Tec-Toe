import React from "react";
import "./css/Heading.css";

export default function Heading({ text = "Heading" }) {
  return <div className="heading">{text}</div>;
}
