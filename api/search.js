import request from "@/utils/request";

/**
 * 获取默认搜索关键词
 */
function getDefaultSearchKeyword() {
  return request({
    url: "/search/default",
    method: "GET",
  });
}

/**
 * 搜索音乐/视频/歌单等信息
 * @param {Object} params - 搜索参数
 * @param {string} params.keyword - 搜索关键词
 * @param {number} [params.page=1] - 页码
 * @param {number} [params.pagesize=30] - 每页数量
 * @param {string} [params.type='song'] - 搜索类型：song/special/lyric/album/author/mv
 */
function search(keyword,page,pagesize) {
  return request({
    url: `/search?keywords=${keyword}&page=${page}&pagesize=${pagesize}`,
    method: "GET",
  });
}



export default {
  getDefaultSearchKeyword,
  search,
 
};
