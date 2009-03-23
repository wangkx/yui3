YUI.add("queue-full",function(C){var B="executeCallback",A="shiftCallback";C.mix(C.Queue.defaults,{iterations:1,timeout:-1,until:function(){this.iterations|=0;return this.iterations<=0;}},true);C.mix(C.Queue.prototype,{_tId:0,run:function(){var D=this._q[0];if(D&&this.isReady()){this._processCallback(D);}else{if(!D){this.active=false;this.fire("complete");}}return this;},isReady:function(){return !this._tId;},_processCallback:function(D){this.active=true;if(D.timeout<0){this._processSync(D);}else{this._processAsync(D);}},_processSync:function(D){while(this.active&&this.isReady()&&!D.until()){D.iterations--;this._tId=-1;this.fire(B,D);this._tId=0;}if(this.isReady()){this.fire(A);}if(this.active){this.run();}},_processAsync:function(E){var D=this;if(E.until()){this.fire(A);this.run();}else{this._tId=setTimeout(function(){E.iterations--;D.fire(B,E);D._tId=0;if(D.active){D.run();}},E.timeout);}},_defShiftFn:function(){this._q.shift();},pause:function(){clearTimeout(this._tId);this._tId=0;this.active=false;this.fire("pause");return this;},stop:function(){clearTimeout(this._tId);this._tId=0;this.active=false;this._q=[];this.fire("stop");return this;},getCallback:function(E){for(var F=0,D=this._q.length;F<D;++F){if(this._q[F].name===E){return this._q[F];}}return null;},promote:function(D){if(!this.isReady()){var E=this.after(A,function(){this._promote(D);E.detach();},this);}else{this._promote(D);}return this;},_promote:function(E){var F,D,G;for(F=0,D=this._q.length;F<D;++F){if(this._q[F]===E||this._q[F].name===E){G=this._q.splice(F,1)[0];this._q.unshift(G);this.fire("promoteCallback",G);break;}}},remove:function(D){if(!this.isReady()){var E=this.after(A,function(){this._remove(D);E.detach();},this);}else{this._remove(D);}return this;},_remove:function(E){for(var F=0,D=this._q.length;F<D;++F){if(this._q[F]===E||this._q[F].name===E){this.fire("removeCallback",this._q.splice(F,1));D--;}}}},true);C.augment(C.Queue,C.Event.Target,true);},"@VERSION@",{requires:["queue-base","event"]});