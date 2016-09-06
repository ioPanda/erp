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
import UserName from './model';

export default Route.extend({
	initialize(options={}){
		console.log(options.step);
		this.step = options.step;
		this.username=new UserName();
		this.container=options.container;
    },
    //fetch behind initialize before render
    fetch () {
    	return this.username.fetch();
    },

    render () {

    	this.layout=new LayoutView();
		this.container.show(this.layout);
        this.layout.breadcrumb.show(new BreadcrumbView({
			'mainNav':'市场管理',
			'title':'广告投放&订单',
			'subTitle':'Advertisement And Order',
			'icon':'glyphicon-map-marker'
		}));	

        this.layout.nav.show(new NavView());
        
        //step路由
        switch(this.step){
        	case '1' :
	        	this.layout.step.show(new stepOneView());
	        	break;
	        case '2' :
		        this.layout.step.show(new stepTwoView());
		        break;
		    case '3' :
			    this.layout.step.show(new stepThreeView());
			    break;
            case '4' :
	            this.layout.step.show(new stepFourView());
	            break;
	        case '5' :
		        this.layout.step.show(new stepFiveView());
			    break;
			default :
				break;
        };
      console.log(this.username);
      this.layout.talkRoom.show(new TalkroomView({model:this.username}));  
	}
    
    
});