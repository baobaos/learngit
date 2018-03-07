AlertBox = function(el, options){
    this.icons = {
        'success' : 'data:image/png;base64,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',
        'fail' : 'data:image/png;base64,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'
    };
    this.defaults = {
        'title'         : 'alert',
        'content'       : 'Hello!',
        'width'         : 400,
        'overlay'      : true,
        'overlayColor' : 'rgba(0, 0, 0, 0.3)',
        'modal'         : true,
        'btns'          : null,
        'close'         : true,
        'closeBtn'      : {
                            'show' : true,
                            'img' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABRElEQVRYR+2WwQ3CMAxF7Q1gA0ZgBJgANgA2oIda6gSV20NHgA1YgREYgRG491AUiUpR1Sa2g1QO9Jzkv3w7v0aY+cOZ9eEP8LsOlGW5Kori+Y0eaZpmkWXZa+ysUQeYeY+IFwDYEtEjBYKZr4h4IKJRrckSfDbuUiB6cQA4EdFV7EC/MAVCIu50ok1ogWDmMyI2oZv3l4wCuIUaiKqqjgDg+mfSdr8UIgAphFZcVAKfNuSERVwNMOWEVdwEMIQAgLWm5sOnKO6B4UavHAtpw6lzIJSA3jt3EWtOTJMDfsh0XbdBRHNiqgHGEk6TE0k9EIpXK4TYAUm2WyBEABJx6w8sCqARt0AEASziWojYQHJICRlJT4RGsluK+NAJIlqKk9ANkW3brlLnwV6wrutNnud3MUDKEKrdG30F2gO16/8AszvwBu76yyGV/H6iAAAAAElFTkSuQmCC'
                        },
        'closeEvent'    : null,
        'icon'           : 'success',
    };
    this.options = $.extend({}, this.defaults, options);
    this.open();

}


AlertBox.prototype = {
    open : function(){
        this.create();
    },

    close :  function(){
        if(this.options.overlay){
            $('.sAlert-overlay').remove();
        }
        $('.sAlert-box').remove();
    },

    create : function(){
        var alertBox = $('<div class="sAlert-box"></div>');
        alertBox.css({
            'width' : this.options.width,
        })
        //标题
        if('' != this.options.title){
            let title = $('<div class="sAlert-title">' + this.options.title + "</div>");
            alertBox.append(title);
        }

        //图标
        if('' != this.options.icon){
            let alertIcon = $('<div class="sAlert-icon"><img src="'  + this.icons[this.options.icon] + '" /></div>');
            alertBox.append(alertIcon);
        }

        //位置内容
        var alertContent = $('<div class="sAlert-content"></div>');
        // alertContent.css({
        //     height: this.options.height,
        // })
        alertBox.append(alertContent);
        if('object' == typeof this.options.content){ //如果是对象就clone内容追加进去
            let clone = $(this.options.content).clone();
            alertContent.append(clone);
        }else{
            alertContent.html(this.options.content);
        }

        //按钮
        if( null != this.options.btns && 0 < this.options.btns.length){
            var alertBtns = $('<div class="sAlert-btns"></div>');
            var _this = this;
            $.each(this.options.btns, function(i, item){
                let btn = $('<button class="sAlert-btn">' + item.text + '</button>');
                btn.addClass(item.css)
                if('function' == typeof item.action) {
                    btn.on('click',function(event){
                        event.stopPropagation();
                        item.action.call(btn, _this);
                    })
                }
                alertBtns.append(btn);
            })
            alertBox.append(alertBtns);
        }

        //关闭按钮
        if(this.options.close){ //开启关闭按钮
            let closeBtn = $('<a href="javascript:;" class="sAlert-close"></a>');
            closeBtn.css({
                'background-image' : 'url(' + this.options.closeBtn.img + ')'
            });
            closeBtn.on('click', {'el' : this},function(e){
                e.stopPropagation();
                e.data.el.close();
            })
            alertBox.append(closeBtn);
        }

        //判断是否开启模态，模态开启后单击非alertBox区域不关闭
        if(false == this.options.modal){
            $(document).click(function(){
                this.close();
            })
            $('.sAlert-box').click(function(e){
                e.stopPropagation();
            })
        }

        //是否显示蒙版成
        if(this.options.overlay){
            var aAlertOverlay = $('<div class="sAlert-overlay"></div>');
            aAlertOverlay.css({
                'background-color' : this.options.overlayColor,
            })
            $('body').append(aAlertOverlay);
        }

        var h = alertBox.height();
        var w = this.options.width/2;
        alertBox.css({
            'margin-top'  : h/-2,
            'margin-left' : w/-2,
        })
        $('body').append(alertBox);
    }
}


$.extend({
    sAlert : function(options){
        return new AlertBox(this, options);
    }
})
