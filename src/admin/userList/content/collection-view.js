
import {CompositeView} from 'backbone.marionette';
import ItemView from './item-view';
import template from './collection-template.hbs';

export default CompositeView.extend({
	tagName: 'table',
	className: 'list-group table',
	template: template,
	childView: ItemView,
	childViewContainer: 'tbody'
})