import React from 'react';
import { Card, Input, Button, Space, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

function DecisionsSection({ decisions, setDecisions }) {
  const addDecision = () => {
    setDecisions([...decisions, { id: Date.now(), text: '' }]);
  };

  const removeDecision = (id) => {
    setDecisions(decisions.filter((decision) => decision.id !== id));
  };

  const updateDecision = (id, newText) => {
    setDecisions(
      decisions.map((decision) =>
        decision.id === id ? { ...decision, text: newText } : decision
      )
    );
  };

  return (
    <Card bordered={false} size="small">
      <Title level={5}>3. Decisions Made</Title>
      <Text type="secondary">
        Extract key decisions or agreements made during the meeting.
      </Text>
      <Space direction="vertical" style={{ width: '100%', marginTop: '8px' }}>
        {decisions.map((decision, index) => (
          <Space
            key={decision.id}
            style={{ display: 'flex', marginBottom: 8 }}
            align="baseline"
          >
            <TextArea
              rows={1}
              value={decision.text}
              onChange={(e) => updateDecision(decision.id, e.target.value)}
              placeholder={`Decision ${index + 1}`}
              autoSize={{ minRows: 1, maxRows: 3 }}
              style={{ flex: 1 }}
            />
            {decisions.length > 1 && (
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeDecision(decision.id)}
                title="Remove decision"
              />
            )}
          </Space>
        ))}
        <Button
          type="dashed"
          onClick={addDecision}
          block
          icon={<PlusOutlined />}
        >
          Add Decision
        </Button>
      </Space>
    </Card>
  );
}

export default DecisionsSection;
