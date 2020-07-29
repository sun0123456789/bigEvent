$(function () {
  load();
  $(".reset_btn").on("click", function (e) {
    e.preventDefault();
    load();
  });
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/my/userinfo",
      type: "post",
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg(res.message);
        window.parent.getMessage();
      },
    });
  });
  function load() {
    $.ajax({
      url: "/my/userinfo",
      type: "get",
      success: function (res) {
        //   console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.form.val("formTest", res.data);
      },
    });
  }
  layui.form.verify({
    nick: function (value) {
      //value：表单的值、item：表单的DOM对象
      if (value.length > 6) {
        return "用户名昵称长度必须在 1 ~ 6 个字符之间！";
      }
    },
  });
});
