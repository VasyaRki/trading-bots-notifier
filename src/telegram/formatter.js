import { buildOIMessage } from '../shared/utils/build-oi-message.js';
import { buildPumpMessage } from '../shared/utils/build-pump-message.js';

export const formatMessage = (data, type) => {
  if (type === 'oi') {
    return buildOIMessage(data);
  }

  if (type === 'pump') {
    return buildPumpMessage(data);
  }

  return '';
};
