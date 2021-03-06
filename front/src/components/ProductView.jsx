import React, { useEffect, useState } from "react"
import styles from "../styles/productView.module.css"
import { Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { getComic } from "../store/comic"
import { setDataCart } from "../store/cart"
import { Link } from "react-router-dom"

const ProductView = ({ comicId }) => {
  const dispatch = useDispatch()
  const [cantidad, setCantidad] = useState(1)

  const comic = useSelector(state => state.comic)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getComic(comicId))
  }, [dispatch, comicId])

  const handleChange = e => {
    e.preventDefault()
    const cantidadInput = e.target.value
    setCantidad(cantidadInput)
  }

  const handleClick = (e, comic, cantidad) => {
    const userId = user.id
    e.preventDefault()
    dispatch(setDataCart({ comic, cantidad, userId })).then(res => console.log(res))
  }
  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <div className={styles.boxTop}>
          <div className={styles.boxLeft}>
            <img className={styles.image} src={comic.img} alt={comic.name} />
          </div>
          <div className={styles.boxRight}>
            <div className={styles.title}> {comic.name} </div>
            <div className={styles.price}> ${comic.price} </div>
            <div>
              <Button
                onClick={e => handleClick(e, comic, cantidad)}
                className={styles.cartButton}>
                Add to Cart !
              </Button>
            </div>
            <div>
              <input required onChange={handleChange} placeholder="cantidad" />
            </div>
            <div>
              <Link to={`/review/${comicId}`}>{user.id ? "Ir a las reviews" : ""}</Link>
            </div>
          </div>
        </div>
        <div className={styles.description}>{comic.plot}</div>
      </div>
    </div>
  )
}

export default ProductView
