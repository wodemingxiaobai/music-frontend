<template>
    <div class="login-container">
        <h1 class="form-title">用户登录</h1>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" class="form-card">
            <!-- 用户登录信息 -->
             <!-- <el-form-item label="用户名或手机号" prop="name">
                <el-input v-model="loginForm.name" placeholder="请输入用户名" prefix-icon="el-icon-user">
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input :type="showPassWord ? 'text' : 'password'" v-model="loginForm.password" placeholder="请输入密码"
                    :prefix-icon="showPassWord ? 'el-icon-unlock' : 'el-icon-lock'"><i slot="suffix"
                        :class="[showPassWord ? 'el-icon-view' : 'el-icon-more']" @click="showPassWord = !showPassWord"></i>
                </el-input>
            </el-form-item>  -->
            <el-form-item label="手机号" >
                <el-input v-model="loginForm2.telephone" placeholder="请输入用户名" prefix-icon="el-icon-user">
                </el-input>
            </el-form-item>

            <el-form-item label="验证码"> <!-- 注意这里 prop 之前写错成 name 了，修正！ -->
                <el-row :gutter="8">
                    <el-col :span="12" class="usercaptch"> 
                        <el-input v-model="loginForm2.code" placeholder="请输入验证码" prefix-icon="el-icon-picture"
                            >
                        </el-input></el-col>
                    <el-col :span="11.5" class="truecaptch">
                        <!-- 存放验证码 -->
                        <el-button type="primary" @click="$api.getCode(loginForm2.telephone)">获取验证码</el-button>
                        <!-- <el-input v-model="registerForm.captcha" placeholder="请输入验证码" prefix-icon="el-icon-picture">
                        </el-input> -->
                    </el-col>
                </el-row>

            </el-form-item>
            <!-- 记住用户和从注册转向注册 -->
            <el-form-item>
                <div class="form-item-extra">
                    <el-checkbox v-model="rememberMe">
                        记住我
                    </el-checkbox>
                    <el-link type="primary" :underline="false" @click="changeIsLogin">
                        无账号，先注册
                    </el-link>
                </div>
            </el-form-item>
            <!-- 事件按钮 -->
            <!--<el-form-item>
                <div class="form-item-button">
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </div>

            </el-form-item>-->
            <el-form-item>
                <div class="form-item-button">
                    <el-button type="primary" @click="$api.goLogin(loginForm2.telephone,loginForm2.code)">登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: '',
    props: ['changeIsLogin'],
    data() {
        var validatePassWord = (rule, value, callback) => {
            const reg = /^[a-zA-Z0-9].{5,9}$/; //这个正则表达式表明密码必须字母或者数字开头，且
            if (!value) {
                return callback(new Error("密码不能为空"));
            }
            if (!reg.test(value)) {
                return callback(new Error("密码长度6-10，且字母或数字开头"));
            }
            callback(); //校验规则最好一定要调用callback后valid才会合法
        };
        return {
            loginForm: {
                name: "",
                password: "",

            },
            loginForm2: {
                telephone: "",
                code: "",

            },
            showPassWord: true,
            rememberMe: false,
            rules: {
                name: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        validator: validatePassWord,
                        trigger: "blur",
                        required: true,
                    },
                ],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert("在这里提交，但是还没有实现发送请求");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },

}
</script>

<style scoped lang="less">
.login-container {

    width: 100%;
    max-width: 400px;
    /* 限制表单最大宽度，避免太宽 */
    margin: 0 auto;
    padding: 20px;
    text-align: center;

    .form-title {
        margin-bottom: 20px;
    }

    .form-card {
        background-color: #fff;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
        padding: 20px;

        .form-item-extra {

            display: flex;
            justify-content: space-between;

        }

        .form-item-button {
            display: flex;
            justify-content: space-around;

        }

    }
}

/*@media (max-width: 900px) {
    .register-container {
        padding: 10px;

        .form-card {
            padding: 15px;

            .el-form-item {

                ::v-deep .el-form-item__label {
                    font-size: 1.5rem;
                }
            }

        }


    }



}*/
</style>