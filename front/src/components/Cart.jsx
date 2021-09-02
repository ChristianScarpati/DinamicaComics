import React, { useState, useEffect } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { Rating } from "primereact/rating"
import styles from "../styles/cart.module.css"
import { useDispatch, useSelector } from "react-redux"
import { getDataCart, deleteDataCart } from "../store/cart"
import { setCheckout } from "../store/checkout"
import { Link } from "react-router-dom"

const DataTableTemplatingDemo = () => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const user = useSelector(state => state.user)

  const handleClick = async (e, comic) => {
    e.preventDefault()
    const comicData = comic.comic
    const userId = user.id
    dispatch(deleteDataCart({ comicData, userId })).then(x => {
      dispatch(getDataCart()).then(data => {
        setProducts(data.payload[0]?.products)
      })
    })
  }

  const handleBuy = () => {
    dispatch(setCheckout()).then(data => {
      setProducts([])
    })
  }

  useEffect(() => {
    dispatch(getDataCart()).then(data => {
      setProducts(data.payload?.products ? data.payload?.products : null)
    })
  }, [dispatch])

  const formatCurrency = (value) => {
    return value?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.comic.img}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.comic.image}
        className={styles.imgProduct}
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.comic.price);
  };

  const nameBodyTemplate = (rowData) => {
    return <p>{rowData.comic.name}</p>;
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.comic.rating} readOnly cancel={false} />;
  };

  const quantityBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex" }}>
        {/*   <Button className={styles.boton} icon="pi pi-plus"></Button> */}{" "}
        <h6>{rowData.cantidad}</h6>
        {/*  <Button className={styles.boton} icon="pi pi-minus"></Button>{" "} */}
      </div>
    );
  };

  const buttonDeleteBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        onClick={(e) => handleClick(e, rowData)}
      ></Button>
    );
  };

  const header = `In total there are ${
    products ? products.length : 0
  } products in your cart.`;

  const footer = (
    <div className={styles.divFooter}>
      <Button
        onClick={handleBuy}
        icon="pi pi-wallet"
        className={styles.buttonBuy}
        style={{ width: "20%", margin: "0 auto" }}>
        Buy Cart
      </Button>
      <Link to="/history">
        <Button
          icon="pi pi-wallet"
          className={styles.buttonBuy}
          style={{ width: "20%", margin: "0 auto" }}>
          Shopping history
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="datatable-templating-demo">
      <div className="card">
        <DataTable value={products} header={header} footer={footer}>
          <Column field="name" header="Name" body={nameBodyTemplate}></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column
            field="rating"
            header="Rating"
            body={ratingBodyTemplate}
          ></Column>
          <Column header="Price" body={priceBodyTemplate}></Column>
          <Column header="Quantity" body={quantityBodyTemplate}></Column>
          <Column header="" body={buttonDeleteBodyTemplate}></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default DataTableTemplatingDemo;
