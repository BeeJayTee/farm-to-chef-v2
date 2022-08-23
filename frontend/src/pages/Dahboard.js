import { useEffect, useState } from 'react'
import AddProduct from '../components/AddProduct'
import DashboardMenu from '../components/DashboardMenu'
import ProducerProduct from '../components/ProducerProduct'
import { useProductsContext } from '../hooks/useProductsContext'
import './styles/dashboard.css'

const Home = () => {
    const {products, dispatch} = useProductsContext()

    useEffect(() => {
        // test id for testing. Need to replace with current user ID after auth added
        const producerID = 'test id'

        const fetchProducts = async () => {
            const response = await fetch('http://localhost:4141/products/producer/' + producerID)
            const json = await response.json()
            
            if (response.ok) {
                dispatch({type: 'SET_PRODUCTS', payload: json})
            }
        }

        fetchProducts()
    }, [])

    return (
        <div className="home container">
            <nav>
                <DashboardMenu />
            </nav>
            <div className="main">
                <div className="products">
                    {products && <ProducerProduct />}
                </div>
                <AddProduct />
            </div>
        </div>

    )
}

export default Home