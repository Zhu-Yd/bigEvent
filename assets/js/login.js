$(function () {
    let form = layui.form
    let layer = layui.layer
    $(".to_login").on('click', function () {

        $(".tologin_box").hide()
        $(".toreg_box").show()

    })
    $(".to_reg").on('click', function () {
        $(".tologin_box").show()
        $(".toreg_box").hide()

    })
    $('#reg_user').on("submit", function (e) {
        let data = {
            username: $(".tologin_box [name='username']").val(),
            password: $(".tologin_box [name='password']").val()
        }
        e.preventDefault()
        $.post("api/reguser", data, function (res) {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg("注册用户成功")
            $(".tologin_box .to_login").click()
        })
    })

    $("#login_user").on("submit",function (e) {
        e.preventDefault()
        $.ajax({
            url:"api/login",
            method:"POST",
            data:$(this).serialize(),
            success:function (res){
                if(res.status!==0) return layer.msg(res.message)
                localStorage.setItem('token',res.token)
                location.href=base_url+"/index.html"
            }
        })
    })

    form.verify({
        pwd: function (val, ele) {
            if (!/^[\S]{6,12}$/.test(val)) {
                return '密码必须为6-12位非空字符'
            }
        },
        repwd: function (val, ele) {
            let repwd = $(".tologin_box [name='password']").val()
            if (val !== repwd) return '两次密码输入不一致'
        }
    })
})