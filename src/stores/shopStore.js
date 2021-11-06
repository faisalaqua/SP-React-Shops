import { makeAutoObservable } from "mobx";
import instance from "./instance";

class ShopStore {
  constructor() {
    makeAutoObservable(this);
    // this will turn our class into a mobx store and all components can observe the changes that happen in the store
  }
  shops = [];

  createShop = async (newShop) => {
    try {
      const formData = new FormData();
      for (const key in newShop) {
        formData.append(key, newShop[key]);
      }
      const response = await instance.post("/shops", formData);
      this.shops.push(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: shopStore.js ~ line 16 ~ ShopStore ~ createShop= ~ error",
        error
      );
    }
  };

  fetchShops = async () => {
    try {
      const response = await instance.get("/shops");
      this.shops = response.data;
    } catch (error) {
      console.log("ShopStore -> fetchShops -> error", error);
    }
  };

  createProduct = async (shopId, product) => {
    try {
      const formData = new FormData();
      for (const key in product) {
        formData.append(key, product[key]);
      }
      const res = await instance.post(`shops/${shopId}/products`, product);
      const shop = this.shops.find((shop) => shop._id === shopId);
      shop.products.push(res.data);
    } catch (error) {
      console.log("error");
    }
  };
}

const shopStore = new ShopStore();
shopStore.fetchShops();

export default shopStore;
