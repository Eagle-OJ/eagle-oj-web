<template>
    <Icon v-if="status=='AC'" type="checkmark" color="#19be6b"/>
    <Icon v-else-if="status != undefined" type="minus-round" color="#ff9900"/>
</template>

<script>
export default {
    props: ['status'],
}
</script>

