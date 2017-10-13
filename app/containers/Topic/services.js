import request from '../../utils/request';

export function fetchTopic(id) {
  return request(`http://v3.wufazhuce.com:8000/api/topic/htmlcontent/${id}`, { method: 'GET' });
}