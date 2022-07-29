import axios from 'axios';
import config from '../config';

const API_TOKEN = config.slackWebHook; //env에 달았던 웹 훅 url

// 슬랙 메세지 왼쪽 띠 색상
const colors = {
  primary: '#007bff',
  info: '#17a2b8',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
};

// 슬랙 에러 스택 보여주고 싶을 경우, 마크다운 안에 넣어 이쁘게 보여주려고 사용
export interface SlackMrkdwnFormat {
  title: string;
  value: string;
}

// 슬랙 메세지 담을 형태
export interface SlackMessageFormat {
  color: string; // 띠 컬러
  title: string; // Packman 서버 에러
  fields?: SlackMrkdwnFormat[];
  footer?: string; // From API Server [production]
}

// mrkdown
export interface SlackMessage {
  mrkdwn: boolean;
  text: string;
  attachments: SlackMessageFormat[];
}

const getChannels = () => {
  return {
    production: API_TOKEN,
  };
};

// 슬랙 알림 메세지 전송하는 함수
const sendMessage = async (message: SlackMessageFormat) => {
  if (!message) {
    console.log('메시지 포멧이 없습니다.');
    return;
  }

  // 보내줄 메세지 형태 작성
  const data: SlackMessage = {
    mrkdwn: true,
    text: '',
    attachments: [],
  };

  if (!message.title) {
    console.log('메시지 내용이 없습니다.');
    return;
  }

  message.footer = `From API Server [${config.env}]`;
  data.attachments.push(message);

  // 슬랙에 전송
  axios({
    url: getChannels().production,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
};

export default { sendMessage, colors };
