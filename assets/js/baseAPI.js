$(function () {
  $.ajaxPrefilter(function (options) {
    // console.log(options.url);
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    if (options.url.indexOf("/my/") !== -1) {
      options.headers = {
        Authorization: localStorage.getItem("token") || "",
      };
    }
    options.complete = function (res) {
      // console.log(res);
      if (
        res.responseJSON.status === 1 &&
        res.responseJSON.message == "身份认证失败！"
      ) {
        localStorage.removeItem("token");
        location.href = "/login.html";
      }
    };
  });
});
