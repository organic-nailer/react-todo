import React from "react";

export type FilterButtonProps = {
    name: string,
    pressed: boolean
};

export function FilterButton(props: FilterButtonProps) {
    return (
        <button type="button" className="btn toggle-btn" aria-pressed={props.pressed}>
          <span className="visually-hidden">Show </span>
          <span>{props.name}</span>
          <span className="visually-hidden"> tasks</span>
        </button>
    )
}