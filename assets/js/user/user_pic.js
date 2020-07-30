$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };
  $("#file").hide();
  // 1.3 创建裁剪区域
  $image.cropper(options);

  $(".btn_upload").on("click", function () {
    $("#file").click();
  });
  $("#file").on("change", function (e) {
    var file = e.target.files;
    // console.log(file);
    if (file.length === 0) {
      return layui.layer.msg("请选择图片");
    }
    var url = URL.createObjectURL(file[0]);
    $("#image")
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", url) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  $(".btn_update").on("click", function () {
    var dataURL = $("#image")
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
      url: "/my/update/avatar",
      type: "post",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("更新头像失败！");
        }
        layui.layer.msg("更新头像成功！");
        window.parent.getMessage();
      },
    });
  });
});
