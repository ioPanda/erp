import Backbone from 'backbone';
import $ from 'jquery';
Backbone.$ = $;
import Marionette from 'backbone.marionette';
import 'bootstrap';
import 'backbone.syphon';
import 'backbone-query-parameters';
import 'babel-polyfill';


// start the marionette inspector
if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}


//市场管理各类市场className
Handlebars.registerHelper('marketN',function(marketName) {
     
     switch(marketName){
     	case '亚洲市场' :
            return aisa;
	     	break;
	    case '区域市场' :
		    return region;
		    break;
		case '本地市场' :
		    return native;
		    break;
		case '国内市场' :
			return domestic;
			break;
		case '国际市场' :
		    return internet;
		    break;
		default :
		    break;
      }

});