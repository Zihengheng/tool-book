//2021 范围：行业库首页
//说明：导入图谱

$(function () { loadTree();});

function loadTree(){
	var myChart = echarts.init(document.getElementById('hy-graph'));

	var option;

	var data = [{
		name:'文化',
		label:{
			fontSize:20,
			fontWeight:'bold',
			color:'#fff',
			padding:[30,20,30,20],
			backgroundColor:'#add3ae',
			borderRadius:60,
			rotate:'none'
		},
		children:[{
			name:"本意",
			label:{
				fontSize:16,
				fontWeight:'bold',
				color:'#fff',
				padding:[10,10,10,10],
				backgroundColor:'#5aaca8',
				borderRadius:50,
				rotate:'none',
			},
			children:[{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			]
		},
		{
			name:'群众文化',
			label:{
				fontSize:16,
				fontWeight:'bold',
				color:'#fff',
				padding:[10,10,10,10],
				backgroundColor:'#87d9e5',
				borderRadius:50,
				rotate:'none',			
			},
			children:[{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			]
		},
		{
			name:'公益文化事业',
			label:{
				fontSize:16,
				fontWeight:'bold',
				color:'#fff',
				padding:[10,10,10,10],
				backgroundColor:'#5aaca8',
				borderRadius:50,
				rotate:'none',
			},
			children:[{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			]
		},
		{
			name:'范畴',
			label:{
				fontSize:16,
				fontWeight:'bold',
				color:'#fff',
				padding:[10,10,10,10],
				backgroundColor:'#5aaca8',
				borderRadius:50,
				rotate:'none',
			},
			children:[{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			]
		},
		{
			name:'文化产业',
			label:{
				fontSize:16,
				fontWeight:'bold',
				color:'#fff',
				padding:[10,10,10,10],
				backgroundColor:'#87d9e5',
				borderRadius:50,
				rotate:'none',
			},
			children:[{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			{
				name:'文化的生产与经济',
				label:{
					fontSize:12,
				}
			},
			],
		},]
	}];
	option = {
		series:{
			type:'tree',
			layout:'radial',
			data:data,
			initialTreeDepth:2,
			width:600,
			height:600,
			left:300,
			label:{
				// rotate:'none',
				fontFamily:'Microsoft YaHei',
			},
		},
	};
	// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

};