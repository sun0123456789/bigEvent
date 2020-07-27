$(function () {
  $(".logout").on("click", function () {
    if (confirm("确定要退出吗?")) {
      location.href = "login.html";
      localStorage.removeItem("token");
    }
  });
});
