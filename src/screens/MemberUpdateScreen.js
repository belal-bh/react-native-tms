import React from 'react';

import MemberForm from '../components/MemberForm';

export default MemberUpdateScreen = ({route}) => {
  const memberId = route.params?.memberId;
  return <MemberForm memberId={memberId} />;
};
