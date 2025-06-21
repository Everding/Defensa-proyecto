import React from 'react'
import Header from '../components/Header'
import ProductsTable from '../components/CRUD/ProductsTable'
import Footer from '../components/Footer'

const CreatePage = () => {
  return (
    <div>
        <Header/>
        <ProductsTable/>
        <Footer/>
    </div>
  )
}

export default CreatePage