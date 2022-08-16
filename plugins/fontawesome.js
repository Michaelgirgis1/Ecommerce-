import Vue from 'vue'
import { library, config, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas, faBars } from '@fortawesome/free-solid-svg-icons'

// Modify nuxt.config.js adding to the `css` and `plugins` sections.

// css: [
// '@fortawesome/fontawesome-svg-core/styles.css'
// ]
// to use class based icons
// import { dom } from '@fortawesome/fontawesome-svg-core'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(fas, faBars)

// Register the component globally
// eslint-disable-next-line vue/component-definition-name-casing
Vue.component('font-awesome-icon', FontAwesomeIcon)
dom.watch()
