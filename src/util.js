export default {
    getContestTimeType(type) {
        if (type == 1 || type == 4) {
            return '限时'
        } else {
            return '不限时'
        }
    },
    getContestType(type) {
        if (type == 0 || type == 3) {
            return '普通比赛'
        } else {
            return 'ACM比赛'
        }
    }
}