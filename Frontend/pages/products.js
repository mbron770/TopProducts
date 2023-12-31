import Product from "../components/product";
import Cart from "../components/cart";
import { data } from "../context";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavigationBar from "../components/navbar";

export default function products() {
  const { allData } = useContext(data);
  const { user } = useContext(data);
  const { cart } = useContext(data);
  const { setCart } = useContext(data);
  const { setOrderNum } = useContext(data);
  const { orderNum } = useContext(data);
  const { transactions } = useContext(data);
  const productList = allData;
  const router = useRouter();

  if (user) {
    return (
      <>
        <NavigationBar />

        <Product productList={productList} setCart={setCart} cart={cart} />
      </>
    );
  } else {
    useEffect(() => {
      router.push("/");
    }, []);
  }
}
