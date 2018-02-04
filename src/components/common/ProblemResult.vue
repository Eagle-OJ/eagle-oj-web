<template>
    <Tag :color="util.getProblemStatusColor(result)">
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

