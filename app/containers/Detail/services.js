import request from '../../utils/request';

export function fetchArticle(id, key) {
  return request(`http://v3.wufazhuce.com:8000/api/${key}/htmlcontent/${id}`, { method: 'GET' });
}