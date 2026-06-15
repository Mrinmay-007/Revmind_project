


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'


import Products from './pages/Products'


export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
         
         
           <Route path="/products" element={<Products />} />
           
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
