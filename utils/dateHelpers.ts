import dayjs from 'dayjs';

export const formatDate = (date: string | Date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

export const getDaysBetween = (date1: string, date2: string) => {
  return dayjs(date1).diff(dayjs(date2), 'day');
};

export const addDays = (date: string, days: number) => {
  return dayjs(date).add(days, 'day').format('YYYY-MM-DD');
};

export const getStartOfMonth = (date: string) => {
  return dayjs(date).startOf('month').format('YYYY-MM-DD');
};

export const getEndOfMonth = (date: string) => {
  return dayjs(date).endOf('month').format('YYYY-MM-DD');
};

export const isToday = (date: string) => {
  return dayjs(date).isSame(dayjs(), 'day');
};

export const getMonthName = (date: string) => {
  return dayjs(date).format('MMMM YYYY');
};
