function mdppManager(){
	this.init();
};



mdppManager.prototype.init = function(){
	this.curr_mdpp_state_id = 0;
	this.reg_mdpp_statements = [];
	this.list_mdpp_states = [];	
	this.variable_manager = new VariableManager; 
	this.dict_md_ext_cmd = {
		"html_block_start": {
			"pattern":RegExp("^@html[ ]*{[ ]*$"),
		},
		"end": {
			"pattern":RegExp("^}$"),
		},
		"image": {
			"pattern":RegExp("^@image [a-z0-9A-Z_\\-\\:\\/\\?\\=\\&\\.]*[\\t ]*$"),
		}
		
	};
	this.dict_mdpp_class = {
		"md_null":0,//markdown
		"md_ext":1,//markdown-extension
		"md":2
	}
}
mdppManager.prototype.clear = function(){
	this.curr_mdpp_state_id = this.dict_mdpp_class['md_null'];
	this.reg_mdpp_statements = [];
	this.list_mdpp_states = [];		
	this.variable_manager.clearVariables();
}
var mdppObject = function(mdpp_cmd, mdpp_arguments) {
    this.mdpp_cmd = mdpp_cmd;
    this.mdpp_arguments = mdpp_arguments;
}

mdppManager.prototype.mdpp2ListDiv = function (input_content) {
    
    var ListDiv = [];
    //[preprocessed_content, parse_result, ListMdppObject] = html_preprocessing(input_content);
	var str_mdpp = input_content;
	ListMdppObject = this.str_mdpp2list_mdpp_object(str_mdpp)
	
    
    return [ListMdppObject, ListDiv];

}

mdppManager.prototype.exec_mdpp_cmd = function(next_mdpp_class_id, mdpp_input){
	//console.log('exec_mdpp_cmd:'+next_mdpp_class_id+','+next_mdpp_type_id+','+mdpp_input);
	console.log('exec_mdpp_cmd:'+next_mdpp_class_id+','+mdpp_input);
	console.log('curr_state:'+this.curr_mdpp_state_id);
	console.log('null_state:'+this.dict_mdpp_class['md_null']);
	if (this.curr_mdpp_state_id == this.dict_mdpp_class['md_null']){
		switch(next_mdpp_class_id){
			case this.dict_mdpp_class['md']:
				this.curr_mdpp_state_id = this.dict_mdpp_class['md'];		
				break;
			case this.dict_mdpp_class['md_ext']:
				this.curr_mdpp_state_id = this.dict_mdpp_class['md_ext'];				
				break;
			default:
				this.curr_mdpp_state_id = this.dict_mdpp_class['md_null'];
		}		
	}else if (this.curr_mdpp_state_id == this.dict_mdpp_class['md']){
		switch(next_mdpp_class_id){
			case this.dict_mdpp_class['md_null']:
				this.curr_mdpp_state_id = this.dict_mdpp_class['md_null'];		
				break;
			case this.dict_mdpp_class['md_ext']:
				this.curr_mdpp_state_id = this.dict_mdpp_class['md_ext'];				
				break;
		}		
	}
	
	
	
}
mdppManager.prototype.str_mdpp2list_mdpp_object= function (str_mdpp) {	
	console.log("debug start");
	tmp = [];
	this.clear();
	var list_mdpp_object = [];
	list_mdpp_cmds = str_mdpp.split('\n');
	var next_mdpp_class_default = this.dict_mdpp_class["md_null"];
	var next_mdpp_class_id = next_mdpp_class_default;
	var cnt = 0;
	for( each_mdpp_cmd_id in list_mdpp_cmds){
		next_mdpp_class_id = this.dict_mdpp_class["md"];
		//next_mdpp_type_id = this.dict_mdpp_type["md_null"];
		console.log('curr mdpp state:'+this.curr_mdpp_state_id);
		console.log('input[' + each_mdpp_cmd_id +']:'+ list_mdpp_cmds[each_mdpp_cmd_id]);
		

		for ( each_md_ext_cmd in this.dict_md_ext_cmd) {				
			if ( this.dict_md_ext_cmd[each_md_ext_cmd].pattern.test(list_mdpp_cmds[each_mdpp_cmd_id])) {									
				next_mdpp_class_id = this.dict_mdpp_class['md_ext'];		
				//next_mdpp_type_id = each_md_ext_cmd;
				break;
			}
			
		}
		
		this.exec_mdpp_cmd(next_mdpp_class_id, list_mdpp_cmds[each_mdpp_cmd_id]);
		

	}
	
	
	return list_mdpp_object;
}