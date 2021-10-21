import React, {useEffect, useState} from 'react'
import axiosApiInstace from '../../configs/axios'

const Product = () => {
  const [products, setProducts] = useState([])


  useEffect(() => {
    axiosApiInstace.get('/v1/products')
    .then((res)=>{
      const result = res.data.data
      setProducts(result)
    })
  }, [])
  return (
    <div className="container">
      <ul class="list-group">
        {products.map((product)=>
          <li class="list-group-item">{product.name}</li>
        )}
      </ul>
    </div>
  )
}

export default Product
