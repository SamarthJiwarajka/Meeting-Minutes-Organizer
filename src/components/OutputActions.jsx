import React from 'react';
import { Button, Space, message } from 'antd';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import dayjs from 'dayjs'; // Import dayjs to format the date consistently

// Add meetingTitle and meetingDate to the props
function OutputActions({ minutesText, meetingTitle, meetingDate }) {
  const handleCopyToClipboard = () => {
    if (minutesText.trim() === '') {
      message.warning('No content to copy!');
      return;
    }
    navigator.clipboard
      .writeText(minutesText)
      .then(() => {
        message.success('Minutes copied to clipboard!');
      })
      .catch((err) => {
        message.error('Failed to copy minutes.');
        console.error('Error copying:', err);
      });
  };

  const handleDownload = (format) => {
    if (minutesText.trim() === '') {
      message.warning('No content to download!');
      return;
    }

    // Generate filename based on meeting title and date
    let filename = 'meeting-minutes';

    // Sanitize meeting title for filename (remove invalid characters)
    const sanitizedTitle = meetingTitle
      ? meetingTitle.replace(/[^a-zA-Z0-9-]/g, '_').toLowerCase() // Replace non-alphanumeric with underscore, lowercase
      : '';

    if (sanitizedTitle) {
      filename += `-${sanitizedTitle}`;
    }

    if (meetingDate) {
      filename += `-${meetingDate.format('YYYY-MM-DD')}`;
    } else {
      // Fallback to current date if meetingDate is not set
      filename += `-${dayjs().format('YYYY-MM-DD')}`;
    }

    filename += `.${format}`;

    const blob = new Blob([minutesText], {
      type: `text/${format === 'md' ? 'markdown' : 'plain'}`,
    });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    message.success(`Minutes downloaded as ${filename}`);
  };

  return (
    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
      <Button
        type="default"
        icon={<CopyOutlined />}
        onClick={handleCopyToClipboard}
        disabled={minutesText.trim() === ''}
      >
        Copy to Clipboard
      </Button>
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        onClick={() => handleDownload('txt')}
        disabled={minutesText.trim() === ''}
      >
        Download as .txt
      </Button>
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        onClick={() => handleDownload('md')}
        disabled={minutesText.trim() === ''}
      >
        Download as .md
      </Button>
    </Space>
  );
}

export default OutputActions;
