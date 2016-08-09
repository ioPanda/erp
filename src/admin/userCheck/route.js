
import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import Collection from './collection';



export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.collection = new Collection();
  },

  fetch() {
    return this.collection.fetch();
  },

  render(params) {
    let page = params && parseFloat(params.page) || 1;

    this.layoutView = new LayoutView({
      collection: this.collection,
      page: page
    });

    this.container.show(this.layoutView);
  },

  destroy() {
    this.layoutView.remove();
  }
});



/*
export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.collection = options.collection ? options.collection : new Collection();
    if(options.state){
        this.layoutView.remove();
       this.state=options.state;
       this.page=options.page;
      

        alert(JSON.stringify(this.collection));

        alert(this.state.limit);

        
       this.layoutView = new LayoutView({
          collection: this.collection,
          page: this.page,
          state:this.state
      });
    }
  },

  fetch() {
    return this.collection.fetch();
  },

  render(params) {
    let page = params && parseFloat(params.page) || 1;
    
    // if(this.state){

    // }else{
      this.layoutView = new LayoutView({
        layoutView: this.layoutView,
        collection: this.collection,
        page: page
      });
    // }
   

    this.container.show(this.layoutView);
  },

  destroy() {
    this.layoutView.remove();
  }
});





*/