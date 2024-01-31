//@ts-nocheck
import task from '@/api/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const UseCreateTask = () => {
  const queryClient = useQueryClient();
  const createTaskMutation = useMutation({
    mutationFn: (data: unknown) => {
      return task.createTask(data);
    },
    onSuccess: (res: AxiosResponse) => {
      queryClient.invalidateQueries({ queryKey: ['allTask'] });
    },
  });
  return { createTaskMutation };
};

export default UseCreateTask;
