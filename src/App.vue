<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<svg-icon></svg-icon>
    </div>
</template>

<script>
	import svgIcon from './components/common/svg';
  	export default {
    	components:{
            svgIcon
        },
  	}

</script>

<style lang="scss">
  /* 避免编辑器自动编译.scss文件成.css文件 ,所以导入的时候写全后缀名 */
  @import './style/common.scss';
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
