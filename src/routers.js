import Router from 'vue-router'

//导入nav 底部切换路由的组件
import homeContainer from './navbarContainer/homeContainer.vue'
import memberContainer from './navbarContainer/memberContainer.vue'
import searchContainer from './navbarContainer/searchContainer.vue'
import shoopcarContainer from './navbarContainer/shoopcarContainer.vue'

var router = new Router({
	routes:[
	 {path:'/home',component:homeContainer},//home 路由匹配规则
	 {path:'/member',component:memberContainer},//menber 路由匹配规则
	 {path:'/shoopcar',component:shoopcarContainer},//shoopcar路由匹配规则
	 {path:'/search',component:searchContainer},//search路由匹配规则
	],
	linkActiveClass:'mui-active',//mui的选中类覆盖默认路由的高亮。默认的高亮类 link-active-class
})
export default router //向外暴露对象router