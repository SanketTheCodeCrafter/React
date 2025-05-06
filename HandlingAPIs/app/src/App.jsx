import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        setError(false)
        const response = await axios.get('/api/products?search=' + search, {
          signal: controller.signal
        })
        setProducts(response.data)
        console.log(response.data)
        setLoading(false)
      } catch (error) {
        // console.error('Error fetching products:', error)
        // setError(true)
        // setLoading(false)

        if(axios.isCancel(error)){
          console.log('Request cancelled:', error.message)
          return;
        }
      }

      //cleanup code
      return ()=>{
        controller.abort();
      }
    })()
  }, [search]) // Add `search` to the dependency array

  if (error) {
    return <h1>Something went wrong!</h1>
  }

  if (loading) {
    return <h1>Loading....</h1>
  }

  return (
    <>
      <h1>Hello World!</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update the search state
      />
      <h3>Number of products: {products.length}</h3>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.price}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App
