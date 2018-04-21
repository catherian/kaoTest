$(function() {
    var loading;

    $(document).ajaxStart(function() {
        loading = layer.load(1);
    });

    $(document).ajaxComplete(function() {
        layer.close(loading);
    });

    var execute = {
        el: {
            createOrUpdateBookButton: $('#update-book'),
            deleteBookButton: '.JS-delete-book',
        },
        bind: function() {
            // create or update book
            this.el.createOrUpdateBookButton.on('click', this.event.createOrUpdateBook);
            // delete book
            $(document).delegate(this.el.deleteBookButton, 'click', this.event.deteleBook);
        },
        event: {
            createOrUpdateBook: function() {
                var formData = $(this).closest('form').serialize();
                $.post('/edit', formData, function(data) {
                    console.log(formData);
                    layer.alert(data.message, function() {
                        window.location.href = window.location.origin + '/list';
                    });
                });
            },
            deteleBook: function() {
                var id = $(this).attr('data-id');
                var trNode = $(this).closest('tr');

                $.get('/index.php?r=site/delete-book', { id: id }, function(data) {
                    if (data.success) {
                        trNode.remove();

                        layer.msg('删除成功');                        
                    }
                });
            },
        },
        run: function() {
            this.bind();
        },
    };

    execute.run();
});