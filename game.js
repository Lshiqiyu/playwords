
	function game(){
		this.arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
		this.imgs={A:"images/A.png",B:"images/B.png",C:"images/C.png",D:"images/D.png",E:"images/E.png",F:"images/F.png",G:"images/G.png",H:"images/H.png",I:"images/I.png",J:"images/J.png",K:"images/K.png",L:"images/L.png",M:"images/M.png",N:"images/N.png",O:"images/O.png",P:"images/P.png",Q:"images/Q.png",R:"images/R.png",S:"images/S.png",T:"images/T.png",U:"images/U.png",V:"images/V.png",W:"images/W.png",X:"images/X.png",Y:"images/Y.png",Z:"images/Z.png"}
		this.len=3;
		this.currentLetter=[];
		this.currentSpan=[];
		this.clientW=document.documentElement.clientWidth;
		this.clientH=document.documentElement.clientHeight;
		this.t;
		this.speed=2;
		this.guanqia=1;
		this.life=5;		
		this.currScore=0;
		this.zscore=0;
		this.step=10;
		this.lifeEle=$(".life")[0];
		this.guanqiaEle=$(".guanqia")[0];
		this.currScoreEle=$(".score")[0];
		this.zscoreEle=$(".zscore")[0];

		this.starts=$(".start")[0];
		this.agains=$(".again")[0];
		this.tankuang=$(".tankuang")[0];
		this.tu3=$(".tu3")[0];
		this.sure1=$(".sure",this.tankuang)[0];
		this.cancel1=$(".cancel",this.tankuang)[0];
		this.shuoming=$(".shuoming")[0];
	}
	game.prototype={
		play:function(){
			this._createSpan(this._getRand(this.len))
			this._move(this.currentSpan);
			this._key(this.currentSpan);
		},
		
		_key:function(currentSpan){
			var that=this;
			document.onkeydown=function(e){
				var e=e||window.event;  
				var letter=String.fromCharCode(e.keyCode);  
				for (var i = 0; i < that.currentLetter.length; i++) {
			 		if(that.currentLetter[i]==letter){
			 			document.body.removeChild(that.currentSpan[i]);          		
                		that.currentSpan.splice(i,1);
                		that.currentLetter.splice(i,1);
                		that._createSpan(that._getRand(1));
                		that.currScore++;
                		that.zscore++;
                		that.currScoreEle.innerHTML=that.currScore;
                		
               			that.zscoreEle.innerHTML=that.zscore;
                		if (that.currScore%that.step==0) {
                			clearInterval(that.t)
                			
                   			// alert("恭喜进入下一关！");
                    		that.tankuang.style.display="block" ; 
                            // that.tu3.style.display="block" ; 
                            that.sure1.onclick=function(){
                            that._next(); 
                            // that.tu3.style.display="none" ; 
                            that.tankuang.style.display="none" ; 
                            }
                            that.cancel1.onclick=function(){
                                // that.tu3.style.display="none" ; 
                            	that.tankuang.style.display="none" ;
                            	location.reload()
                            }                   
               			};
			 		}
				}; 
			}
		},
		_next:function(){
			this.life=5;
			this.lifeEle.innerHTML=this.life;
			this.currScore=0;
			this.currScoreEle.innerHTML=this.currScore;
			this.guanqia++;
			this.guanqiaEle.innerHTML=this.guanqia;
			this.speed++;
			this.step+=5;
			if(this.speed>10){
	       		this.speed=10;
	    	}
	    	this.len++;
		    if(this.len>15){
		        this.len=15;
		    }
		    this.zscoreEle.innerHTML=this.zscore;
			clearInterval(this.t);
			for (var j = 0; j < this.currentSpan.length; j++) {
		       document.body.removeChild(this.currentSpan[j])
		    }
		    this.currentLetter=[];
		    this.currentSpan=[];
			this._createSpan(this._getRand(this.len));
			this._move(this.currentSpan);
			this._key(this.currentSpan);
		},
		_move:function(){
			var that=this;
			that.t=setInterval(function(){
				for (var i = 0; i < that.currentSpan.length; i++) {
					var tops=that.currentSpan[i].offsetTop+that.speed;
					that.currentSpan[i].style.top=tops+"px";
					if(tops>that.clientH){
						document.body.removeChild(that.currentSpan[i]);
                		that.currentSpan.splice(i,1);
                		that.currentLetter.splice(i,1);
                		that._createSpan(that._getRand(1));
                		that.life--;
                		that.lifeEle.innerHTML=that.life;
                		if (that.life<=0) {
                			clearInterval(that.t)
                			that.starts.style.display="block"
                			that.agains.onclick=function(){
                				location.reload()
                			}
                    		// alert("GAMEOVER")
                    		// location.reload()
                		};
					}
				};
			},60)
		},
		_getRand:function(num){
			var newarr=[];
			for (var i = 0; i < num; i++) {
				var letter=this.arr[(Math.floor(Math.random()*this.arr.length))];
				while(this._check(letter,this.currentLetter)){
					letter=this.arr[(Math.floor(Math.random()*this.arr.length))];
				}
				newarr.push(letter);
				this.currentLetter.push(letter);		
			};
			return newarr;
		},
		_check:function(val,arr){
			for (var i = 0; i <arr.length; i++) {
				if(arr[i]==val){
					return true;
				}
			};
			return false;
		},
		_createSpan:function(arr){
			var newarr=[];
			for (var i = 0; i < arr.length; i++) {
				var spans=document.createElement("span");
				spans.innerHTML="<img src="+this.imgs[arr[i]]+">";
				var lefts=(150+Math.random()*(this.clientW-300));
				document.body.appendChild(spans);
				while(this._checkPos(lefts,this.currentSpan)){
					lefts=(150+Math.random()*(this.clientW-300));
				}
				newarr.push(spans);
				this.currentSpan.push(spans);
				spans.style.cssText="position:absolute;left:"+lefts+"px;top:"+(Math.random()*30-10)+"px;";
				 
			};
			return newarr;
		},
		_checkPos:function(ele,elearr){
			for (var i = 0; i < elearr.length; i++) {
				if(ele>elearr[i].offsetLeft-50&&ele<elearr[i].offsetLeft+50){
					return true;
				}
			};
			return false;
		}
	}