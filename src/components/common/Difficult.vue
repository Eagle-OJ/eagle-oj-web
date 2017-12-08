<template>
    <span>
        <Tag style="cursor: unset" v-if="difficult==0" color="green">简单</Tag>
        <Tag style="cursor: unset" v-else-if="difficult==1" color="blue">中等</Tag>
        <Tag style="cursor: unset" v-else-if="difficult==2" color="red">困难</Tag>
        <Tag style="cursor: unset" v-else color="yellow">专家</Tag>
    </span>
</template>

<script>
export default {
    props: ['difficult']
}
</script>



