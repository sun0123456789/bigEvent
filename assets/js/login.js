$(function () {
  $(".toReg").on("click", function () {
    $(".reg_box").show();
    $(".login_box").hide();
  });
  $(".toLogin").on("click", function () {
    $(".reg_box").hide();
    $(".login_box").show();
  });
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    repass: function (value) {
      //value：表单的值、item：表单的DOM对象
      var val = $(".reg_pass").val();
      if (val !== value) {
        return "两次密码不一致";
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });
  $("#reg_form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/api/reguser",
      type: "post",
      data: {
        username: $(".username").val(),
        password: $(".password").val(),
      },
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        $(".toLogin").click();
        layer.msg("注册成功,请登录");
      },
    });
  });
  $("#login_form").on("submit", function (e) {
    e.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      url: "/api/login",
      type: "post",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        localStorage.setItem("token", res.token);
        layer.msg("登录成功");
        location.href = "index.html";
      },
    });
  });
});
