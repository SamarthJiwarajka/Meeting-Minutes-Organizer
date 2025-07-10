import React from 'react';
import { Card, Input, Button, Space, Typography, DatePicker } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function ActionItemsSection({ actionItems, setActionItems }) {
  const addActionItem = () => {
    setActionItems([
      ...actionItems,
      { id: Date.now(), description: '', owner: '', deadline: null },
    ]);
  };

  const removeActionItem = (id) => {
    setActionItems(actionItems.filter((item) => item.id !== id));
  };

  const updateActionItem = (id, field, value) => {
    setActionItems(
      actionItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <Card bordered={false} size="small">
      <Title level={5}>4. Action Items</Title>
      <Text type="secondary">
        Identify who is responsible for what, and by when.
      </Text>
      <Space direction="vertical" style={{ width: '100%', marginTop: '8px' }}>
        {actionItems.map((item, index) => (
          <Card
            key={item.id}
            size="small"
            style={{ width: '100%', border: '1px solid #f0f0f0' }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>Description:</Text>
                <Input
                  value={item.description}
                  onChange={(e) =>
                    updateActionItem(item.id, 'description', e.target.value)
                  }
                  placeholder={`Action Item ${index + 1}`}
                  style={{ marginTop: '4px' }}
                />
              </div>
              <Space style={{ width: '100%' }}>
                <div style={{ flex: 1 }}>
                  <Text strong>Owner:</Text>
                  <Input
                    value={item.owner}
                    onChange={(e) =>
                      updateActionItem(item.id, 'owner', e.target.value)
                    }
                    placeholder="e.g., John Doe"
                    style={{ marginTop: '4px' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Text strong>Deadline:</Text>
                  <DatePicker
                    value={item.deadline}
                    onChange={(date) =>
                      updateActionItem(item.id, 'deadline', date)
                    }
                    style={{ width: '100%', marginTop: '4px' }}
                    format="YYYY-MM-DD"
                  />
                </div>
              </Space>
              {actionItems.length > 1 && (
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeActionItem(item.id)}
                  block
                  style={{ marginTop: '8px' }}
                  title="Remove action item"
                >
                  Remove Action Item
                </Button>
              )}
            </Space>
          </Card>
        ))}
        <Button
          type="dashed"
          onClick={addActionItem}
          block
          icon={<PlusOutlined />}
        >
          Add Action Item
        </Button>
      </Space>
    </Card>
  );
}

export default ActionItemsSection;
