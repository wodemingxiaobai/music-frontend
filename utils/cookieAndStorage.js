 //cookie写入存储
 function writeCookieToStorage(storageName) {
    let cookieObj = {};
    let cookieAray = document.cookie.split("; ");
    cookieAray.forEach((pair) => {
      const [key, ...valueParts] = pair.split("=");
      if (key) {
        cookieObj[key] = decodeURIComponent(valueParts.join("=")); // 解码特殊字符
      }
    });
    localStorage.setItem(storageName, JSON.stringify(cookieObj));
  }
  //存储转cookie
  function writeStorageToCookie(storageName) {
    const storedStr = localStorage.getItem(storageName);
    if (!storedStr) return {};

    let cookieObj={};
    let cookieStr=''
    try {
        cookieObj= JSON.parse(storedStr); // 转为对象
    } catch (e) {
      console.error("读取本地Cookie失败：", e);
      return {};
    }
    Object.entries(cookieObj).forEach(([key, value]) => {
      // 拼接Cookie字符串（包含键值对和配置）
       cookieStr = `${key}=${encodeURIComponent(
        value
      )}; path='/'; `;
      document.cookie = cookieStr; // 逐个设置
    });
  }
  export default {
    writeCookieToStorage,
    writeStorageToCookie
  }