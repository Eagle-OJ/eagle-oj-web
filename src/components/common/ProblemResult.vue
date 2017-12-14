<template>
    <Tag :style="{background: util.getProblemStatusColor(result), color: '#fff'}">
        {{util.convertProblemStatus(result)}}
    </Tag>
</template>

<script>
import Util from '@/util'
export default {
    props: ['result'],
    data() {
        return {
           util: Util 
        }
    }
}
</script>

