
import Backbone from 'backbone';
import Application from './application/application';

import Index from './index/router';
import Login from './login/router';
import Group from './group/router';
import Game from './game/router';
import Admin from './admin/router';

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

app.game = new Game({
	container: app.layout.content
});

app.admin = new Admin({
	container: app.layout.content
})

Backbone.history.start();

