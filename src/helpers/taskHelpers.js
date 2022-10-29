export const getTaskObjectSerializable = data => {
  const task = {
    id: typeof data?.id === 'number' ? data.id : NaN,
    title: data?.title ? data.title : '',
    description: data?.description ? data.description : '',
    createdAt: data?.createdAt ? data.createdAt : null,
    updatedAt: data?.updatedAt ? data.updatedAt : null,
    userId: typeof data?.userId === 'number' ? data.userId : NaN,
    memberId: typeof data?.memberId === 'number' ? data.memberId : NaN,

    status: 'idle',
    error: null,
    requiredReload: false,
  };
  return task;
};

export const getTaskObjectListSerializable = data => {
  return data.map(d => getTaskObjectSerializable(d));
};
