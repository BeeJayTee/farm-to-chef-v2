

const ProducerProduct = ({products}) => {
    return (
        <div className="producer-products">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Price per Unit</th>
                        <th>Minimum</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id} className={index % 2 === 0 ? 'dark-row' : ''}>
                            <td>{product.name}</td>
                            <td>{product.type}</td>
                            <td>{product.amount} {product.unit}</td>
                            <td>{product.pricePerUnit}</td>
                            <td>{product.minPurchase}</td>
                            <td>edit | delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProducerProduct