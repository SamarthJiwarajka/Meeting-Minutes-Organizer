import React from 'react';
import { Card, Typography } from 'antd';
import ReactMarkdown from 'react-markdown'; // For rendering Markdown

const { Text } = Typography;

// Install react-markdown: npm install react-markdown
function MinutesPreview({ minutesText }) {
  return (
    <Card bordered={true} style={{ minHeight: '300px' }}>
      {minutesText.trim() === '' ? (
        <Text type="secondary">
          Your generated meeting minutes will appear here.
        </Text>
      ) : (
        <ReactMarkdown>{minutesText}</ReactMarkdown>
      )}
    </Card>
  );
}

export default MinutesPreview;
