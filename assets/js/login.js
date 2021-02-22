$(function() {
    $('#link-reg').on('click', function() {
        $('.log-box').hide();
        $('.reg-box').show();
    });

    $('#link-login').on('click', function() {
        $('.reg-box').hide();
        $('.log-box').show();
    });

    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    });

    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            $('#link-login').click();
        });
    });

    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('登录失败！');
                }
                layer.msg('登录成功！');
                localStorage.setItem('token', res.token);
                // console.log(res.token);
                location.href = 'index.html';
            }
        });
    });
});