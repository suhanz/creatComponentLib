import { createApp } from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
import App from './App'

// h和createElement类似创建节点，最终返回的是vnode对象（虚拟dom）
// vue文件的最终渲染还是js，大x概如下

createApp(App).mount('#app')
