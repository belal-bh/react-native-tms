export const getMemberObjectSerializable = data => {
  const member = {
    id: typeof data?.id === 'number' ? data.id : NaN,
    name: data?.name ? data.name : '',
    createdAt: data?.createdAt ? data.createdAt : null,
    updatedAt: data?.updatedAt ? data.updatedAt : null,
    userId: typeof data?.userId === 'number' ? data.userId : NaN,

    status: 'idle',
    error: null,
    requiredReload: false,
  };
  return member;
};

export const getMemberObjectListSerializable = data => {
  return data.map(d => getMemberObjectSerializable(d));
};
