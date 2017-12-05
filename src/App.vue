<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'app',
    mounted() {
        document.body.removeChild(document.getElementsByClassName("loading")[0]); 
    }
}
</script>

<style lang="stylus">
#app
	width 100%
	height 100%
	#container
		max-width 1000px
		margin 0 auto
</style>
