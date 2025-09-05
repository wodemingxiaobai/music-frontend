import cookieAndStorage from "@/utils/cookieAndStorage";
// 读取所有Cookie并复制到localStorage
 function copyAllCookiesToLocalStorage() {
  cookieAndStorage.writeCookieToStorage('cachedStr')
}
//把本地存储放进cookie中
 function copyAllLocalStorageToCookies() {
  cookieAndStorage.writeStorageToCookie('cachedStr')
}
export default {
    copyAllCookiesToLocalStorage,
    copyAllLocalStorageToCookies,
}
