/** 
 * Pin Cell NBExtension.
 * Description : Pin the active cell in the sidebar
 * Author      : maziyank@gmail.com
 */

define(["require",
    'base/js/namespace'
], function (requirejs, Jupyter) {
    'use strict';


    const load_css = () => {
        const link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = requirejs.toUrl("./pin_cell.css");
        document.getElementsByTagName("head")[0].appendChild(link);
    };

    const initToolbarButton = () => {
        $(IPython.toolbar.add_buttons_group([
            IPython.keyboard_manager.actions.register({
                help: 'Pin current active cell',
                icon: 'fa-thumb-tack',
                handler: function () {
                    showPanel();
                    pinActiveCell();
                }
            }, 'pin-cell-panel', 'pin_cell_panel'),
        ])).find('.btn').attr({
            id: 'btn_pin_cell',
            'data-toggle': 'button',
            'aria-pressed': 'false'
        });
    };

    const showPanel = () => {
        $('#pin-panel-wrapper').css('display', 'flex');
        $('#ipython-main-app')
            .css('overflow', 'hidden')
            .css('display', 'flex')
            .css('justify-content', 'flex-end');

        $('#notebook_panel')
            .css('overflow', 'auto')
            .css('padding', '0 50px')
            .css('flex', '0 0 auto');

        setTimeout(function () {
            $('#btn_pin_cell').removeClass('active')
        }, 100);
    }

    const hidePanel = () => {
        $('#pin-panel-wrapper').css('display', 'none');
        $('#ipython-main-app')
            .css('overflow', 'auto')
            .css('display', 'block');

        $('#notebook_panel')
            .css('overflow', 'unset')
            .css('padding', '0')
            .css('flex', 'none');;

    }

    const reorderCellNumber = () => {
        // reorder number
        $(".pin-cell-number").each((index, element) => {
            $(element).text('Pinned Cell #' + (index + 1).toString())
        })
    }

    const removeCell = (event) => {
        if (!event && event.target) return;
        const parent = $(event.target).closest(".pin-cell-box");
        if (!parent) return
        parent.empty();
        parent.remove();
        reorderCellNumber()
    }

    const pinActiveCell = () => {
        const panel_body = $('#pin-panel-body');
        const pinnedCell = Jupyter.notebook.get_selected_cell().element.clone();
        pinnedCell.removeClass('selected');
        pinnedCell.find(".prompt").remove();
        pinnedCell.find(".CodeMirror").css("overflow", "auto");
        pinnedCell.find(".CodeMirror-hscrollbar").remove();
        pinnedCell.find(".CodeMirror-cscrollbar").remove();

        $('<div class="pin-cell-box"/>')
            .append($('<div class="pin-cell-header"><h3 class="pin-cell-number"/></div>')
                .append($('<button type="button"><i class="fa-times fa"></i></button>').click(removeCell))
            )
            .append($('<div class="pin-cell-body"/>')
                .append(pinnedCell))
            .appendTo(panel_body);

        reorderCellNumber()
    }

    const initSidePanel = () => {
        $('<div id="pin-panel-wrapper"/>')
            .append($('<div id="pin-panel-sidebar"/>')
                .append($('<div id="pin-panel-header"><i class="fa-thumb-tack fa"></i><h3>Pinned Cells</h3></div>')
                    .append($('<button type="button"><i class="fa-times fa"></i></button>').click(hidePanel))
                ).append($('<div id="pin-panel-body"></div>'))
            ).resizable({
                handles: 'w',
                minWidth: 500,
                maxWidth: $(document).width() - $('#notebook-container').width() - 100,
                alsoResize: "#pin-panel-sidebar",
                resize: function (event, ui) {
                    ui.position.left = 0;
                }
            })
            .appendTo('#ipython-main-app');
    }

    const load_ipython_extension = () => {
        load_css();
        initToolbarButton();
        initSidePanel();

        $("p").click(function () {
            $(this).slideUp();
        });
    };

    return {
        load_ipython_extension: load_ipython_extension
    };
});