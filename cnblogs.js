/**
 * Title
 */
$(function () {
    (function () {
        if($('#cnblogs_post_body h1').length>0){
            var t1 = $('#cnblogs_post_body h1');
            for(var i = 0;i<t1.length;i++){
                $(t1[i]).addClass('change').attr('data-title', (i+1)+'.');

            }

        }

        function setTitle($ele, title){
            $ele.addClass('change').attr('data-title', title + '.  ');
        }

        function isTitle($ele){
            return /^[h|H]\d+$/.test($ele.prop('tagName'));
        }

        function getTitleLevel($ele){
            return $ele.prop('tagName').substring(1)
        }

        //   1.2.3.4
        function getNextTitle(curTitle, curLevel, nextLevel){
            var nextTitle = '';
            curTitle = curTitle + '';
            var titles = curTitle.split('.');
            if(curLevel == nextLevel){  // 同级
                nextTitle = titles.slice(0, titles.length-1).join('.');
                if(nextTitle==''){
                    nextTitle += '' + (parseInt(titles[titles.length-1]) + 1);
                }else{
                    nextTitle += '.' + (parseInt(titles[titles.length-1]) + 1);
                }

                return nextTitle;
            }
            if(curLevel > nextLevel){  // 回退，如2.1.1.1[level=4] -> 2.2[level=2]
                // start, end  [curLevel - (curLevel-nextLevel)] ，取值，有用的值 如2.1.1.1取2.1
                nextTitle = titles.slice(0, titles.length - (curLevel-nextLevel));
                console.log(nextTitle=='')
                if(nextTitle.length == 1){
                    nextTitle = parseInt(nextTitle[nextTitle.length-1]) + 1;
                }else{
                    nextTitle = nextTitle.slice(0, nextTitle.length-1).join('.') + '.' + (parseInt(nextTitle[nextTitle.length-1]) + 1);
                }

                return nextTitle;
            }
            return curTitle + '.1';
        }

        function stepOne($ele, curTitle, curLevel){   // 所有标题都是兄弟节点
            setTitle($ele, curTitle);
            var next = $ele.next();
            var i=0;
            do{
                if(!next||next.length==0){
                    return;
                }
                if(next.length>0&&isTitle(next)){
                    console.log('is title')
                    break;
                }
                next = next.next();
                if(++i>6000){
                    return;
                }
            }while(true);
            var curLevel = getTitleLevel($ele);
            var nextLevel = getTitleLevel(next);
            var nextTitle = getNextTitle(curTitle, curLevel, nextLevel);
            stepOne(next, nextTitle, nextLevel);
        }

        function isOldBlog($h) {  // 如果是老博客，已经有了标题，可以不操作
            var length = $h.length;
            if(length<1){
                return true;
            }
            var hasTitleNum  = 0;  // 已经有了标题的标签个数
            for(var i = 0;i<length;i++){
                var text = $($h[i]).text();
                if(/^\d+/.test(text)){
                    hasTitleNum++;
                }
                if(hasTitleNum>=length/2){
                    return true;
                }
            }
            return false;
        }
        if(!isOldBlog($('#cnblogs_post_body h1,#cnblogs_post_body h2,#cnblogs_post_body h3,#cnblogs_post_body h4,#cnblogs_post_body h5'))){
            if($('#cnblogs_post_body h1').length>0){
                stepOne($('#cnblogs_post_body h1').first(), '1', 1);
            }else if($('#cnblogs_post_body h2').length>0){
                stepOne($('#cnblogs_post_body h2').first(), '1', 2)
            }else if($('#cnblogs_post_body h3').length>0){
                stepOne($('#cnblogs_post_body h3').first(), '1', 3)
            }else if($('#cnblogs_post_body h4').length>0){
                stepOne($('#cnblogs_post_body h4').first(), '1', 4)
            }
        }
    })();
})

