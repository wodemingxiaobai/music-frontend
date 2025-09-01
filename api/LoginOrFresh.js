import request from "@/utils/request";

function getCode(telephone){
    console.log('请求验证码');
    return request({
        url:`/captcha/sent?mobile=${telephone}`,
        method:'GET',
    })
}
function goLogin(telephone,code){
    return request({
        url:`/login/cellphone?mobile=${telephone}&code=${code}`,
        method:'GET',
    })
}
export { getCode,goLogin}