import React from 'react';
import { Card, Input, Typography } from 'antd';

const { Title, Text } = Typography;
const { TextArea } = Input;

function RawNotesInput({ rawNotes, setRawNotes }) {
  return (
    <Card bordered={false} size="small">
      <Title level={5}>1. Paste Your Raw Meeting Notes</Title>
      <Text type="secondary">
        Copy and paste your unorganized notes or transcript here for reference.
      </Text>
      <TextArea
        value={rawNotes}
        onChange={(e) => setRawNotes(e.target.value)}
        rows={10}
        placeholder="e.g., 'John said we need to fix the bug by Friday. Sarah agreed to create the user stories. David will review the design mockups next week.'"
        style={{ marginTop: '8px' }}
      />
    </Card>
  );
}

export default RawNotesInput;
