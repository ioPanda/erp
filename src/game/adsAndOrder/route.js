import {Route} from 'backbone-routing';
import BreadcrumbView from '../../component/breadcrumb/view';
import LayoutView from './layout-view';
import NavView from './nav/view.js';
import stepOneView from './stepOne/view';
import stepTwoView from './stepTwo/view';
import stepThreeView from './stepThree/view';
import stepFourView from './stepFour/view';
import stepFiveView from './stepFive/view';
import TalkroomView from './talkroom/view';
import $ from 'jquery';
import Util from '../../util.js';
import Markets_Collection from './markets-colletion';
import _ from 'lodash';
import Backbone from 'backbone';

export default Route.extend({
	initialize(options={}){
		this.step = options.step;
		Backbone.on('findPage',this.findPageFun,this);
		this.container=options.container;
		this.Mcollection = new Markets_Collection();
		Backbone.trigger('findPage');

    },

    fetch () {
    	return this.Mcollection.fetch();
    },
 	
 	// findPageFun () {
 	// 	Util.ajax(
 	// 		'POST',
 	// 		'/erp/advertisement/userStatusOfAdvertisement.do',
 	// 		{}
 	// 		)
 	// 	.then((res) =>{
 	// 		if(res.status == 1){
 	// 			console.log(res.data);
 	// 			this.step = res.data;
 	// 			this.render();
 	// 		}else{
 	// 			console.log(res.message);
 	// 		}

 	// 	});
 	// },

 	changedRender() {
 		this.render();
 	},

    render () {
    	
    	this.layout = new LayoutView();
		this.container.show(this.layout);
        this.layout.breadcrumb.show(new BreadcrumbView({
			'mainNav':'市场管理',
			'title':'广告投放&订单',
			'subTitle':'Advertisement And Order',
			'icon':'glyphicon-map-marker'
		}));	

        this.layout.nav.show(new NavView());
        
        // 广告投放市场
        let filter = _.chain(this.Mcollection.models[0].get('data')).value();
        this.coll = new Markets_Collection(filter);

        //step路由
       	this.step = parseInt(this.step);
        
        switch(this.step){
        	case 1 :
	        	this.layout.step.show(new stepOneView({
	        		step:this.step,
	        		collection:this.coll}));
	        	break;
	        case 2 :
		        this.layout.step.show(new stepTwoView({step:this.step}));
		        break;
		    case 3 :
			    this.layout.step.show(new stepThreeView({step:this.step}));
			    break;
            case 4 :
	            this.layout.step.show(new stepFourView({step:this.step}));
	            break;
	        case 5 :
		        this.layout.step.show(new stepFiveView({step:this.step}));
			    break;
			default :
				break;
        };
      this.layout.talkRoom.show(new TalkroomView());  
	}
    
    
});