import React from "react";
import { useColorModeValue } from "@chakra-ui/react";

export function ArrowForwardIcon({ s = 24, color = { a: "#fff", b: "#000" } }) {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-mail"
        width={s}
        height={s}
        // viewBox="0 0 24 24"
        strokeWidth="1.8"
        stroke={useColorModeValue(color.a, color.b)}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="5" y1="12" x2="19" y2="12" />
        <line x1="13" y1="18" x2="19" y2="12" />
        <line x1="13" y1="6" x2="19" y2="12" />
      </svg>
    </span>
  );
}
