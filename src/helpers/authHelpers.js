export const getUserObjectSerializable = data => {
  const member = {
    id: typeof data?.id === 'number' ? data.id : NaN,
    name: data?.name ? data.name : '',
    email: data?.email ? data.email : '',
    createdAt: data?.createdAt ? data.createdAt : null,
    updatedAt: data?.updatedAt ? data.updatedAt : null,
  };
  return member;
};

export const getUserObjectListSerializable = data => {
  return data.map(d => getUserObjectSerializable(d));
};
