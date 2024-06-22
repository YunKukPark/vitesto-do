export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const getDistanceDate = (endDate: Date) => {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();
  const diffDate = Math.floor(diff / (1000 * 60 * 60 * 24));
  const suffix = diffDate > 0 ? '남음' : '전';
  const absDate = Math.abs(diffDate);
  return `${absDate}일 ${suffix}`;
};
