import {useQuery} from 'react-query';
import {fetchTasks} from './tasks';

export const useTasks = (key = '') => {
  const queryResult = useQuery(['tasks', key], fetchTasks, {staleTime: 10});
  return queryResult;
};
