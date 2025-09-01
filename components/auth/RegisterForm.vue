<template>
    <div class="register-container"> <!-- 新增外层容器类名，方便统一控制样式 -->
        <h1 class="form-title">用户注册</h1> <!-- 调整标题样式，和登录区分开 -->
        <!-- 调整标签宽度，适配内容-->
        <!-- 新增 form-card 类名做卡片样式 -->
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="80px" class="form-card">
            <!-- 用户注册信息 -->
            <el-form-item label="用户名" prop="name">
                <el-input v-model="registerForm.name" placeholder="请输入用户名" prefix-icon="el-icon-user">
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input :type="showPassWord ? 'text' : 'password'" v-model="registerForm.password" placeholder="请输入密码"
                    :prefix-icon="showPassWord ? 'el-icon-unlock' : 'el-icon-lock'">
                    <!-- 新增类名，优化图标样式 -->
                    <i slot="suffix" :class="[showPassWord ? 'el-icon-view' : 'el-icon-more']"
                        @click="showPassWord = !showPassWord" class="password-icon"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="registerForm.email" placeholder="请输入邮箱" prefix-icon="el-icon-message">
                </el-input>
            </el-form-item>
            <el-form-item label="验证码"> <!-- 注意这里 prop 之前写错成 name 了，修正！ -->
                <el-row :gutter="8">
                    <el-col :span="12" class="usercaptch"> <el-input  placeholder="请输入验证码"
                            prefix-icon="el-icon-picture"  prop="captcha">
                        </el-input></el-col>
                    <el-col :span="11.5" class="truecaptch">
                        <!-- 存放验证码 -->
                        <canvas ref="imgCaptcha" @click="refreshCaptcha" class="imgCaptcha"></canvas>
                        <!-- <el-input v-model="registerForm.captcha" placeholder="请输入验证码" prefix-icon="el-icon-picture">
                        </el-input> -->
                    </el-col>
                </el-row>

            </el-form-item>
            <!-- 记住用户和从注册转向登录 -->
            <el-form-item> <!-- 新增类名控制这一行布局 -->
                <div class="form-item-extra"> <!-- 新增这个容器 -->
                    <el-checkbox v-model="rememberMe">
                        记住我
                    </el-checkbox>
                    <el-link type="primary" :underline="false" @click="changeIsLogin">
                        已有账号，直接登录
                    </el-link>
                </div>
            </el-form-item>
            <!-- 事件按钮 -->
            <el-form-item class="button-group"> <!-- 新增类名控制按钮行 -->
                <div class="form-item-button"> <!-- 新增这个容器 -->
                    <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                    <el-button @click="resetForm('registerForm')">重置</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
export default {
    props: ['changeIsLogin'],
    name: '',
    data() {
        var validatePassWord = (rule, value, callback) => {
            const reg = /^[a-zA-Z0-9].{5,9}$/;
            if (!value) {
                return callback(new Error("密码不能为空"));
            }
            if (!reg.test(value)) {
                return callback(new Error("密码长度6-10，且字母或数字开头"));
            }
            callback();
        };
        var validateEmail = (rule, value, callback) => {
            const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                return callback(new Error("邮箱不能为空"));
            }
            if (!reg.test(value)) {
                return callback(new Error("邮箱不符合格式"));
            }
            callback();
        };
        //验证码验证规则
        var validateCaptcha=(rule, value, callback) => {
           
            if (!value) {
                return callback(new Error("验证码不能为空"));
            }
            if (value!=this.captchaCode) {
                return callback(new Error("验证码不对"));
            }
            callback();
        };
        return {
            registerForm: {
                name: "",
                password: "",
                email: '',
                
            },
            showPassWord: true,
            rememberMe: false,
            captchacode:'',
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
                email: [
                    {
                        validator: validateEmail,
                        trigger: "blur",
                        required: true,
                    }
                ],
                captcha: [ // 补充验证码校验规则，示例简单必填
                    { required: true,validator:validateCaptcha, trigger: "blur" }
                ]
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
            this.refreshCaptcha()
        },
        //这里是生成验证码
        refreshCaptcha(){
            const canvas = this.$refs.imgCaptcha;
            const ctx = canvas.getContext('2d');

            // 设置Canvas尺寸（与样式保持一致）
            canvas.width = 120;
            canvas.height = 40;

            // 1. 绘制背景（浅色，避免与文字冲突）
            ctx.fillStyle = '#f3f4f6';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 2. 生成随机验证码（4位字母+数字）
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let code = '';
            for (let i = 0; i < 4; i++) {
                code += chars[Math.floor(Math.random() * chars.length)];
            }
            this.captchaCode = code; // 保存正确的验证码

            // 3. 绘制验证码文字（随机样式增加识别难度）
            ctx.font = 'bold 22px Arial';
            code.split('').forEach((char, index) => {
                // 随机颜色（深色，与背景区分）
                ctx.fillStyle = `rgb(${Math.random() * 80}, ${Math.random() * 80}, ${Math.random() * 80})`;
                // 随机旋转角度（-30°到30°）
                const rotate = (Math.random() * 60 - 30) * Math.PI / 180;
                // 绘制文字（位置错开，避免重叠）
                ctx.save();
                ctx.translate(25 + index * 20, 25);
                ctx.rotate(rotate);
                ctx.fillText(char, 0, 0);
                ctx.restore();
            });

            // 4. 绘制干扰线（防止机器识别）
            for (let i = 0; i < 5; i++) {
                ctx.strokeStyle = `rgb(${Math.random() * 150}, ${Math.random() * 150}, ${Math.random() * 150})`;
                ctx.beginPath();
                ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.stroke();
            }

            // 5. 绘制噪点（增加干扰）
            for (let i = 0; i < 50; i++) {
                ctx.fillStyle = `rgb(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100})`;
                ctx.beginPath();
                ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
                ctx.fill();
            }
            
        }
    },
    mounted(){
        this.refreshCaptcha()
    }
}
</script>
  
<style scoped lang="less">
.register-container {

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

@media (max-width: 900px) {
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



}
</style>

