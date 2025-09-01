import { getrecommendedSongs } from "@/api/recommend";
import getSongUrl from "@/api/songUrl";
import { getCode, goLogin } from "@/api/LoginOrFresh";
import searchApi from "@/api/search";
export default {
  getrecommendedSongs,
  getSongUrl,
  getCode,
  goLogin,
  ...searchApi,
};
