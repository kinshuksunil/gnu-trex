{
	var track = function() {
		return this;
	},
	
	tp = track.prototype = {
		title:'no title was provided',
		s:0,
		state:'paused',
		id:'',
		
		setState: function(s) {
			this.state = s;
		},
		
		getState: function() {
			return this.state;
		},
		
		is: function(s) {
			return (this.state == s);
		}
	};
}

{
    var rex = function(c) {
		this.init(c);
		return this;
    },

     
    rp = rex.prototype = {
        callback:'',
        tracks:[],
		t: '',
		idc:0,
		size:0,
		
		init: function(c) {
			this.callback = c;
			this.t = setInterval(this.callback,1000);
		},

		update: function() {
			for(t in this.tracks) {
				if(this.tracks[t].is('active')) {
					this.tracks[t].s++;
				}
			}
        },
		
		add: function(title,s,state) {
			tmp = new track();
			
			if(undefined != state) {
				tmp.setState(state);
			} else {
				tmp.setState('active');
			}
			
			if(undefined != title) {
				tmp.title = title;
			}
			
			if(undefined != s) {
				tmp.s = s;
			}
			
			tmp.id = 'track_'+(this.idc+1);
			
			this.tracks[tmp.id] = tmp;
			this.idc++;
			this.size++;
			return tmp.id;
		},

	   remove:function(id) {
			try {
				delete this.tracks[id];
				this.size--;
			}catch(err) {
			}
	   },
	   
	   pause:function(id) {
			try {
				this.tracks[id].setState('paused');
			}catch(err) {
			}
	   },
	   
	   start:function(id) {
			try {
				this.tracks[id].setState('active');
			}catch(err) {
			}
		},
		
		toggle:function(id) {
			try {
				if(this.tracks[id].state == 'paused') {
					this.tracks[id].state = 'active';
				} else {
					this.tracks[id].state = 'paused';
				}
			}catch(err) {
			}
		},
		save:function() {
			ret = "["
			for(t in this.tracks) {
				ret = ret + '{title:"'+this.tracks[t].title + '", s:'+ this.tracks[t].s+ ', state:"'+this.tracks[t].state+'"},';
			}
			ret += "]";
			return ret;
		},
		
		state:function(id) {
			return this.tracks[id].state;
		}
    };
	
	

}