module.exports = {
  root: true,
  env: {
    node: true
  },
  // extends: ["plugin:vue/essential", "@vue/prettier"],
  extends: ["plugin:vue/essential"],
  rules: {
    // "no-console": "off" || process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "quotes": [0, "double"],
    "maxEntrypointSize": 500000000,
        //生成文件的最大体积 整数类型（以字节为单位 300k）
    "maxAssetSize": 300000000, 
    performance:{
      "hints": false
    }
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
