import React from 'react';
import { Card, Input, DatePicker, Space, Typography } from 'antd';
import dayjs from 'dayjs'; // Import Day.js for Ant Design DatePicker

const { Title, Text } = Typography;

function MeetingInfoForm({
  meetingTitle,
  setMeetingTitle,
  meetingDate,
  setMeetingDate,
}) {
  return (
    <Card bordered={false} size="small">
      <Title level={5}>2. Meeting Information</Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Text strong>Meeting Title:</Text>
          <Input
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            placeholder="e.g., Q3 Planning Session"
            style={{ marginTop: '4px' }}
          />
        </div>
        <div>
          <Text strong>Date of Meeting:</Text>
          <DatePicker
            value={meetingDate}
            onChange={(date) => setMeetingDate(date)}
            style={{ width: '100%', marginTop: '4px' }}
            format="YYYY-MM-DD"
          />
        </div>
      </Space>
    </Card>
  );
}

export default MeetingInfoForm;
