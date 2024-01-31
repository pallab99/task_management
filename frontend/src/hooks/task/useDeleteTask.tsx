//@ts-nocheck
import task from '@/api/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const UseDeleteTask = () => {
  const queryClient = useQueryClient();
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: any) => {
      return task.deleteTask(taskId);
    },
    onSuccess: (res: AxiosResponse) => {
      queryClient.invalidateQueries({ queryKey: ['allTask'] });
    },
  });
  return { deleteTaskMutation };
};

export default UseDeleteTask;
