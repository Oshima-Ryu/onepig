// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'

import { Header } from 'mint-ui';
import { Popup } from 'mint-ui';
import { Button, Cell } from 'mint-ui'
import { Radio } from 'mint-ui';

import { CellSwipe } from 'mint-ui';

Vue.config.productionTip = false

Vue.component(Header.name, Header);


Vue.component(Popup.name, Popup);
Vue.component(Button.name, Button);

Vue.component(Radio.name, Radio);
Vue.component(Cell.name, Cell);
Vue.component(CellSwipe.name, CellSwipe);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
