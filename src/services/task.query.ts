import {
  QueryClient,
  queryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import TaskService from './Task.service';
import { Priority, Status, Todo } from './task.schema';
import { queryClient } from '../main';

export const taskQueryKeys = {
  all: () => ['tasks'],
  list: () => [...taskQueryKeys.all(), 'list'],
};

export const taskQueries = {
  list: () =>
    queryOptions({
      queryKey: taskQueryKeys.list(),
      queryFn: () => TaskService.getTodos(),
      select: data => data ?? [],
    }),
};

export const useGetTasks = () => {
  return useQuery(taskQueries.list());
};

export const useAddTask = () => {
  return useMutation({
    mutationFn: (body: Partial<Omit<Todo, 'id'>> & { title: string }) =>
      TaskService.postTodo({
        priority: Priority.Medium,
        status: Status.NotStarted,
        createdAt: new Date(),
        dueDate: null,
        updatedAt: null,
        ...body,
      }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.list(),
      }),
  });
};
