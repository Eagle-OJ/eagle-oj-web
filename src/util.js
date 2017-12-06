export default {
    getFormatTime: function getFormatTime(time) {
        let date = new Date(time)
        return date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()
    },
    getStandardTime: function getStandardTime(time) {
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()
        let hour = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds
    },
}