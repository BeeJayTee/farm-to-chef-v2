import { useEffect } from 'react'
import AddProduct from '../components/AddProduct'
import ProducerProduct from '../components/ProducerProduct'
import { useProductsContext } from '../hooks/useProductsContext'
import './styles/seller-dashboard.css'
import { useAuthContext } from '../hooks/useAuthContext'

const SellerDashboard = () => {
    const {products, dispatch} = useProductsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const producerID = JSON.parse(localStorage.getItem('user')).token

        const fetchProducts = async () => {
            const response = await fetch('http://localhost:4141/products/producer/' + producerID, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            
            if (response.ok) {
                dispatch({type: 'SET_PRODUCTS', payload: json})
            }
        }
        if (user) {
            fetchProducts()
        }
    }, [dispatch, user])

    return (
        <div className="SellerDashboard container">
            <div className="main">
                <div className="products">
                    {products && <ProducerProduct />}
                </div>
                <AddProduct />
            </div>
        </div>

    )
}

export default SellerDashboard