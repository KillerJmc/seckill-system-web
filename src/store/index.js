import { createStore } from 'vuex'
import customer from "./modules/customer";

export default createStore({
  modules: {
    customer
  }
})
