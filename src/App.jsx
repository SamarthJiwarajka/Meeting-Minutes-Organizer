import React, { useState, useMemo } from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import RawNotesInput from './RawNotesInput';
import MeetingInfoForm from './components/MeetingInfoForm';
import DecisionsSection from './components/DecisionsSection';
import ActionItemsSection from './components/ActionItemsSection';
import DiscussionPointsSection from './components/DiscussionPointsSection';
import MinutesPreview from './components/MinutesPreview';
import OutputActions from './components/OutputActions';
import './App.css';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

function App() {
  const [rawNotes, setRawNotes] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState(null);
  const [decisions, setDecisions] = useState([{ id: 1, text: '' }]);
  const [actionItems, setActionItems] = useState([
    { id: 1, description: '', owner: '', deadline: null },
  ]);
  const [discussionPoints, setDiscussionPoints] = useState('');

  // Function to generate the full minutes text for preview and output
  const generateMinutesText = useMemo(() => {
    let minutes = '';

    // Main Title
    minutes += `# Meeting Minutes\n\n`; // Top-level heading

    // Meeting Title (if provided)
    if (meetingTitle) {
      minutes += `## ${meetingTitle}\n`; // Second-level heading for meeting title
    }
    // Meeting Date (if provided)
    if (meetingDate) {
      minutes += `**Date:** ${meetingDate.format('YYYY-MM-DD')}\n\n`; // Bold the date label
    }

    // Decisions Section
    // Only include if there's at least one non-empty decision
    if (decisions.some((d) => d.text.trim() !== '')) {
      minutes += `### Decisions\n\n`; // Third-level heading
      decisions.forEach((decision) => {
        if (decision.text.trim() !== '') {
          minutes += `- ${decision.text.trim()}\n`; // Markdown list item
        }
      });
      minutes += '\n'; // Add an extra newline for spacing
    }

    // Action Items Section
    // Only include if there's at least one non-empty action item description
    if (actionItems.some((a) => a.description.trim() !== '')) {
      minutes += `### Action Items\n\n`; // Third-level heading
      actionItems.forEach((item) => {
        if (item.description.trim() !== '') {
          let line = `- **Action:** ${item.description.trim()}`;
          if (item.owner) {
            line += ` **| Owner:** ${item.owner.trim()}`; // Bold owner
          }
          if (item.deadline) {
            line += ` **| Due:** ${item.deadline.format('YYYY-MM-DD')}`; // Bold deadline
          }
          minutes += `${line}\n`;
        }
      });
      minutes += '\n'; // Add an extra newline for spacing
    }

    // Discussion Points Section
    if (discussionPoints.trim() !== '') {
      minutes += `### Discussion Points\n\n`; // Third-level heading
      minutes += `${discussionPoints.trim()}\n\n`; // Plain text, followed by extra newline
    }

    // Optional: Include raw notes for reference in preview (can be toggleable)
    // if (rawNotes.trim() !== '') {
    //   minutes += `### Raw Notes (for reference)\n\n`;
    //   minutes += `\`\`\`markdown\n${rawNotes.trim()}\n\`\`\`\n\n`; // Using markdown code block for raw notes
    // }

    return minutes;
  }, [
    meetingTitle,
    meetingDate,
    decisions,
    actionItems,
    discussionPoints,
    rawNotes,
  ]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <Title
          level={3}
          style={{ color: 'white', margin: 0, fontFamily: 'Share Tech' }}
        >
          📑 Meeting Minutes Organizer
        </Title>
      </Header>
      <Layout>
        <Sider
          width={400}
          className="sider"
          style={{ overflowY: 'auto', padding: '24px' }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <RawNotesInput rawNotes={rawNotes} setRawNotes={setRawNotes} />
            <MeetingInfoForm
              meetingTitle={meetingTitle}
              setMeetingTitle={setMeetingTitle}
              meetingDate={meetingDate}
              setMeetingDate={setMeetingDate}
            />
            <DecisionsSection
              decisions={decisions}
              setDecisions={setDecisions}
            />
            <ActionItemsSection
              actionItems={actionItems}
              setActionItems={setActionItems}
            />
            <DiscussionPointsSection
              discussionPoints={discussionPoints}
              setDiscussionPoints={setDiscussionPoints}
            />
          </Space>
        </Sider>
        <Content className="content" style={{ padding: '24px' }}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Title level={4}>Preview Minutes</Title>
              <MinutesPreview minutesText={generateMinutesText} />
            </Col>
            <Col span={24}>
              <OutputActions
                minutesText={generateMinutesText}
                meetingTitle={meetingTitle}
                meetingDate={meetingDate}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
