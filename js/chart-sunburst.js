  $(function () { loadChart();});

  //2021 范围：语词库条目页
  //说明：导入饼状图
  function loadChart(){
    // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart'));
        var option;
        //图表数据
        var data = [{
                    name: '语',
                    value: 100,
                    children: [{
                        value: 33.3,
                        name: '古汉语',
                        itemStyle: {
                            color: '#c1d7f8',
                        },
                        children:[{
                            value:8.3,
                            name:'虚词',
                            itemStyle:{
                                color:'#daeaff',
                            }
                        },{
                            value:8.3,
                            name:'金文',
                            itemStyle:{
                                color:'#daeaff',
                            }
                        },{
                            value:8.3,
                            name:'通假',
                            itemStyle:{
                                color:'#daeaff',
                            }
                        },{
                            value:8.3,
                            name:'源流',
                            itemStyle:{
                                color:'#daeaff',
                            }
                        }]
                    }, {
                        value: 33.3,
                        name: '少数民族语言',
                        itemStyle: {
                            color: '#c0eed2',
                        },
                        children:[{
                            value:5.55,
                            name:'景颇语',
                            itemStyle:{
                                color:'#d8f4e3',
                            }},
                            {
                            value:5.55,
                            name:'塔吉克语',
                            itemStyle:{
                                color:'#d8f4e3',
                            }},
                            {
                            value:5.55,
                            name:'白语',
                            itemStyle:{
                                color:'#d8f4e3',
                            }},
                            {
                            value:5.55,
                            name:'苗语',
                            itemStyle:{
                                color:'#d8f4e3',
                            }},
                            {
                            value:5.55,
                            name:'满语',
                            itemStyle:{
                                color:'#d8f4e3',
                            }},
                            {
                            value:5.55,
                            name:'佤语',
                            itemStyle:{
                                color:'#d8f4e3',
                            }},
                        ]
                    },{
                        value:33.3,
                        name:'现代汉语',
                        itemStyle:{
                            color:'#9bbffe',
                        },
                        children:[{
                            value:4.75,
                            name:'组词',
                            itemStyle:{
                                color:'#c4dbfe',
                            },
                        },
                        {
                            value:4.75,
                            name:'造句',
                            itemStyle:{
                                color:'#c4dbfe',
                            },
                        },
                        {
                            value:4.75,
                            name:'辨析',
                            itemStyle:{
                                color:'#c4dbfe',
                            },
                        },
                        {
                            value:4.75,
                            name:'方言',
                            itemStyle:{
                                color:'#c4dbfe',
                            },
                        },
                        {
                            value:4.75,
                            name:'俗/熟语',
                            itemStyle:{
                                color:'#c4dbfe',
                            },
                        },
                        {
                            value:4.75,
                            name:'谜语',
                            itemStyle:{
                                color:'#c4dbfe',
                            },
                        },
                        {
                            value:4.75,
                            name:'楹联',
                            itemStyle:{
                                color:'#c4dbfe',
                            },
                        },
                        ]
                    }],
                }];
        //图标配置
        option = {
            series: {
                type: 'sunburst',
                nodeClick:'link',
                data: data,
                highlightPolicy: 'descendant',

                levels:[{},{
                    r0:'0%',
                    r:'30%',
                    label: {
                     rotate: 'tangential',
                     fontSize:30,
                     fontFamily: 'Microsoft YaHei',
                     align:'center',
                    },
                    itemStyle:{
                        borderWidth:0,
                        color:'#71dada',
                    },
                    // emphasis: {
                    //     itemStyle: {
                    //         color: '#72acdb'
                    //     },
                    // },
                    // highlight: {
                    //     itemStyle: {
                    //         color: '#72acdb'
                    //     },
                    // }
                },{
                    r0:'30%',
                    r:'65%',
                    label: {
                     rotate: 'tangential',
                     fontSize:18,
                     fontFamily: 'Microsoft YaHei',
                    },
                    itemStyle:{
                        borderWidth:3,
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#a39bfe',
                        },
                    },
                    highlight: {
                        itemStyle: {
                            color: '#a39bfe',
                        },
                    }
                },{
                    r0:'65%',
                    r:'95%',
                    label:{
                        rotate:'radial',
                        fontSize:12,
                        fontFamily: 'Microsoft YaHei',
                        color:'#333333',
                    },
                    itemStyle:{
                        borderWidth:3,
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#c1c0f7',
                        },
                    },
                    highlight: {
                        itemStyle: {
                            color:' #c1c0f7',
                        },
                    }
                }],             
            }
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
  };