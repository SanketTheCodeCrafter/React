
import Example from "./example"

function App() {


  const comment="I am Sanket!"

  return (
    <>   {/* This is a fragment element used to wrap multiple elements at once as a single element because the component can only return only single element. */}
    <h1>Hello World, This is React with Vite! {comment} </h1>
    <Example />
    </>
  )
}

export default App
