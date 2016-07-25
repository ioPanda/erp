
import Backbone from 'backbone';
import Application from './application/application';

import Index from './index/router';
import Login from './login/router';
import Group from './group/router';

let app = new Application();

app.index = new Index({
	container: app.layout.content
});

app.login = new Login({
	container: app.layout.content
});

app.group = new Group({
	container: app.layout.content
});

Backbone.history.start();

