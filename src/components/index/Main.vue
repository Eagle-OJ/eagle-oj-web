<template>
	<div>
		<v-nav></v-nav>
		<router-view/>
	</div>
</template>

<script>
import Navgation from '@/components/index/Navigation'
export default {
	components: {
		'v-nav': Navgation
	}
}
</script>

<style lang="stylus">

</style>





