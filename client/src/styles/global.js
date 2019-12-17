import { createGlobalStyle } from "styled-components/macro"

export default createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  a, li {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  .center {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .slide-in-left-enter {
    transform: translateX(-100%);
  }

  .slide-in-left-enter-active {
    transform: translateX(0);
    opacity: 1;
    transition: all 200ms;
  }
  
  .slide-in-left-exit {
    transform: translateX(0%);
    opacity: 1;
  }
  
  .slide-in-left-exit-active {
    transform: translateX(-100%);
    opacity: 0;
    transition: all 200ms;
  }

  // MODAL
  .modal {
  z-index: 100;
  position: fixed;
  top: 22vh;
  left: 10%;
  width: 80%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 8px;
  }

  .modal__header {
    width: 100%;
    padding: 1rem 0.5rem;
    background: #2a006e;
    color: white;
  }

  .modal__header h2 {
    margin: 0.5rem;
  }

  .modal__content {
    padding: 1rem 0.5rem;
  }

  .modal__footer {
    padding: 1rem 0.5rem;
  }

  @media (min-width: 768px) {
    .modal {
      left: calc(50% - 20rem);
      width: 40rem;
    }
  }

  .modal-enter {
    transform: translateY(-10rem);
    opacity: 0;
  }

  .modal-enter-active {
    transform: translateY(0);
    opacity: 1;
    transition: all 200ms;
  }

  .modal-exit {
    transform: translateY(0);
    opacity: 1;
  }

  .modal-exit-active {
    transform: translateY(-10rem);
    opacity: 0;
    transition: all 200ms;
  }

  // INVALID FORM HANDLER
  .form__invalid {
    label, p {
    color: red;
    }
    input, textarea {
      border-color: red !important;
      background: #ffd1d1 !important;
    }
  }
`
