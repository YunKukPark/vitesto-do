// 우선순위를 정의하는 enum
export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

// 상태를 정의하는 enum
export enum Status {
  Pending = 'pending',
  InProgress = 'in progress',
  Completed = 'completed',
}

// Todo 객체의 타입 정의
export type Todo = {
  id: string | number;
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};
