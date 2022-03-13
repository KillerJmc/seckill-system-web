import { createStore } from 'vuex'
import customer from "./modules/customer";
import activity from "./modules/activity";

export default createStore({
  modules: {
    customer,
    activity
  }
})
