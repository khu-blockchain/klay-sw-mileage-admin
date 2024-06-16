import {css} from "@emotion/react";

export const GlobalStyle = css`
  * {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont,
    'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif !important;
    box-sizing: border-box;
  }

  /* other styles */
  html, body, #root {
    width: 100%;
    height: 100%;
    min-width: 1440px;
    line-height: 1.3 !important;
    --main-color: #a40f16;
    --kaikas-color: #3366FF;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  textarea,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button {
    padding: 0;
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  input, textarea {
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }

  input:focus {
    outline: none;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    -webkit-text-fill-color: #000000 !important;
  }

  video {
    border: 0;
    outline: 0;
  }

  //.custom-tooltip{
  //  padding: 14px;
  //  border-radius: 10px;
  //  background-color: var(--chakra-colors-blackAlpha-800);
  //  color: #ffffff;
  //}

  &::-webkit-scrollbar {
    width: 10px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: var(--chakra-colors-blackAlpha-300);
  }

`
