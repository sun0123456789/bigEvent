$(function () {
  layui.form.verify({
    newPwd: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (value === $(".oldPwd").val()) {
        return "新旧密码不能相同";
      }
    },
    rePwd: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (value !== $(".newPwd").val()) {
        return "两次密码输入不一致";
      }
    },
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/my/updatepwd",
      type: "post",
      data: {
        newPwd: $(".newPwd").val(),
        oldPwd: $(".oldPwd").val(),
      },
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg(res.message);
        $(".layui-form")[0].reset();
      },
    });
  });
});
