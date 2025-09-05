import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    // 处理重复导航错误
    if (err.name === "NavigationDuplicated") {
      return err; // 静默处理
    }
    // 其他错误继续抛出
    throw err;
  });
};
// 全局捕获重复导航错误
/*router.beforeEach((to, from, next) => {
  // 如果是重复导航，直接放行（不报错）
  if (
    to.path === from.path &&
    JSON.stringify(to.query) === JSON.stringify(from.query)
  ) {
    next(false); // 阻止这次导航
  } else {
    next(); // 继续导航
  }
});*/
export default router;
