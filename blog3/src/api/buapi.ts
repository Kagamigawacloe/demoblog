import burequest from '@/utils/burequest'

/**
 * 获取所有的标签 非分页获取
 * @returns
 */
export const getCalendar = () => {
  return burequest({
    method: 'get',
    url: '/calendar'
  })
}

export function GET(url, params = {}){
    return burequest.get(url, params);
}