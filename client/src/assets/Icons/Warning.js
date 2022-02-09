import React from "react";
import { useColorModeValue } from "@chakra-ui/react";

export function WarningIcon({ w = "40px", h = "40px" }) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-x"
        width={w}
        height={h}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={useColorModeValue("#444", "#f2f2f2")}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 9v2m0 4v.01" />
        <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
      </svg>
    </div>
  );
}
