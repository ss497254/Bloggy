import React from "react";
import { useColorModeValue } from "@chakra-ui/react";

export function CloseIcon({ w = "28px", h = "28px" }) {
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
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
  );
}
