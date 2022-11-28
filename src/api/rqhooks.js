import {useQuery, useMutation, useQueryClient} from 'react-query';
import {
  fetchTasks,
  fetchTaskById,
  addNewTask,
  updateTask,
  deleteTask,
} from './utils/tasks';

import {
  fetchMembers,
  fetchMemberById,
  addNewMember,
  updateMember,
  deleteMember,
} from './utils/members';

export const useTasks = (enabled = true) => {
  const queryResult = useQuery(['tasks'], fetchTasks, {
    enabled,
    staleTime: 10,
  });
  return queryResult;
};

export const useTaskById = (taskId, enabled = true) => {
  console.log('params:', taskId);
  const queryResult = useQuery(['tasks', taskId], fetchTaskById, {
    enabled,
    staleTime: 10,
  });
  return queryResult;
};

export const useAddNewTask = () => {
  const queryClient = useQueryClient();
  return useMutation(addNewTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTask, {
    onSuccess: (data, variables, context) => {
      // console.log('variables:', variables);
      // console.log('context:', context);
      queryClient.invalidateQueries(['tasks', variables.id]);
      queryClient.invalidateQueries(['tasks']);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTask, {
    onSuccess: (data, variables, context) => {
      console.log('variables:', variables);
      // console.log('context:', context);
      // queryClient.invalidateQueries(['tasks', variables.id]);
      queryClient.invalidateQueries(['tasks']);
    },
    onError: error => {
      console.log('-----------------------------', error);
    },
  });
};

export const useMembers = (enabled = true) => {
  const queryResult = useQuery(['members'], fetchMembers, {
    enabled,
    staleTime: 10,
  });
  return queryResult;
};

export const useMemberById = (memberId, enabled = true) => {
  console.log('params:', memberId);
  const queryResult = useQuery(['members', memberId], fetchMemberById, {
    enabled,
    staleTime: 10,
  });
  return queryResult;
};

export const useAddNewMember = () => {
  const queryClient = useQueryClient();
  return useMutation(addNewMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(['members']);
    },
  });
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  return useMutation(updateMember, {
    onSuccess: (data, variables, context) => {
      // console.log('variables:', variables);
      // console.log('context:', context);
      queryClient.invalidateQueries(['members', variables.id]);
      queryClient.invalidateQueries(['members']);
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteMember, {
    onSuccess: (data, variables, context) => {
      console.log('variables:', variables);
      // console.log('context:', context);
      // queryClient.invalidateQueries(['members', variables.id]);
      queryClient.invalidateQueries(['members']);
    },
    onError: error => {
      console.log('-----------------------------', error);
    },
  });
};
