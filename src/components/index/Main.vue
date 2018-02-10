<template>
	<div>
		<v-nav></v-nav>
		<router-view/>
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





