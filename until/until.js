const until={
	isEmptyObj:function(obj){
		for(let i in obj){
			return false;
		}
		return true;
	}	
};

module.exports=exports=until;