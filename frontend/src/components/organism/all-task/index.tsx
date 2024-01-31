'use client';
import task from '@/api/task';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/atoms/input';
import Button from '@/components/atoms/button';
import UseCreateTask from '@/hooks/task/useCreateTask';
import UseUpdateTask from '@/hooks/task/useUpdateTask';
import UseDeleteTask from '@/hooks/task/useDeleteTask';

const AllTask = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['allTask'],
    queryFn: () => {
      return task.getAllTask();
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    id: '',
    title: '',
    description: '',
    status: '',
  });

  const onOpenModal = (taskToEdit: any) => {
    setTaskData(
      taskToEdit || { id: '', title: '', description: '', status: '' }
    );
    setOpen(true);
  };

  const onCloseModal = () => {
    setTaskData({ id: '', title: '', description: '', status: '' });

    setOpen(false);
  };
  const { createTaskMutation } = UseCreateTask();
  const { updateTaskMutation } = UseUpdateTask();
  const { deleteTaskMutation } = UseDeleteTask();

  const onSubmit = async (data: any) => {
    if (taskData.id) {
      updateTaskMutation.mutate({ taskId: taskData.id, data });
    } else {
      createTaskMutation.mutate(data);
    }
    setOpen(false);
  };
  const handleDeleteTask = async (taskId: any) => {
    deleteTaskMutation.mutate(taskId);
  };

  return (
    <div className="w-full">
      <Button text="Create" onClick={onOpenModal}></Button>
      {data &&
        data?.data?.data?.map((task: any) => (
          <div
            key={task.id}
            className="flex justify-between items-center mt-2 w-full"
          >
            <div>
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
            <div>
              <input
                type="checkbox"
                id={task.id}
                checked={task.status === 'completed'}
                // onChange={() => {
                //   handleCheckbox(task.id, task.status);
                // }}
                className="form-checkbox h-5 w-5 text-green-600"
              />
            </div>
            <div className="relative">
              <ul className="flex top-full mt-2 w-48 rounded-md   ring-opacity-5 group-hover:block">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => onOpenModal(task)}
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
            <Modal open={open} onClose={onCloseModal} center>
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'Title is required' }}
                    defaultValue={taskData.title}
                    render={({ field }) => (
                      <Input
                        fieldValues={field}
                        name="title"
                        id="title"
                        placeholder="Enter Your Title"
                        label="Title"
                        type="text"
                      />
                    )}
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: 'Description is required' }}
                    defaultValue={taskData.description}
                    render={({ field }) => (
                      <Input
                        fieldValues={field}
                        name="description"
                        id="description"
                        placeholder="Enter Your Description"
                        label="Description"
                        type="text"
                      />
                    )}
                  />
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                  <Button
                    text={taskData.id ? 'Update' : 'Create'}
                    type="submit"
                  />
                </form>
              </div>
            </Modal>
          </div>
        ))}
    </div>
  );
};

export default AllTask;
