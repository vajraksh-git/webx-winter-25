import React from "react";
import "./Item.css";

function Item(params) {
    return <div className="item">
            <button onClick={params.onDelete}>X</button>
            <label >{params.text}</label>
            </div>;
}
export default Item