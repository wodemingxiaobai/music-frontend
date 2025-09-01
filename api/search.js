import request from "@/utils/request";

/**
 * 获取默认搜索关键词
 */
export function getDefaultSearchKeyword() {
  return request({
    url: '/search/default',
    method: 'GET'
  });
}

/**
 * 搜索音乐/视频/歌单等
 * @param {Object} params - 搜索参数
 * @param {string} params.keyword - 搜索关键词
 * @param {number} [params.page=1] - 页码
 * @param {number} [params.pagesize=30] - 每页数量
 * @param {string} [params.type='song'] - 搜索类型：song/special/lyric/album/author/mv
 */
export function search(params) {
  return request({
    url: '/search',
    method: 'GET',
    params
  });
}

export default {
  getDefaultSearchKeyword,
  search
};