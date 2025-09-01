import request from "@/utils/request";
function getSongUrl(hash) {
  return request({
    url: `/song/url?hash=${hash}`,
    method: "GET",
  });
}
export default getSongUrl
