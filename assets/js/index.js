$(function () {
  $(".logout").on("click", function () {
    layui.layer.confirm(
      "确定要退出登录吗?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        localStorage.removeItem("token");
        location.href = "/login.html";

        layui.layer.close(index);
      }
    );
  });
  $.ajax({
    url: "/my/userinfo",
    type: "get",
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg("获取信息失败");
      }
      load(res);
    },
  });
  function load(res) {
    var name = res.data.nickname || res.data.username;
    $(".myname").html("欢迎 " + res.data.nickname);
    if (res.data.user_pic !== "") {
      $(".avatar").hide();
      $(".layui-nav-img").attr("src", res.data.user_pic).show();
    } else {
      $(".avatar").html(name[0].toUpperCase()).show();
      $(".layui-nav-img").hide();
    }
  }
});
