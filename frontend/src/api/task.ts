import ApiClient from './apiConfigs';

class TaskApi {
  endPoints = {
    allTasks: '/tasks',
    createTask: '/tasks',
    updateTask: '/tasks',
    deleteTask: '/tasks',
  };
  async getAllTask() {
    return await ApiClient?.http?.get(`${this.endPoints.allTasks}`);
  }
  async createTask(data: any) {
    return await ApiClient?.http?.post(this.endPoints.createTask, data);
  }
  async updateTask(id: any, data: any) {
    console.log('update data', data);
    return await ApiClient?.http?.put(`${this.endPoints.updateTask}/${id}`, {
      data,
    });
  }
  async deleteTask(id: any) {
    return await ApiClient?.http?.delete(`${this.endPoints.deleteTask}/${id}`);
  }
}

export default new TaskApi();
