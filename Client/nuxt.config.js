import {resolve} from "path"
export default {
  alias: {
    'images': resolve(__dirname,'./assets/images'),
    'UI': resolve(__dirname, './components/UI'),
    'comp': resolve(__dirname,'./components')
  },
  css:[
    '~/assets/css/main.css'
  ],
  buildModules: ['@nuxtjs/tailwindcss']
}