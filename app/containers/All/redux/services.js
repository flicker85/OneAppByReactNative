import request from '../../../utils/request';

export function fetchSwiper() {
  return request('http://v3.wufazhuce.com:8000/api/banner/list/3', { method: 'GET' });
}

export function fetchTopics(lastID) {
  if(lastID) {
    return request(`http://v3.wufazhuce.com:8000/api/banner/list/4?last_id=${lastID}`, { method: 'GET' });
  } else {
    return request('http://v3.wufazhuce.com:8000/api/banner/list/4', { method: 'GET' });
  }
}