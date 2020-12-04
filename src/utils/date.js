import moment from 'moment'

export function formatDate(date) {
  if (!date) {
    return ''
  }
  return moment(date).format('YYYY-MM-DD')
}
export function formatDateTime(date) {
  if (!date) {
    return ''
  }
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}
