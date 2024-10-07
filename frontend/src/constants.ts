import dayjs from 'dayjs';

export const API_URL = 'http://localhost:8000';

export const setDate = (date: string) => {
  const currentDate = new Date().toISOString();
  if (dayjs(date).format('DD.MM.YYYY') === dayjs(currentDate).format('DD.MM.YYYY')) {
    return 'Today ' + dayjs(date).format('HH:mm');
  } else if (dayjs(date).format('MM.YYYY') === dayjs(currentDate).format('MM.YYYY')
    && (parseFloat(dayjs(currentDate).format('DD')) - parseFloat(dayjs(date).format('DD'))) === 1) {
    return 'Yesterday ' + dayjs(date).format('HH:mm');
  } else if (dayjs(date).format('YYYY') === dayjs(currentDate).format('YYYY')) {
    return dayjs(date).format('DD.MM HH:mm');
  } else return dayjs(date).format('DD.MM.YYYY HH:mm');
};