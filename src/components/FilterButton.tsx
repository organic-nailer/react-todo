import React, { useState } from "react";

export type FilterButtonProps = {
    name: string,
    pressed: boolean,
    filterSelected: (name: string) => void
};

export function FilterButton(props: FilterButtonProps) {
    const [filter, setFilter] = useState("All");
    return (
        <button type="button"
            className="btn toggle-btn"
            aria-pressed={props.pressed}
            onClick={() => props.filterSelected(props.name)}
        >
            <span className="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    )
}