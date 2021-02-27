$(function() {
    initArtCateList();

    var layer = layui.layer;
    var form = layui.form;

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        });
    }

    var indexAdd = 0;
    var indexEdit = 0;
    $("#addCate").on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
          });     
    });
    $('body').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        
        var Id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function(res) {
                form.val('form-edit', res.data);
            }
        });
    });

    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败');
                }
                initArtCateList();
                layer.close(indexAdd);
            }
        });
    });

    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('文章分类修改失败');
                }
                layer.msg('文章分类修改成功');
                layer.close(indexEdit);
                initArtCateList();
            }
        });
    });

    $('tbody').on('click', '.btn-delete', function() {
        var Id = $(this).attr('data-id');
        layer.confirm('确认删除吗？', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败');
                    }
                    layer.msg('删除成功');
                    layer.close(index);
                    initArtCateList();
                }
            });
        });
    })
    
})