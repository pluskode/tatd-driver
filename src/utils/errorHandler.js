import Toast from 'react-native-toast-message';
import { translations } from '../constants/translations';

export const handleApiError = (error, currentLanguage = 'english') => {
  const t = translations[currentLanguage]?.errors || translations.english.errors;
  let message = t.unknown;

  if (error.response) {
    // The server responded with a status code outside the 2xx range
    const status = error.response.status;
    const serverData = error.response.data;

    // Extract message from response if available
    let extractedMessage = '';
    if (serverData) {
      if (typeof serverData === 'string') {
        extractedMessage = serverData;
      } else if (serverData.message) {
        extractedMessage = serverData.message;
      } else if (serverData.error) {
        extractedMessage = serverData.error;
      }
    }

    if (status === 400 || status === 422) {
      message = extractedMessage || t.validation;
    } else if (status >= 500) {
      message = t.server;
    } else {
      message = extractedMessage || t.unknown;
    }
  } else if (error.code === 'ECONNABORTED' || error.message?.toLowerCase().includes('timeout')) {
    message = t.timeout;
  } else if (error.request) {
    // The request was made but no response was received (Network is offline/unreachable)
    message = t.network;
  } else {
    // Something happened in setting up the request that triggered an Error
    message = error.message || t.unknown;
  }

  // Display global toast message
  Toast.show({
    type: 'error',
    text1: t.title,
    text2: message,
    position: 'top',
    visibilityTime: 4000,
  });

  return message;
};
