import Vue from "vue";
import App from "./App.vue";
import LikeNumber from "./components/LikeNumber.vue";
import LikeHeader from "./components/LikeHeader.vue";
import router from "./router";
import store from "./index";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css' // add
import 'bootstrap-vue/dist/bootstrap-vue.css' // add

Vue.use(BootstrapVue) // add
Vue.use(BootstrapVueIcons) // add
Vue.config.productionTip = false;
Vue.component("LikeNumber", LikeNumber);
Vue.component("LikeHeader", LikeHeader);



new Vue({
  router,
  store,
  render: h => h(App),
  watch:{
    lists:{
      handler(lists){
        listStorage.save(lists)
      },
      deep: true
    }
  },
  created(){
    this.lists = listStorage.fetch()
  }
}).$mount("#app");

var STORAGE_KEY = 'todos-vuejs'
var listStorage = {
  fetch: function() {
    var lists = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    lists.forEach(function(list, index) {
      list.id = index
    })
    listStorage.uid = lists.length
    return lists
  },
  save: function(lists) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
  }
}