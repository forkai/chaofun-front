/*
 * @Description: 版本更新
 * @writer chengshengxing
 * @LastEditTime: 2019-12-25
 */

const fs = require("fs");
const path = require("path");
const basePath = path.resolve(__dirname, "../");
const version = {
  version: Date.now().toString()
};
try {
  process.chdir(`${basePath}/public`);
  fs.writeFileSync(`config.json`, JSON.stringify(version));
  console.log("版本号已更新为：", version);
  return process.exit(0);
} catch (e) {
  return console.error(`版本号更新失败：${e}`);
}
