import React from "react";
import styles from "../styles/productBox.module.css";
import containerStyles from '../styles/productsContainer.module.css'
import { Button } from "react-bootstrap";


const ProductBox = ({comics}) => {
    

  return (

    <div
    className={containerStyles.container}
    >
        {comics.map((comic)=>{
            return (
                <div className={styles.container} key={comic.id}>
                            <div>
                                <div className={styles.imageContainer}>
                                <img  className={styles.image} src= {comic.img} alt="comic" />
                                </div>
                                <div className={styles.productName}>
                                    {comic.name}
                                </div>
                                <div className={styles.price}>
                                    {comic.price} $
                                </div>
                                <div >
                                    <Button className={styles.addToCart} >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                </div>
            )
        })}
    </div>
  );
};

export default ProductBox;
