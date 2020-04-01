import moment from 'moment'


export function formatDateRange(start, end) {
  let startDate = moment(new Date(start))
  let endDate = moment(new Date(end))
  if (startDate.format('DDMMY') === endDate.format('DDMMY')) {
    return `${startDate.format('DD.MM.Y')}  ${startDate.format('HH:mm')} - ${endDate.format('HH:mm')}`
  }
  return `${startDate.format('DD.MM.Y')}  ${startDate.format('HH:mm')} - ${endDate.format('HH:mm')} (${endDate.format('DD.MM.Y')})`
}
