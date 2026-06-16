


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'


import Products from './pages/Products'
import Chat from './pages/Chat'


export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/chat"     element={<Chat />} />
           <Route path="/products" element={<Products />} />
           
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
