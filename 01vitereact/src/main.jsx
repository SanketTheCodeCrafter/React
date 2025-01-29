import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'

// <---- This will not render anything because it is incorrect method
// const reactElement = {
//   type: 'a',
//   props: {
//       href: 'http://www.google.com',
//       target: '_blank'
//   },
//   children: 'Click me to visit Google' // fixed case
// }


const username="Sanket"

// <---- This can be used to render the react component
const reactElement=React.createElement(
  'a',
  {
    href:'http://www.google.com',
    target: '_blank'
  },
  'Click to visit Google. This is rendered by reactElement',
  username
)

// <---- This is too another way to render the react component
const anotherElement=(
  <a href="http://www.google.com" target="_blank">Click me to visit Google. This is rendered by anotherElement</a>
)




createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

  
  // reactElement

  anotherElement


)
