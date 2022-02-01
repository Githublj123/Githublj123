(函数 ( )  {
  “使用严格” ；

  // *******************************************
  // 可重复使用的热图图表
  // *******************************************

  d3 。埃苏尔。热图 = 功能 模块( )  {
    // getter setter 的输入变量
    var  startYear  =  2013 ，
      年末 =  2016 年，
      colourRangeStart  =  "#fae9e9" ,
      colourRangeEnd  =  "#d62728" ,
      宽度 =  950 ,
      高度 =  475 ;

    var 调度 =  d3 。调度（“_hover” ）；

    函数 导出（_selection ） {
      _选择。每个（函数 （嵌套数据） {
        变量 颜色 =  d3 。规模
          . 线性( )
          . 范围( [ colourRangeStart ,  colourRangeEnd ] ) ;

        var  margin  =  { 上：20 ， 右：30 ， 下：20 ， 左：20  } ；
        // 更新宽度和高度以使用轴的边距
        宽度 = 宽度 - 边距。左边 距。_  对；
        高度 = 高度 - 边距。上 边距。_  底部；

        变种 年 =  d3 。范围（开始年， 结束年）。反向( ) ,
          sizeByYear  = 身高 / 年。长度 +  1 ,
          sizeByDay  =  d3 。最小（[ sizeByYear  /  8 ， 宽度 /  54 ] ），
          天 = 功能 ( d )  {
            返回 ( d.getDay ( ) + 6 ) % 7 ; _ _    
          } ,
          周 =  d3 。时间。格式（“%W” ），
          日期 =  d3 。时间。格式（“%b %d” ）；

        var  svg  =  d3
          . 选择（这个）
          . 附加（“svg” ）
          . 属性（{
            类：“图表” ，
            宽度：宽度 + 边距。左 + 边距。对，
            高度：高度 + 边距。顶部 + 边距。底部,
          } )
          . 附加（“g” ）
          . 属性(
            “变换” ，
            “翻译（”  + 边距。左 +  “，”  + 边距。顶部 +  “）”
          ) ;

        var 年份 =  svg
          . 全选（ “ .year ” ）
          . 数据（年）
          . 输入( )
          . 附加（“g” ）
          . attr ( "班级" ,  "年份" )
          . attr ( "变换" , 函数 ( d ,  i )  {
            返回 "translate(30,"  +  i  *  sizeByYear  +  ")" ;
          } ) ;

        年
          . 附加（“文本” ）
          . 属性（{
            类：“年份标题” ，
            变换：“翻译（-38，”  +  sizeByDay  *  3.5  +  “）旋转（-90）” ，
            “文本锚”：“中间” ，
            “字体粗细”：“粗体” ，
          } )
          . 文本（函数 （d ） {
            返回 d ;
          } ) ;

        var  rect  = 年
          . 全选（ “ .day ” ）
          . 数据（函数 （d ） {
            返回 d  === 时刻( ) 。年( )
              ? d3 。时间。天(
                  新 日期（d ， 0，1 ）， _ _
                  新 日期( d , 时刻( ) .月( ) , 时刻( ) .日期( )  +  1 )
                )
              : d3 。时间。天（新 日期（d ， 0，1 ）， 新日期（d + 1，0，1 ））；_ _ _ _ _ _      
          } )
          . 输入( )
          . 附加（“矩形” ）
          . 属性（{
            类：“天” ，
            宽度: sizeByDay ,
            高度: sizeByDay ,
            x :函数 ( d )  {
              返回 周（d ） *  sizeByDay ；
            } ,
            y :函数 ( d )  {
              返回 日期( d )  *  sizeByDay ;
            } ,
          } ) ;

        年
          . 全选（ “ .month ” ）
          . 数据（函数 （d ） {
            返回 d3 。时间。月（新 日期（d ， 0，1 ）， 新日期（d + 1，0，1 ））；_ _ _ _ _ _      
          } )
          . 输入( )
          . 附加（“路径” ）
          . 属性（{
            类：“月” ，
            d：月路径，
          } ) ;

        // 日和周标题
        var  chartTitles  =  (函数 ( )  {
          var  weekDays  =  [ "Mon" ,  "Tue" ,  "Wed" ,  "Thu" ,  "Fri" ,  "Sat" ,  "Sun" ] ,
            月 =  [
              “简” ，
              “二月” ，
              “三月” ，
              “四月” ，
              “五月” ，
              “君” ，
              “七月” ，
              “八月” ，
              “九月” ，
              “十月” ，
              “十一月” ，
              “十二月” ，
            ] ;

          var  titleDays  =  svg
            . 全选（ “ .year ” ）
            . 全选（ “ .titles -day” ）
            . 数据（工作日）
            . 输入( )
            . 附加（“g” ）
            . attr ( "class" ,  "titles-day" )
            . attr ( "变换" , 函数 ( d ,  i )  {
              返回 "translate(-5,"  +  sizeByDay  *  ( i  +  1 )  +  ")" ;
            } ) ;

          标题天
            . 附加（“文本” ）
            . attr ( "类" , 函数 ( d ,  i )  {
              返回 工作日[ i ] ;
            } )
            . 样式（“文本锚” ， “结束” ）
            . attr ( "dy" ,  "-.25em" )
            . 文本（函数 （d ， i ） {
              返回 工作日[ i ] ;
            } ) ;

          var  titleMonth  =  svg
            . 全选（ “ .year ” ）
            . 全选（ “ .titles -month” ）
            . 数据（月）
            . 输入( )
            . 附加（“g” ）
            . attr ( "class" ,  "titles-month" )
            . attr ( "变换" , 函数 ( d ,  i )  {
              返回 "translate("  +  ( ( i  +  1 )  *  ( width  /  12 )  -  30 )  +  ",-5)" ;
            } ) ;

          标题月
            . 附加（“文本” ）
            . attr ( "类" , 函数 ( d ,  i )  {
              返回 月份[ i ] ;
            } )
            . 样式（“文本锚” ， “结束” ）
            . 文本（函数 （d ， i ） {
              返回 月份[ i ] ;
            } ) ;
        } ) ( ) ;

        函数 月路径（t0 ） {
          var  t1  = 新 日期( t0.getFullYear ( ) , t0.getMonth ( ) + 1 , 0 ) , _ _ _ _    
            d0  =  +天( t0 ) ,
            w0  =  +周( t0 ) ,
            d1  =  +天( t1 ) ,
            w1  =  +周（t1 ）；

          返回 (
            "M"  +
            ( w0  +  1 )  *  sizeByDay  +
            ","  +
            d0  *  sizeByDay  +
            "H"  +
            w0  *  sizeByDay  +
            "V"  +
            7  *  sizeByDay  +
            "H"  +
            w1  *  sizeByDay  +
            "V"  +
            ( d1  +  1 )  *  sizeByDay  +
            "H"  +
            ( w1  +  1 )  *  sizeByDay  +
            "V"  +
            0  +
            "H"  +
            ( w0  +  1 )  *  sizeByDay  +
            “Z”
          ) ;
        }

        // 应用热图颜色
        颜色。域（d3.extent （d3.values （nestedData ）））；_ _ _ _

        矩形
          . 过滤器（函数 （d ） {
             在嵌套数据中返回d  ； 
          } )
          . 样式（“填充” ， 功能 （d ） {
            返回 颜色（嵌套数据[ d ] ）；
          } )
          . on （“鼠标悬停” ， 调度。_hover ）；
      } ) ;
    }

    // 覆盖 getter/setter
    出口。开始年 = 函数 （值） {
      if  ( ! arguments.length ) return startYear ; _  _ 
      开始年 = 价值；
      返回 这个；
    } ;
    出口。endYear  = 函数 （值） {
      if  ( ! arguments.length ) return endYear ; _  _ 
      endYear  = 价值;
      返回 这个；
    } ;
    出口。colourRangeStart  = 函数 （值） {
      如果 （！参数。长度） 返回 colourRangeStart ；
      colourRangeStart  = 值；
      返回 这个；
    } ;
    出口。colourRangeEnd  = 函数 （值） {
      if  ( ! arguments .length ) return colourRangeEnd ; _  
      colourRangeEnd  = 值;
      返回 这个；
    } ;
    出口。宽度 = 函数 （值） {
      如果 （！参数。长度） 返回 宽度；
      宽度 = 值；
      返回 这个；
    } ;
    出口。高度 = 函数 （值） {
      如果 （！参数。长度） 返回 高度；
      高度 = 价值；
      返回 这个；
    } ;

    d3 。rebind (出口, 调度,  "on" ) ;
    返回 出口；
  } ;
} ) ( ) ;
