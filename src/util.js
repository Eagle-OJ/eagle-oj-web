import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import format from 'date-fns/format'
import cn from 'date-fns/locale/zh_cn'

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
            return 'OI模式'
        } else {
            return 'ACM模式'
        }
    },
    getContestStatus(status) {
        if(status == 0) {
            return '编辑中'
        } else if (status == 1) {
            return '已启用'
        } else {
            return '已关闭'
        }
    },
    convertProblemStatus(text) {
        switch(text) {
            case 'AC':
                return 'Accepted'
            case 'WA':
                return 'Wrong Answer'
            case 'RTE':
                return 'Runtime Error'
            case 'TLE':
                return 'Time Limit Excceed'
            case 'CE':
                return 'Compile Error'
            default:
                return 'Server Error'
        }
    },
    getProblemStatusColor(text) {
        switch(text) {
            case 'AC':
                return '#4bc0c0'
            case 'WA':
                return '#ff6384'
            case 'RTE':
                return '#ffcd56'
            case 'TLE':
                return '#36a2eb'
            case 'CE':
                return '#ff9f40'
            default:
                return '#ed3f14'
        }
    },
    getACRate(ACTimes, totalTimes) {
        if (totalTimes == 0) {
            return '0.00%'
        } else {
            totalTimes = parseFloat(totalTimes)
            ACTimes = parseFloat(ACTimes)
            return ((ACTimes/totalTimes)*100).toFixed(2)+'%'
        }
    },
    getDistanceTime(time) {
        return distanceInWordsToNow(new Date(time), {locale: cn, addSuffix: true})
    },
    getFormatTime(time, formatString) {
        return format(new Date(time), formatString)
    },
    getUserRole(type) {
        if (type == 0) {
            return '普通用户'
        } else if (type == 8) {
            return '管理员'
        } else {
            return 'ROOT'
        }
    }
}