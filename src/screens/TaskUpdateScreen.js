import React from 'react';

import TaskForm from '../components/TaskForm';

export default TaskUpdateScreen = ({route}) => {
  const taskId = route.params?.taskId;
  return <TaskForm taskId={taskId} />;
};
