import Backbone from 'backbone';
/*import menu from './menu.json';

export default Backbone.Model.extend({
  defaults: {
  	admin: menu['admin'],
  	pregame: menu['pergame'],
  	game: menu['game']
  }
});*/
import menu from './menu1.json';
export default Backbone.Model.extend({
	defaults() {
		return menu;
	}
})
