import { vi } from 'vitest';
import { formatDate, getDistanceDate } from '..';

describe('🔧 getDistanceDate', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      now: new Date('2024-06-25'),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('📍 주어진 날짜가 오늘 날짜보다 이전이면 "n일 전"을 반환한다', () => {
    const date = new Date('2024-06-06');
    const distance = getDistanceDate(date);
    expect(distance).toBe('19일 전');
  });

  it('📍 주어진 날짜가 오늘 날짜보다 이후면 "n일 남음"을 반환한다', () => {
    const date = new Date('2024-09-14');
    const distance = getDistanceDate(date);
    expect(distance).toBe('81일 남음');
  });
});

describe('🔧 formatDate', () => {
  it('📍 Date형식의 날짜를 받으면 YYYY년 MM월 DD일 형식으로 포맷 해야한다', () => {
    const date = new Date('2022-01-01');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('2022년 1월 1일');
  });
});
