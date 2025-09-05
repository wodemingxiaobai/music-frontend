import { getrecommendedSongs } from "@/api/recommend";
import getSongUrl from "@/api/songUrl";
import { getCode, goLogin } from "@/api/LoginOrFresh";
import searchApi from "@/api/search";
import cookieAndStorage from '@/api/cookieCopyStorage';
export default {
  getrecommendedSongs,
  getSongUrl,
  getCode,
  goLogin,
  ...searchApi,
  ...cookieAndStorage,
};
