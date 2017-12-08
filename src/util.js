export default {
    getContestTimeType(type, totalTime) {
        if (type == 1 || type == 3) {
            let time = totalTime/1000
            let h = Math.floor(time/3600)
            let m = Math.floor(time/60)
            return '限时'+h+'时'+m+'分'
        } else {
            return '到比赛结束'
        }
    },
    getContestType(type) {
        if (type == 0 || type == 1) {
            return '普通比赛'
        } else {
            return 'ACM比赛'
        }
    },
}