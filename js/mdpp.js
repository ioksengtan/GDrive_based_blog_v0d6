function mdppManager(){
	this.init();
};



mdppManager.prototype.init = function(){
	this.curr_mdpp_state_id = 0;
	this.list_mdpp_cmd_reg = [];
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
	this.dict_mdpp_states = {
		"idle":0,
		"block_html":1,
	}

}
mdppManager.prototype.clear = function(){
	this.curr_mdpp_state_id = this.dict_mdpp_states['idle'];
	this.reg_mdpp_statements = [];
	this.list_mdpp_cmd_reg = [];		
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

mdppManager.prototype.exec_mdpp_cmd = function(mdpp_input){
	//console.log('exec_mdpp_cmd:'+next_mdpp_class_id+','+next_mdpp_type_id+','+mdpp_input);
	console.log('curr_state:'+this.curr_mdpp_state_id);
	console.log('exec_mdpp_cmd:'+mdpp_input);	
	
	if (this.curr_mdpp_state_id == this.dict_mdpp_states['idle']){		
		
		if(this.dict_md_ext_cmd["html_block_start"].pattern.test(mdpp_input)){	
			this.curr_mdpp_state_id = this.dict_mdpp_states["block_html"];
		}else{
			this.list_mdpp_cmd_reg.push(
				{
					'type':'md',
					'cmd':mdpp_input
				}
			);
		}
		

	}else if(this.curr_mdpp_state_id == this.dict_mdpp_states['block_html']){
		if(this.dict_md_ext_cmd["end"].pattern.test(mdpp_input)){	
				this.curr_mdpp_state_id = this.dict_mdpp_states["idle"];			
		}else{
			this.list_mdpp_cmd_reg.push(
				{
					'type':'html',
					'cmd':mdpp_input
				}
			);			
		}
	}
	
	
	
}
function mdpp_cmd_Object(mdpp_cmd_type, mdpp_cmd_class, mdpp_cmd_arguments, mdpp_cmd_content){
	this.mdpp_cmd_type = mdpp_cmd_type;
	this.mdpp_cmd_class = mdpp_cmd_class;
	this.mdpp_cmd_arguments = mdpp_cmd_arguments;
	this.mdpp_cmd_content = mdpp_cmd_content;
}

mdppManager.prototype.mdpp_cmd_classifier = function(str_mdpp_cmd){
	let mdpp_type = "md";
	let mdpp_class = "md";
	let mdpp_arguments = "";
	let mdpp_content = "";

	for ( each_md_ext_cmd in this.dict_md_ext_cmd) {
		//cmd match md_ext pattern
		if(this.dict_md_ext_cmd[each_md_ext_cmd].pattern.test(str_mdpp_cmd)){			
			switch(each_md_ext_cmd){
				default:
					mdpp_class = "md_ext";
					mdpp_type = each_md_ext_cmd;
					mdpp_arguments = "";
					mdpp_content = str_mdpp_cmd;
			}
		}		
	}
	let mdpp_cmd_object = new mdpp_cmd_Object(mdpp_type, mdpp_class, mdpp_arguments, mdpp_content);
	return mdpp_cmd_object;
}

mdppManager.prototype.str_mdpp2list_mdpp_object= function (str_mdpp) {	
	console.log("debug start");
	tmp = [];
	this.clear();
	var list_mdpp_object = [];
	list_input_mdpp_cmds = str_mdpp.split('\n');
	var cnt = 0;
	for( each_mdpp_cmd_id in list_input_mdpp_cmds){		
		//console.log('curr mdpp state:'+this.curr_mdpp_state_id);
		//console.log('input[' + each_mdpp_cmd_id +']:'+ list_input_mdpp_cmds[each_mdpp_cmd_id]);
		
		this.exec_mdpp_cmd(list_input_mdpp_cmds[each_mdpp_cmd_id]);
		

	}
	
	
	return list_mdpp_object;
}