
function scrollMove( ele ,frame ,step ) {
    var step = step || 1;
    var $item = $(ele).children();
    var w = 0 ;
    $item.each(function () {
        w += $(this).width();
    });

    $(ele).html( $(ele).html() + $(ele).html() );

    var $items = $(ele);

    var temp = 0;
    function move() {
        if( temp > w ){
            temp = 0
        }else{
            temp = temp+step ;
        }
        $items.scrollLeft( temp );
    }

    setInterval(move , 1000/frame);
}