import dayjs from "dayjs";

const getToday = () => dayjs();
const parseToFormattedDate = (date: string) => dayjs(date).format('YYYY년 MM월 DD일');

export {
  getToday,
  parseToFormattedDate
}
