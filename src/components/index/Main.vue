<template>
	<div>
		<v-nav></v-nav>
        <transition enter-active-class="animated fadeIn">
            <router-view/>
        </transition>
	</div>
</template>

<script>
import Navigation from '@/components/index/Navigation'
export default {
	components: {
        'v-nav': Navigation,
	}
}
</script>

<style lang="stylus">

</style>





