//@ts-nocheck
import task from '@/api/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const UseUpdateTask = () => {
  const queryClient = useQueryClient();
  const updateTaskMutation = useMutation({
    mutationFn: (taskData: any) => {
      return task.updateTask(taskData.taskId, taskData.data);
    },
    onSuccess: (res: AxiosResponse) => {
      queryClient.invalidateQueries({ queryKey: ['allTask'] });
    },
  });
  return { updateTaskMutation };
};

export default UseUpdateTask;
