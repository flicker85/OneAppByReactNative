import request from '../../../utils/request';
import formatDate from '../../../utils/formatDate';

export function fetchListByDay(date) {
  if(date) {
    return request(`http://v3.wufazhuce.com:8000/api/channel/one/${formatDate(date)}/0`, { method: 'GET' });
  } else {
    return request(`http://v3.wufazhuce.com:8000/api/channel/one/new/0`, { method: 'GET' });
  } 
}