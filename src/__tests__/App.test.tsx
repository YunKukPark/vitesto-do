import App from '../App';
import { Status } from '../services/task.schema';
import { cleanup, render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';

describe('⚛️ App Page', () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => cleanup());

  describe('⚛️ Todo List', () => {
    const user = userEvent.setup();

    describe('✨ 작업 읽기 기능', () => {
      test('📍 사용자는 앱 진입시 기록된 Todo list를 조회 할 수 있다', async () => {
        const todoItem = await screen.findAllByRole('listitem');

        expect(todoItem).toHaveLength(6);
      });
    });

    describe('✨ 작업 생성 기능', () => {
      test('📍 작업 생성 버튼을 클릭 할 수 있다', async () => {
        const addButton = screen.getByRole('button', { name: '추가하기' });
        expect(addButton).toBeInTheDocument();
      });

      test('📍 작업 생성 버튼을 클릭하면 작업 생성 input이 나타난다', async () => {
        const addButton = screen.getByRole('button', { name: '추가하기' });
        await user.click(addButton);

        const input = screen.getByPlaceholderText('할 일을 입력해주세요');
        expect(input).toBeInTheDocument();
      });

      test('📍 작업 생성 input에 값을 입력하고 Enter 키를 누르면 작업이 마지막에 생성된다', async () => {
        const addButton = screen.getByRole('button', { name: '추가하기' });
        await user.click(addButton);

        const input = screen.getByPlaceholderText('할 일을 입력해주세요');
        await user.type(input, '새로운 할 일{enter}');

        const todoItem = await screen.findAllByRole('listitem');
        expect(todoItem).toHaveLength(7);
        expect(todoItem[todoItem.length - 1]).toHaveTextContent('새로운 할 일');
      });

      test('📍 빈 작업 input에 Enter 키를 누르면 작업이 생성되지 않는다', async () => {
        const addButton = screen.getByRole('button', { name: '추가하기' });
        await user.click(addButton);

        const input = screen.getByPlaceholderText('할 일을 입력해주세요');
        await user.type(input, '{enter}');

        const todoItems = await screen.findAllByRole('listitem');
        expect(todoItems).toHaveLength(6); // Assuming the initial state has 6 items
      });
    });

    describe('✨ 작업 수정 기능', () => {
      // 수정 가능 : 예시는 status만
      test('📍 사용자는 상태를 수정할 수 있다', async () => {
        const todoList = await screen.findAllByRole('listitem');
        const todoItem = todoList[0];

        const select = todoItem.querySelector('select') as HTMLSelectElement;

        await userEvent.selectOptions(select, Status.Completed);
        expect(select.value).toBe(Status.Completed);

        await userEvent.selectOptions(select, Status.NotStarted);
        expect(select.value).toBe(Status.NotStarted);
      });
    });

    describe('✨ 작업 삭제 기능', () => {
      test('📍 사용자는 작업을 삭제할 수 있다', async () => {
        const deleteButtonList = await screen.findAllByRole('button', {
          name: '삭제',
        });

        const deleteButton = deleteButtonList[0];
        await user.click(deleteButton);

        const todoItems = await screen.findAllByRole('listitem');
        expect(todoItems).toHaveLength(5);
      });
    });
  });
});
