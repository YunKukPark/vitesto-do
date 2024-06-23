import { TODO_LIST_MOCK } from '../__mocks__/handlers';
import { Status, Todo } from '../services/task.schema';
import { taskReducer } from '../useTaskReducer';

describe('🔧 taskReducer', () => {
  it('📍 SET_TODOS :: TODO 배열이 주어졌을 때, 다음 state는 새로 들어온 배열로 대체된다', () => {
    const initialState: Array<Todo> = [];
    const action = { type: 'SET_TODOS' as const, payload: TODO_LIST_MOCK };
    const newState = taskReducer(initialState, action);

    expect(newState).toEqual(TODO_LIST_MOCK);
  });

  it('📍 CHANGE_STATUS :: id, status가 주어졌을 때, 해당 id를 가진 할 일의 status가 업데이트된다.', () => {
    const initialState = TODO_LIST_MOCK;
    const action = {
      type: 'CHANGE_STATUS' as const,
      payload: { id: 1, status: Status.Completed },
    };
    const newState = taskReducer(initialState, action);

    expect(newState.find(todo => todo.id === 1)?.status).toBe(Status.Completed);
  });

  it('📍 DELETE_TODO :: id가 주어졌을 때, 해당 id를 가진 할 일이 목록에서 삭제된다', () => {
    const initialState = TODO_LIST_MOCK;
    const action = { type: 'DELETE_TODO' as const, payload: 1 };
    const newState = taskReducer(initialState, action);

    expect(newState.find(todo => todo.id === 1)).toBeUndefined();
  });

  it('📍 SORT_PRIORITY :: 할 일 목록이 우선순위(High, Medium, Low) 순으로 정렬된다', () => {
    const initialState = TODO_LIST_MOCK;
    const action = { type: 'SORT_PRIORITY' as const };
    const newState = taskReducer(initialState, action);

    expect(newState).toEqual([
      TODO_LIST_MOCK[0],
      TODO_LIST_MOCK[3],
      TODO_LIST_MOCK[5],
      TODO_LIST_MOCK[1],
      TODO_LIST_MOCK[4],
      TODO_LIST_MOCK[2],
    ]);
  });

  it('📍 SORT_STATUS :: 할 일 목록이 상태(NotStarted, Pending, InProgress, Completed) 순으로 정렬된다', () => {
    const initialState = TODO_LIST_MOCK;
    const action = { type: 'SORT_STATUS' as const };
    const newState = taskReducer(initialState, action);

    expect(newState).toEqual([
      TODO_LIST_MOCK[0],
      TODO_LIST_MOCK[2],
      TODO_LIST_MOCK[3],
      TODO_LIST_MOCK[1],
      TODO_LIST_MOCK[5],
      TODO_LIST_MOCK[4],
    ]);
  });
});
