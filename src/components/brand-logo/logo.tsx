import { memo } from "react";

const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 43 40"
      width="43"
      height="40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className=""
      {...props}
    >
      <path
        d="M8 0H23C27.4183 0 31 3.58172 31 8V9H34C38.4183 9 42 12.5817 42 17V32C42 36.4183 38.4183 40 34 40H19C14.5817 40 11 36.4183 11 32V31H8C3.58172 31 0 27.4183 0 23V8C0 3.58172 3.58172 0 8 0ZM23 31H16V32C16 33.6569 17.3431 35 19 35H34C35.6569 35 37 33.6569 37 32V17C37 15.3431 35.6569 14 34 14H31V23C31 27.4183 27.4183 31 23 31ZM8 5C6.34315 5 5 6.34315 5 8V23C5 24.6569 6.34315 26 8 26H23C24.6569 26 26 24.6569 26 23V8C26 6.34315 24.6569 5 23 5H8Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(Logo);
