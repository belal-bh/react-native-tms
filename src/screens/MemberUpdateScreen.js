import React from 'react';

import MemberForm from '../components/MemberForm';

export default MemberUpdateScreen = ({route}) => {
  const member = route.params?.member;
  return <MemberForm member={member} />;
};
