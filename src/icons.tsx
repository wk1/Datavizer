import * as React from "react";

export default {
  bars: (
    <svg
      width="25"
      height="22"
      viewBox="0 0 25 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <rect y="14.3939" width="6.81818" height="7.57576" />{" "}
      <rect x="9.09091" y="7.57576" width="6.81818" height="14.3939" />{" "}
      <rect x="18.1818" width="6.81818" height="21.9697" />{" "}
    </svg>
  ),
  line: (
    <svg
      width="25"
      height="21"
      viewBox="0 0 25 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <path d="M0 21V4.99999L2.36141 6.52796C5.69979 8.6881 10.1667 7.61102 12.1538 4.1668C14.2113 0.600322 18.9017 -0.404368 22.2396 2.00636L25 3.99999V21H0Z" />{" "}
    </svg>
  ),
  scatter: (
    <svg
      width="25"
      height="23"
      viewBox="0 0 25 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <circle cx="3.57143" cy="10.7143" r="3.57143" />{" "}
      <circle cx="14.2857" cy="19.0476" r="3.57143" />{" "}
      <circle cx="21.4286" cy="3.57143" r="3.57143" />{" "}
    </svg>
  ),
  rectScatter: (
    <svg
      width="25"
      height="23"
      viewBox="0 0 25 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6_582)">
        <path d="M10.738 14.2857C12.7104 14.2857 14.3094 12.6868 14.3094 10.7143C14.3094 8.74186 12.7104 7.14288 10.738 7.14288L3.59511 7.14287C1.62267 7.14287 0.0236816 8.74185 0.0236816 10.7143C0.0236816 12.6867 1.62267 14.2857 3.59511 14.2857L10.738 14.2857Z" />
        <path d="M17.8808 22.5928C19.8533 22.5928 21.4522 20.9938 21.4522 19.0214C21.4522 17.049 19.8533 15.45 17.8808 15.45L10.738 15.45C8.76552 15.45 7.16653 17.049 7.16653 19.0214C7.16653 20.9938 8.76552 22.5928 10.738 22.5928L17.8808 22.5928Z" />
        <path d="M21.4286 7.14287C23.4011 7.14287 25 5.54388 25 3.57144C25 1.59899 23.4011 7.15256e-06 21.4286 7.15256e-06L14.2858 0C12.3133 0 10.7143 1.59898 10.7143 3.57143C10.7143 5.54388 12.3133 7.14286 14.2858 7.14286L21.4286 7.14287Z" />
      </g>
      <defs>
        <clipPath id="clip0_6_582">
          <rect width="25" height="23" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  upload: (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-upload"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
};
