import React from 'react';
import { Card, Input, Typography } from 'antd';

const { Title, Text } = Typography;
const { TextArea } = Input;

function DiscussionPointsSection({ discussionPoints, setDiscussionPoints }) {
  return (
    <Card bordered={false} size="small">
      <Title level={5}>5. Key Discussion Points (Optional)</Title>
      <Text type="secondary">
        Add any crucial discussion points or context not covered above.
      </Text>
      <TextArea
        value={discussionPoints}
        onChange={(e) => setDiscussionPoints(e.target.value)}
        rows={5}
        placeholder="e.g., 'The team discussed the challenges of remote collaboration and proposed a new weekly sync meeting.'"
        style={{ marginTop: '8px' }}
      />
    </Card>
  );
}

export default DiscussionPointsSection;
