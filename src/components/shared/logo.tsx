import { SVGProps } from "react";
export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <path
      stroke="#fff"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M30 5 5 25v20l25 10 25-10V25L30 5Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={2}
      d="M15 35h30M25 20l10 20M35 20 25 40"
    />
  </svg>
);
