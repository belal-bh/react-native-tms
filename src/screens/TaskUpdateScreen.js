import React from 'react';

import TaskForm from '../components/TaskForm';

export default TaskUpdateScreen = ({route}) => {
  const task = route.params?.task;
  return <TaskForm task={task} />;
};
