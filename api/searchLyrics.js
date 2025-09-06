import request from "@/utils/request";
function searchLyric(hash){
    return request({
        url: `/search/lyric?hash=${hash}`,
        method: "GET",
    })
}

export  {
    searchLyric
}