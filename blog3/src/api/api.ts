import request from '@/utils/request'
import qs from 'qs'

export function GET(url, params = {}){
    return request.get(url, params);
}

export function POST(url, data = {}, config = {}){
    // params.token = INIS.token || ''
    if (Object.prototype.toString.call(data) === '[object Object]') data = qs.stringify({...data})
    return request.post(url, data, config);
}