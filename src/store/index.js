import { createStore } from 'vuex'
import customer from "./modules/customer";
import activity from "./modules/activity";
import settings from "./modules/settings";

export default createStore({
  modules: {
    customer,
    activity,
    settings
  }
})
