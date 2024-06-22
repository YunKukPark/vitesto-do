import { useEffect, useState } from 'react';
import TaskService from './services/Task.service';
import { Priority, Status, Todo } from './services/task.schema';
import styled, { css } from 'styled-components';
import './App.css';
import { getDistanceDate } from './utils';
import { useTaskReducer } from './useTaskReducer';

function App() {
  const { todos, dispatch } = useTaskReducer();
  const [isAdding, setIsAdding] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  const handleClickAddTodoButton = () => {
    setIsAdding(prev => !prev);
  };

  const handleChangeAddTodoInput: React.ChangeEventHandler<
    HTMLInputElement
  > = e => {
    setNewTodo(e.currentTarget.value);
  };

  const handleChangeStatus =
    (id: Todo['id']) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const status = e.currentTarget.value as Status;
      dispatch({ type: 'CHANGE_STATUS', payload: { id, status } });
    };

  const handleDeleteTodo = (id: Todo['id']) => () => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleClickSortPriority = () => {
    dispatch({ type: 'SORT_PRIORITY' });
  };

  const handleClickSortStatus = () => {
    dispatch({ type: 'SORT_STATUS' });
  };

  const handlePressEnter: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key !== 'Enter' || newTodo.trim().length === 0) return;

    console.log(newTodo.trim(), 'newTodo.trim()');

    TaskService.postTodo({
      title: newTodo.trim(),
      dueDate: new Date(),
      priority: Priority.Medium,
      status: Status.NotStarted,
      createdAt: new Date(),
      updatedAt: null,
    }).then(data => {
      console.log('data: ', data);
      dispatch({ type: 'ADD_TODO', payload: data });
      setNewTodo('');
      setIsAdding(false);
    });
  };

  useEffect(() => {
    TaskService.getTodos().then(data => {
      dispatch({ type: 'INIT', payload: data });
    });
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Title>My Todo List</S.Title>
        <button aria-label="추가하기" onClick={handleClickAddTodoButton}>
          🌱
        </button>
      </S.Header>
      {isAdding && (
        <input
          type="text"
          placeholder="할 일을 입력해주세요"
          value={newTodo}
          onChange={handleChangeAddTodoInput}
          onKeyDown={handlePressEnter}
        />
      )}
      <S.Flex $gap="8px">
        <button onClick={handleClickSortPriority}>우선순위별</button>
        <button onClick={handleClickSortStatus}>상태별</button>
      </S.Flex>
      <S.TodoList>
        {todos.map(todo => (
          <S.TodoItem key={todo.id}>
            <S.Flex $gap="4px">
              <select
                value={todo.status}
                onChange={handleChangeStatus(todo.id)}
              >
                {Object.values(Status).map(status => (
                  <option key={status} value={status}>
                    {StatusBadgeMap[status]}
                  </option>
                ))}
              </select>
              <h3>{todo.title}</h3>
              <button onClick={handleDeleteTodo(todo.id)} aria-label="삭제">
                ❌
              </button>
            </S.Flex>
            <S.Flex $gap="8px">
              {todo.dueDate && (
                <p>Due Date: {getDistanceDate(new Date(todo.dueDate))}</p>
              )}
              <p>{PriorityBadgeMap[todo.priority]}</p>
            </S.Flex>
          </S.TodoItem>
        ))}
      </S.TodoList>
    </S.Container>
  );
}

export default App;

const StatusBadgeMap = {
  [Status.NotStarted]: '🔴',
  [Status.Pending]: '🟡',
  [Status.InProgress]: '🔵',
  [Status.Completed]: '🟢',
};

const PriorityBadgeMap = {
  [Priority.Low]: '⬇️',
  [Priority.Medium]: '➡️',
  [Priority.High]: '⬆️',
};

// styles...

type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'left'
  | 'right';

type AlignItems =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end';

function flexBox(jc: JustifyContent = 'center', ai: AlignItems = 'center') {
  return css`
    display: flex;
    justify-content: ${jc};
    align-items: ${ai};
  `;
}

const S = {
  Container: styled.div`
    ${flexBox()};
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
  `,

  Header: styled.header`
    ${flexBox('space-between')}
    width: 100%;
    padding: 1em;
    color: white;
  `,

  Title: styled.h1`
    font-size: 1.5em;
    text-align: center;
  `,

  Flex: styled.div<{ $gap?: string }>`
    ${flexBox()};
    gap: ${({ $gap }) => $gap};
  `,

  TodoList: styled.ul`
    ${flexBox('start', 'start')}
    list-style: none;
    flex-direction: column;
    gap: 8px;
  `,

  TodoItem: styled.li`
    ${flexBox('start', 'start')}
    list-style: none;
    flex-direction: column;
    width: 100%;
    padding: 1em;
    // 조금 어두운색으로
    background-color: #333;
    border-radius: 16px;
  `,
};
