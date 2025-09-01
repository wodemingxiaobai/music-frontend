import request from "@/utils/request";

export function getrecommendedSongs(id) {
  return request({
    url: `/top/card?card_id=${id}`,
    method: "GET",
  });
}
