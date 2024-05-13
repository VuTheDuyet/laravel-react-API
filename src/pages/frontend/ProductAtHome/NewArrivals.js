import React, { useState, useEffect } from 'react';
import productservice from "../../../services/ProductService";

function NewArrivals() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productservice.GET_PRODUCTS_BY_TAG_ID('products', "01796e39-105c-4ca4-b3aa-d92ef6659562")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <>
            <div className="product-showcase">
                <h2 className="title">New Arrivals</h2>

                {products.length > 0 && (
                    <div className="showcase-wrapper  has-scrollbar">
                        {products.reduce((acc, product, index) => {
                            if (index % 4 === 0) {
                                acc.push(
                                    <div className="showcase-container" key={index}>
                                        {products.slice(index, index + 4).map(product => (
                                            <div className="showcase" key={product.productId}>
                                                <a href="#" className="showcase-img-box">
                                                    <img
                                                        src={require(`../../../assets/images/products/${product.productGalleries[0].imagePath}`)}
                                                        alt={product.productName}
                                                        width={70}
                                                        className="showcase-img"
                                                    />
                                                </a>
                                                <div className="showcase-content">
                                                    <a href={`/detail-product/${product.productId}`}>
                                                        <h4 className="showcase-title">
                                                            {product.productName}
                                                        </h4>
                                                    </a>
                                                    <a href={`/detail-product/${product.productId}`} className="showcase-category">
                                                        {product.productCategories.map(category => category.category.categoryName).join(', ')}
                                                    </a>
                                                    <div className="price-box">
                                                        <p className="price">${product.salePrice.toFixed(2)}</p>
                                                        <del>${product.comparePrice.toFixed(2)}</del>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            }
                            return acc;
                        }, [])}
                    </div>
                )}

            </div>
        </>
    );
}

export default NewArrivals;
