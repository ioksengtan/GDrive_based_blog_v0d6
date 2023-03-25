var variable_manager = new VariableManager;
var ui_manager = new UImanager;

function DynamicDisplay(ListMdppObject, ListDiv, id) {


    if (ListMdppObject.length > 1) {
        switch (ListMdppObject[id].property) {
            case "ls": {

                $.get(appResources,

                    {
                        "command": "commandGetSpecificTypeResources",
                        "ResourceType": ListMdppObject[id].data
                    },
                    function(data) {
                        //console.log(data);
                        var div_id = '#div' + id;
                        var tmp = data.split('||');

                        tmp.pop();
                        //console.log(tmp);
                        //var content = tmp.split('$$')[2];
                        //data.split('||')[2];
                        //tmp.pop();
                        var tmp_text = "";
                        //tmp_text += "@ls list<br/>";
                        //tmp_text += "=====<br/>";
                        tmp.forEach(item => {
                            var resource_name = item.split("$$")[3];
                            var resource_id = item.split("$$")[0];
                            var resource_FileID = item.split("$$")[1];
                            var resource_content = item.split("$$")[2];

                            tmp_text += resource_name + ':' + resource_content;
                            tmp_text += "</br>";
                        })
                        //tmp_text += "=====<br/>";

                        //var content = tmp.split('$$')[2];
                        $(div_id).html(tmp_text);

                    }
                );
                break;
            }
            case "list_ref": {
                //console.log('dynamic list_ref');
                $.get(appResources,

                    {
                        "command": "commandGetSpecificResourceByName",
                        "ResourceName": ListMdppObject[id].data
                    },
                    function(data) {
                        //console.log(data);
                        var div_id = '#div' + id;
                        //console.log(div_id);
                        var ls_ref_content = data.split('$$')[1];
                        //console.log(ls_ref_content);
                        var find = '\n';
                        var re = new RegExp(find, 'g');

                        ls_ref_content = ls_ref_content.replace(re, '<br/>');
                        //console.log(ls_ref_content);
                        $(div_id).html(ls_ref_content);

                    }
                );
                break;
                break;
            }
            case "default":
                break;
        }
    }


}
//ListDiv2StaticDisplay(ListMdppObject, ListDiv, $('#preview'));
function ListDiv2StaticDisplay(ListMdppObject, ListDiv, DivToShow) {
	
    for (var i = 0; i < ListDiv.length; i++) {

        switch (ListMdppObject[i].property) {
            case "markdown_input": {
                var tmp_html_content = "";
                tmp_html_content += '<div contenteditable="true" id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "u2b": {
                var tmp_html_content = "";
                tmp_html_content += '<div id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "pdf": {
                var tmp_html_content = "";
                tmp_html_content += '<div id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "mp3": {
                var tmp_html_content = "";
                tmp_html_content += '<div id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "image": {
                var tmp_html_content = "";
                tmp_html_content += '<div class="resize-drag" id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "jog": {
                var tmp_html_content = "";
                tmp_html_content += '<div id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "image_rotation": {
                var tmp_html_content = "";
                tmp_html_content += '<div id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "html": {
                var tmp_html_content = "";
                tmp_html_content += '<div id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "ref": {
                var tmp_html_content = "";
                tmp_html_content += '<div class="system_msg" id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "ls": {
                var tmp_html_content = "";
                tmp_html_content += '<div class="system_msg" id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "ls_export": {
                var tmp_html_content = "";
                tmp_html_content += '<div id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "list": {
                var tmp_html_content = "";
                tmp_html_content += '<div class="system_msg" id="div' + i + '">';
                tmp_html_content += string2html(ListDiv[i]);
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "menu": {
                var tmp_html_content = "";
                tmp_html_content += '<div id="div' + i + '">';
                tmp_html_content += string2html(ListDiv[i]);
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "list_ref": {
                //console.log('list_ref');
                var tmp_html_content = "";
                tmp_html_content += '<div class="system_msg" id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
            case "plot": {
                var tmp_html_content = "";
                tmp_html_content += '<div id="div' + i + '">'
                tmp_html_content += ListDiv[i];

                //showPlot('2d', [variable_lib[var_x], variable_lib[var_y]], "div"+i);

                var tmp_argument_set = ListMdppObject[i].data.split(" ");
                var var_x_name = tmp_argument_set[1];
                var var_y_name = tmp_argument_set[3];

                var var_x_value = variable_manager.variable_objects[var_x_name];
                var var_y_value = variable_manager.variable_objects[var_y_name];

                if (typeof var_x_value == "undefined" | typeof var_y_value == "undefined") {
                    tmp_html_content += "!!! x undefined or y undefined, please check"
                    tmp_html_content += '</div>'
                    DivToShow.append(tmp_html_content);
                } else {
                    tmp_html_content += '</div>'
                    DivToShow.append(tmp_html_content);
                    //console.log('x:'+var_x_name+',y:'+var_y_name);
                    //showPlot('2d', [[1,2,3], [3,4,5]], "#div"+i);
                    showPlot('2d', [var_x_value, var_y_value], "#div" + i);
                }

                break;
            }
            case "set": {
                var tmp_html_content = "";
                tmp_html_content += '<div id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                var var_name = ListMdppObject[i].data.replace(/ +/g, '').split('=')[0];
                var var_value = ListMdppObject[i].data.replace(/ +/g, '').split('=')[1];
                var new_var_x = {
                    'name': var_name,
                    'value': eval(var_value)
                };
                variable_manager.newVariable(new_var_x, display_var);
                break;
            }
            case "print": {
                var tmp_html_content = "";
                tmp_html_content += '<div class="system_msg" name=' + ListMdppObject[i].data + ' id="div' + i + '">'
                //tmp_html_content += DivSet[i];
                //tmp_html_content += '<br/>===<br/>';
                tmp_html_content += variable_manager.variable_objects[ListMdppObject[i].data];
                //tmp_html_content += '<br/>===<br/>';
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                //var var_name = ListMdppObject[i].data.replace(/ +/g,'').split('=')[0];
                //var var_value = ListMdppObject[i].data.replace(/ +/g,'').split('=')[1];
                //var new_var_x = {'name':var_name, 'value':eval(var_value)};
                //variable_manager.newVariable(new_var_x, display_var);
                break;
            }
            case "whos": {

                var tmp_html_content = "";
                tmp_html_content += '<div class="system_msg" id="div' + i + '">'
                //tmp_html_content += DivSet[i];
                tmp_html_content += variable_manager.listVariables();
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                //var var_name = ListMdppObject[i].data.replace(/ +/g,'').split('=')[0];
                //var var_value = ListMdppObject[i].data.replace(/ +/g,'').split('=')[1];
                //var new_var_x = {'name':var_name, 'value':eval(var_value)};
                //variable_manager.newVariable(new_var_x, display_var);
                break;
            }
            case "ui_slidebar": {
                var tmp_html_content = "";
                tmp_html_content += '<div id="div' + i + '">'
                tmp_html_content += ListDiv[i];
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                let var_name = ListMdppObject[i].data.split(' ')[1];

                ui_manager.newSlidebar('#div' + i, var_name);
                let new_var = {
                    'name': var_name,
                    'value': 50
                };
                variable_manager.newVariable(new_var, display_var);
                break;
            }
            case "marked": {
                var tmp_html_content = "";
                tmp_html_content += '<div id="div' + i + '">'
                tmp_html_content += '</div>'
                DivToShow.append(tmp_html_content);
                break;
            }
        }

    }

}

//input: string input_content
//output: [list_string ListMdppObject, ListDiv];
function mdpp2ListDiv(input_content) {
    variable_manager.clearVariables();
    var ListDiv = [];
    [preprocessed_content, parse_result, ListMdppObject] = html_preprocessing(input_content);
							  
													 
 
    for (var i = 0; i < ListMdppObject.length; i++) {
        switch (ListMdppObject[i].property) {
            case "markdown_input": {
                var html_results = markdown.toHTML(ListMdppObject[i].data);
                ListDiv.push(html_results);
                break;
            }
            case "html": {
                ListDiv.push(ListMdppObject[i].data);
                break;
            }
            case "u2b": {
                ListDiv.push(ListMdppObject[i].data);
                break;
            }
            case "pdf": {
                var pdf_content = "<embed src= \"";
                pdf_content += ListMdppObject[i].data;
                pdf_content += "\" width= \"100%\" height=\"400\">";
                ListDiv.push(pdf_content);
                break;
            }
            case "ref": {
                ListDiv.push(ListMdppObject[i].data);
                break;
            }
            case "list": {
                ListDiv.push(ListMdppObject[i].data);
                break;
            }
            case "list_ref": {
                ListDiv.push("");
                break;
            }
            case "menu": {
                ListDiv.push(ListMdppObject[i].data);
                break;
            }
            case "ls": {
                //console.log(ListMdppObject[i].data);

                var ls_content = "[system message] syntax: ls [type]  : show all resources with specific type.<br/>"
                ls_content += "loading...<br/>"
                ls_content += ListMdppObject[i].data;
                ls_content += "<br/>"
                ListDiv.push(ls_content);
                break;
            }
            case "ls_export": {
                //console.log(ListMdppObject[i].data);
                ListDiv.push("");
                break;
            }
            case "mp3": {
                //console.log('image');
                //var image_content = "<img src=\"https://drive.google.com/uc?export=view&id=";

                //var mp3_content = "<audio controls><source src=\"https://drive.google.com/uc?export=view&id=";
                var mp3_content = "<audio controls><source src=\"";
                //var tmp_length_array = ListMdppObject[i].data.split("=").length;
                mp3_content += ListMdppObject[i].data;
                mp3_content += "\"  type=\"audio/ogg\">";
                mp3_content += "</audio>"
                //mp3_content += "<audio controls><source src=\"https://drive.google.com/uc?export=view&id=";
                var mp3_content = "<audio controls><source src=\"";
                var tmp_length_array = ListMdppObject[i].data.split("=").length;
                //mp3_content += ListMdppObject[i].data.split("=")[tmp_length_array - 1];
                mp3_content += ListMdppObject[i].data;
                mp3_content += "\"  type=\"audio/mpeg\">";
                mp3_content += "</audio>"
                ListDiv.push(mp3_content);
                break;
            }
            case "image": {
                //console.log('image');
                //var image_content = "<img src=\"https://drive.google.com/uc?export=view&id=";

                var image_content = "<img class=\"rotation\" src=\"https://drive.google.com/uc?export=view&id=";
                var tmp_length_array = ListMdppObject[i].data.split("=").length;
                image_content += ListMdppObject[i].data.split("=")[tmp_length_array - 1];
                image_content += "\">";
                ListDiv.push(image_content);
                break;
            }
            case "image_rotation": {
                console.log(ListMdppObject[i].data);
                //var image_content = "<img src=\"https://drive.google.com/uc?export=view&id=";
                var rotation_degrees = ListMdppObject[i].data.split(' ')[1];
                var image_content = "<img class=\"rotation" + rotation_degrees + "\" src=\"https://drive.google.com/uc?export=view&id=";
                var tmp_length_array = ListMdppObject[i].data.split(' ')[0].split("=").length;
                image_content += ListMdppObject[i].data.split(' ')[0].split("=")[tmp_length_array - 1];
                image_content += "\">";

                //console.log(rotation_degrees);
                //console.log(image_content);
                ListDiv.push(image_content);
                break;
            }
            case "flowchart": {
                var tmp = ListMdppObject[i].data;
                var diagram = flowchart.parse(tmp);
                $('#diagram').html('');
                //diagram.drawSVG('diagram');

                ListDiv.push($('#diagram').html());
                break;
            }
            case "plot": {
                var plot_content = "";
                plot_content += "@plot\n"
                plot_content += ListMdppObject[i].data;
                ListDiv.push(plot_content);
                break;
            }
            case "set": {
                var set_content = "";
                set_content += "@set\n"
                set_content += ListMdppObject[i].data;
                ListDiv.push(set_content);
                break;
            }
            case "jog": {
                var jog_content = "";
                jog_content += "@jog\n"
                jog_content += ListMdppObject[i].data;
                ListDiv.push(jog_content);
                break;
            }
            case "print": {
                var print_content = "";
                print_content += "@print\n"
                print_content += ListMdppObject[i].data;
                ListDiv.push(print_content);
                break;
            }
            case "whos": {
                var whos_content = "";
                whos_content += "@whos\n"
                whos_content += ListMdppObject[i].data;
                ListDiv.push(whos_content);
                break;
            }
            case "ui_slidebar": {
                var ui_slidebar_content = "";
                ui_slidebar_content += "@ui_slidebar\n"
                ui_slidebar_content += ListMdppObject[i].data;
                ListDiv.push(ui_slidebar_content);
                break;
            }
            case "marked": {
                var marked_content = "";
                //marked_content+= ListMdppObject[i].data;
                ListDiv.push(marked_content);
                break;
            }
        }
    }
    return [ListMdppObject, ListDiv];

}


/*
//input: string input_content
//output: [list_string ListMdppObject, ListDiv];
function mdpp2ListDiv(input_content) {
    variable_manager.clearVariables();
    var ListDiv = [];
    //[preprocessed_content, parse_result, ListMdppObject] = html_preprocessing(input_content);
	var str_mdpp = input_content;
	ListMdppObject = str_mdpp2list_mdpp_object(str_mdpp)
	
    for (var i = 0; i < ListMdppObject.length; i++) {
        switch (ListMdppObject[i].property) {
            case "markdown_input": {
                var html_results = markdown.toHTML(ListMdppObject[i].data);
                ListDiv.push(html_results);
                break;
            }
            case "html": {
                ListDiv.push(ListMdppObject[i].data);
                break;
            }
            case "u2b": {
                ListDiv.push(ListMdppObject[i].data);
                break;
            }
            case "pdf": {
                var pdf_content = "<embed src= \"";
                pdf_content += ListMdppObject[i].data;
                pdf_content += "\" width= \"100%\" height=\"400\">";
                ListDiv.push(pdf_content);
                break;
            }
            case "ref": {
                ListDiv.push(ListMdppObject[i].data);
                break;
            }
            case "list": {
                ListDiv.push(ListMdppObject[i].data);
                break;
            }
            case "list_ref": {
                ListDiv.push("");
                break;
            }
            case "menu": {
                ListDiv.push(ListMdppObject[i].data);
                break;
            }
            case "ls": {
                //console.log(ListMdppObject[i].data);

                var ls_content = "[system message] syntax: ls [type]  : show all resources with specific type.<br/>"
                ls_content += "loading...<br/>"
                ls_content += ListMdppObject[i].data;
                ls_content += "<br/>"
                ListDiv.push(ls_content);
                break;
            }
            case "ls_export": {
                //console.log(ListMdppObject[i].data);
                ListDiv.push("");
                break;
            }
            case "mp3": {
                //console.log('image');
                //var image_content = "<img src=\"https://drive.google.com/uc?export=view&id=";

                //var mp3_content = "<audio controls><source src=\"https://drive.google.com/uc?export=view&id=";
                var mp3_content = "<audio controls><source src=\"";
                //var tmp_length_array = ListMdppObject[i].data.split("=").length;
                mp3_content += ListMdppObject[i].data;
                mp3_content += "\"  type=\"audio/ogg\">";
                mp3_content += "</audio>"
                //mp3_content += "<audio controls><source src=\"https://drive.google.com/uc?export=view&id=";
                var mp3_content = "<audio controls><source src=\"";
                var tmp_length_array = ListMdppObject[i].data.split("=").length;
                //mp3_content += ListMdppObject[i].data.split("=")[tmp_length_array - 1];
                mp3_content += ListMdppObject[i].data;
                mp3_content += "\"  type=\"audio/mpeg\">";
                mp3_content += "</audio>"
                ListDiv.push(mp3_content);
                break;
            }
            case "image": {
                //console.log('image');
                //var image_content = "<img src=\"https://drive.google.com/uc?export=view&id=";

                var image_content = "<img class=\"rotation\" src=\"https://drive.google.com/uc?export=view&id=";
                var tmp_length_array = ListMdppObject[i].data.split("=").length;
                image_content += ListMdppObject[i].data.split("=")[tmp_length_array - 1];
                image_content += "\">";
                ListDiv.push(image_content);
                break;
            }
            case "image_rotation": {
                console.log(ListMdppObject[i].data);
                //var image_content = "<img src=\"https://drive.google.com/uc?export=view&id=";
                var rotation_degrees = ListMdppObject[i].data.split(' ')[1];
                var image_content = "<img class=\"rotation" + rotation_degrees + "\" src=\"https://drive.google.com/uc?export=view&id=";
                var tmp_length_array = ListMdppObject[i].data.split(' ')[0].split("=").length;
                image_content += ListMdppObject[i].data.split(' ')[0].split("=")[tmp_length_array - 1];
                image_content += "\">";

                //console.log(rotation_degrees);
                //console.log(image_content);
                ListDiv.push(image_content);
                break;
            }
            case "flowchart": {
                var tmp = ListMdppObject[i].data;
                var diagram = flowchart.parse(tmp);
                $('#diagram').html('');
                //diagram.drawSVG('diagram');

                ListDiv.push($('#diagram').html());
                break;
            }
            case "plot": {
                var plot_content = "";
                plot_content += "@plot\n"
                plot_content += ListMdppObject[i].data;
                ListDiv.push(plot_content);
                break;
            }
            case "set": {
                var set_content = "";
                set_content += "@set\n"
                set_content += ListMdppObject[i].data;
                ListDiv.push(set_content);
                break;
            }
            case "jog": {
                var jog_content = "";
                jog_content += "@jog\n"
                jog_content += ListMdppObject[i].data;
                ListDiv.push(jog_content);
                break;
            }
            case "print": {
                var print_content = "";
                print_content += "@print\n"
                print_content += ListMdppObject[i].data;
                ListDiv.push(print_content);
                break;
            }
            case "whos": {
                var whos_content = "";
                whos_content += "@whos\n"
                whos_content += ListMdppObject[i].data;
                ListDiv.push(whos_content);
                break;
            }
            case "ui_slidebar": {
                var ui_slidebar_content = "";
                ui_slidebar_content += "@ui_slidebar\n"
                ui_slidebar_content += ListMdppObject[i].data;
                ListDiv.push(ui_slidebar_content);
                break;
            }
            case "marked": {
                var marked_content = "";
                //marked_content+= ListMdppObject[i].data;
                ListDiv.push(marked_content);
                break;
            }
        }
    }
    return [ListMdppObject, ListDiv];

}
*/

function string2html(string_input) {
    var html_output = "";
    html_output += string_input.replace(/\n/g, '<br/>');
    return html_output;
}


var dict_mdpp_pattern = {
	"tag": RegExp("^!tag[ ]*"),
	//system_cmd    
    "publish": RegExp("^!publish[ ]*"),
    "html": RegExp("^@html[ ]*{[ ]*$"),
    "end": RegExp("^}$"),
    "u2b": RegExp("^@u2b{[ ]*$"),
    "flowchart": RegExp("^@flowchart{[ ]*$"),

    "sequence": RegExp("^@sequence{[ ]*$"),
    "script": RegExp("tag"),
    "data2div": RegExp("^@data2div{[ ]*$"),
    "ref": RegExp("^@ref{[ ]*$"),
    "list": RegExp("^@list{[ ]*$"),
    "menu": RegExp("^@menu{[ ]*$"),
    //"ls": RegExp("^@ls{[ ]*$"),

    // 1 line syntax
    "ls": RegExp("^@ls [a-z,0-9,A-Z]*[ ]*$"),
    "ls_export": RegExp("^@ls [a-z,0-9,A-Z]*[ ]+>[ ]+[a-z0-9A-Z\_]*$"),
    "image": RegExp("^@image [a-z0-9A-Z_\\-\\:\\/\\?\\=\\&\\.]*[\\t ]*$"),
    "image_rotation": RegExp("^@image [a-z0-9A-Z_\\-\\:\\/\\?\\=\\&\\.]*[ ]+[-]*[0-9]+[ ]*$"),
    "mp3": RegExp("^@mp3 [a-z0-9A-Z_\\-\\:\\/\\?\\=\\&\\.]*[\\t ]*$"),
    "plot": RegExp("^@plot ."),
    "set": RegExp("^@set ."),
    "print": RegExp("^@print ."),
    "whos": RegExp("^@whos[ ]*"),
    "jog": RegExp("^@jog ."),
    "pdf": RegExp("^@pdf ."),

    "marked": RegExp("^@#."),
    "list_ref": RegExp("^@list[ ]*:[ ]*[a-z0-9A-Z_\\-\\:\\/\\?\\=\\&\\.]*[\\t ]*$"),
    "ui_slidebar": RegExp("^@ui_slidebar ."),	
}

var dict_parser_state = {
		"idle": 0,
		"html": 1,		
};
var dict_doc_type = {
        'markdown': 0,
        'code': 1,
        'u2b': 2,
        'flowchart': 3,
        'sequence': 4,
        'image': 5,
        'data2div': 6,
        'ref': 7,
        'ls': 8,
        'list': 9,
        'plot': 10,
        'set': 11,
        'marked': 12,
        'ui_slidebar': 13,
        'menu': 14,
        'print': 15,
        'whos': 16,
        'mp3': 17,
        'jog': 18,
        'pdf': 19
};
//return mdppSet
function str_mdpp2list_mdpp_object(str_mdpp) {
	tmp = [];
	var list_mdpp_object = [];
	list_mdpp_statement = str_mdpp.split('\n');
	for( each_mdpp_statement in list_mdpp_statement){		
		//console.log(list_mdpp_statement[each_mdpp_statement]);
		state = 'markdown';
		for ( each_pattern in dict_mdpp_pattern) {				
			if ( dict_mdpp_pattern[each_pattern].test(list_mdpp_statement[each_mdpp_statement])) {
					console.log(dict_mdpp_pattern[each_pattern]);
					//tmp_html_content = "";					
					//var tmp = new StringNode(tmp_content, "html", "");
					//if (tmp_content != "") {
					//	mdppSet.push(tmp);
					//}
					//tmp_content = "";
				state = dict_mdpp_pattern[each_pattern];				
				console.log('state:'+state);
				break;
			}
		}
		tmp.push(state)
		//console.log(state);
		
	}
	
	
	return list_mdpp_object;
}

function mdpp2ListMdppObject_bak(str_mdpp) {
	
    var output = "";
    var parse_result = [];
    parse_result.publish = false;
    parse_result.code = [];
    content_array = content.split('\n');
    //console.log(content_array);
    //system_cmd
    var patt_tag = new RegExp("^!tag[ ]*");
    var patt_publish = new RegExp("^!publish[ ]*");
    //html
    var patt_html = new RegExp("^@html[ ]*{[ ]*$");
    var patt_end = new RegExp("^}$");
    var patt_u2b = new RegExp("^@u2b{[ ]*$");
    var patt_flowchart = new RegExp("^@flowchart{[ ]*$");

    var patt_sequence = new RegExp("^@sequence{[ ]*$");
    var patt_script = new RegExp("tag");
    var patt_data2div = new RegExp("^@data2div{[ ]*$");
    var patt_ref = new RegExp("^@ref{[ ]*$");
    var patt_list = new RegExp("^@list{[ ]*$");
    var patt_menu = new RegExp("^@menu{[ ]*$");
    //var patt_ls = new RegExp("^@ls{[ ]*$");

    // 1 line syntax
    var patt_ls = new RegExp("^@ls [a-z,0-9,A-Z]*[ ]*$");
    var patt_ls_export = new RegExp("^@ls [a-z,0-9,A-Z]*[ ]+>[ ]+[a-z0-9A-Z\_]*$");
    var patt_image = new RegExp("^@image [a-z0-9A-Z_\\-\\:\\/\\?\\=\\&\\.]*[\\t ]*$");
    var patt_image_rotation = new RegExp("^@image [a-z0-9A-Z_\\-\\:\\/\\?\\=\\&\\.]*[ ]+[-]*[0-9]+[ ]*$");
    var patt_mp3 = new RegExp("^@mp3 [a-z0-9A-Z_\\-\\:\\/\\?\\=\\&\\.]*[\\t ]*$");
    var patt_plot = new RegExp("^@plot .");
    var patt_set = new RegExp("^@set .");
    var patt_print = new RegExp("^@print .");
    var patt_whos = new RegExp("^@whos[ ]*");
    var patt_jog = new RegExp("^@jog .");
    var patt_pdf = new RegExp("^@pdf .");

    var patt_marked = new RegExp("^@#.");
    var patt_list_ref = new RegExp("^@list[ ]*:[ ]*[a-z0-9A-Z_\\-\\:\\/\\?\\=\\&\\.]*[\\t ]*$");
    var patt_ui_slidebar = new RegExp("^@ui_slidebar .");

    // end of 1 line syntax

    var flag_code = false;
    var flag_u2b = false;
    var flag_flowchart = false;
    var flag_sequence = false;
    var flag_image = false;
    var flag_data2div = false;
    var flag_ref = false;
    var flag_ls = false;
    var flag_list = false;
    var flag_menu = false;
    var flag_list_ref = false;
    var flag_plot = false;
    var flag_set = false;
    var flag_marked = false;
    var flag_ui_slidebar = false;
    var flag_print = false;
    var flag_whos = false;
    var flag_mp3 = false;
    var flag_jog = false;
    var flag_pdf = false;

    //n

    var dict_doc_type = {
        'markdown': 0,
        'code': 1,
        'u2b': 2,
        'flowchart': 3,
        'sequence': 4,
        'image': 5,
        'data2div': 6,
        'ref': 7,
        'ls': 8,
        'list': 9,
        'plot': 10,
        'set': 11,
        'marked': 12,
        'ui_slidebar': 13,
        'menu': 14,
        'print': 15,
        'whos': 16,
        'mp3': 17,
        'jog': 18,
        'pdf': 19
    }

    var doc_type = [];
    for (i in dict_doc_type) {
        doc_type[dict_doc_type[i]] = i;
    }

    var patt = [];
    for (var i = 1; i < Object.keys(doc_type).length; i++) {
        patt[i] = new RegExp("^@" + doc_type[i] + "{[ ]*$");;
    }
    patt[0] = new RegExp("^}$"); // end pattern
    //nn


    var tmp_html_content = "";
    var tmp_u2b_content = "";
    var tmp_flowchart_content = "";
    var tmp_sequence_content = "";
    var tmp_image_content = "";
    var tmp_image_rotation_content = "";
    var tmp_data2div_content = "";
    var tmp_content = "";
    var tmp_ref_content = "";
    var tmp_ls_content = "";
    var tmp_list_content = "";
    var tmp_menu_content = "";
    var tmp_list_ref_content = "";
    var tmp_plot_content = "";
    var tmp_set_content = "";
    var tmp_marked_content = "";
    var tmp_ui_slidebar_content = "";
    var tmp_print_content = "";
    var tmp_whos_content = "";
    var tmp_mp3_content = "";
    var tmp_jog_content = "";
    var tmp_pdf_content = "";

    //n
    var reg_content = [];
    for (var i = 0; i < Object.keys(doc_type).length; i++) {
        tmp_content[i] = "";
    }
    //nn


    var mdppSet = [];
    //parse_result.code.push("");
    //console.log('1:', mdppSet);
    for (id_content_array in content_array) {
        each_content = content_array[id_content_array];
        //console.log(each_content);
        if (patt_tag.test(each_content)) {
            var tag_content = each_content.split('!tag')[1];
            console.log('tag_content' + tag_content);
            var tag_content_array = tag_content.split(',');
            console.log('tag_content_array:' + tag_content_array);
            parse_result.tag_content_array = tag_content_array;
            mdppSet.push(StringNode(tag_content_array, "system_cmd", "tag"));
            console.log(mdppSet);
            continue;
        } else if (patt_publish.test(each_content)) {
            parse_result.publish = true;
            var tmp = new StringNode(true, "system_cmd", "publish");
            //console.log(tmp);
            mdppSet.push(tmp);
            //console.log('publish');
            continue;
        } else if (patt_html.test(each_content)) {
			//console.log('html');
            tmp_html_content = "";
            flag_code = true;
            var tmp = new StringNode(tmp_content, "html", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            continue;
        } else if (patt_u2b.test(each_content)) {
            tmp_u2b_content = "";
            flag_u2b = true;
            var tmp = new StringNode(tmp_content, "u2b", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            continue;

        } else if (patt_flowchart.test(each_content)) {
            tmp_flowchart_content = "";
            flag_flowchart = true;
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            continue;

        } else if (patt_sequence.test(each_content)) {
            tmp_sequence_content = "";
            flag_sequence = true;
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            continue;

        } else if (patt_ref.test(each_content)) {
            tmp_ref_content = "";
            flag_ref = true;
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            continue;

        } else if (patt_list.test(each_content)) {
            tmp_list_content = "";
            flag_list = true;
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            continue;

        } else if (patt_menu.test(each_content)) {
            tmp_menu_content = "";
            flag_menu = true;
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            continue;

        } else if (patt_ls.test(each_content)) {
            tmp_ls_content = "";
            //flag_ls = true;
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";

            var tmp = new StringNode(each_content.split(' ')[1], "ls", "");

            mdppSet.push(tmp);
            continue;

        } else if (patt_ls_export.test(each_content)) {
            tmp_ls_export_content = "";
            //flag_ls = true;
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            //console.log(each_content);
            var tmp = new StringNode(each_content.replace(/\s/g, '').substring(3, ).split(">")[1], "ls_export", "");
            //console.log(each_content);
            mdppSet.push(tmp);
            continue;

        } else if (patt_list_ref.test(each_content)) {
            //console.log(each_content);
            tmp_list_content = "";
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            var tmp = new StringNode(each_content.replace(/ /g, '').split(':')[1], "list_ref", "");
            mdppSet.push(tmp);

            continue;
        } else if (patt_pdf.test(each_content)) {
            //console.log(each_content);
            tmp_pdf_content = "";
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            var tmp = new StringNode(each_content.replace(/ +/g, ' ').substring(5, ), "pdf", "");
            mdppSet.push(tmp);

            continue;
        } else if (patt_plot.test(each_content)) {
            //console.log(each_content);
            tmp_plot_content = "";
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            var tmp = new StringNode(each_content.replace(/ +/g, ' ').substring(6, ), "plot", "");
            mdppSet.push(tmp);

            continue;
        } else if (patt_ui_slidebar.test(each_content)) {
            //console.log(each_content);
            tmp_slidebar_content = "";
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            var tmp = new StringNode(each_content.replace(/ +/g, ' ').substring(13, ), "ui_slidebar", "");
            mdppSet.push(tmp);

            continue;
        } else if (patt_set.test(each_content)) {
            //console.log(each_content);
            tmp_set_content = "";
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            var tmp = new StringNode(each_content.replace(/ +/g, ' ').substring(5, ), "set", "");
            mdppSet.push(tmp);

            continue;
        } else if (patt_print.test(each_content)) {
            //console.log(each_content);
            tmp_print_content = "";
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            var tmp = new StringNode(each_content.replace(/ +/g, ' ').substring(7, ), "print", "");
            mdppSet.push(tmp);

            continue;
        } else if (patt_whos.test(each_content)) {
            //console.log(each_content);
            tmp_whos_content = "";
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            var tmp = new StringNode(each_content.replace(/ +/g, ' ').substring(6, ), "whos", "");
            mdppSet.push(tmp);

            continue;
        } else if (patt_marked.test(each_content)) {
            //console.log(each_content);
            tmp_marked_content = "";
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            var tmp = new StringNode(each_content, "marked", "");
            mdppSet.push(tmp);

            continue;
        } else if (patt_mp3.test(each_content)) {
            //console.log(each_content);
            tmp_mp3_content = "";
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            var tmp = new StringNode(each_content.split(' ')[1], "mp3", "");
            mdppSet.push(tmp);

            continue;
        } else if (patt_jog.test(each_content)) {
            //console.log(each_content);
            tmp_jog_content = "";
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            var tmp = new StringNode(each_content.replace(/ +/g, ' ').substring(5, ), "jog", "");
            mdppSet.push(tmp);

            continue;
        } else if (patt_image.test(each_content)) {
            //console.log(each_content);
            tmp_image_content = "";
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            var tmp = new StringNode(each_content.split(' ')[1], "image", "");
            mdppSet.push(tmp);

            continue;
        } else if (patt_image_rotation.test(each_content)) {
            //console.log(each_content);
            tmp_image_rotation_content = "";
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            //console.log(tmp);
            tmp_content = "";
            var tmp = new StringNode(each_content.split(' ')[1] + ' ' + each_content.split(' ')[2], "image_rotation", "");
            mdppSet.push(tmp);

            continue;
        } else if (patt_data2div.test(each_content)) {
            tmp_data2div_content = "";
            flag_data2div = true;
            var tmp = new StringNode(tmp_content, "markdown_input", "");
            if (tmp_content != "") {
                mdppSet.push(tmp);
            }
            tmp_content = "";
            continue;

        } else if (patt_end.test(each_content)) {
            if (flag_code == true) {
                parse_result.code.push(tmp_content);
                if (patt_script.test(tmp_html_content)) {
                    console.log('script included');
                } else {
                    var tmp = new StringNode(tmp_html_content, "html", "");
                    mdppSet.push(tmp);
                }
                flag_code = false;
                tmp_content = "";
            }
            if (flag_marked == true) {
                var marked_content = "";
                marked_content += tmp_marked_content;
                var tmp = new StringNode(marked_content, "marked", "");
                mdppSet.push(tmp);
                flag_marked = false;

            }
            if (flag_ui_slidebar == true) {
                var ui_slidebar_content = "";
                ui_slidebar_content += tmp_ui_slidebar_content;
                var tmp = new StringNode(ui_slidebar_content, "ui_slidebar", "");
                mdppSet.push(tmp);
                flag_ui_slidebar = false;

            }
            if (flag_pdf == true) {
                var pdf_content = "";
                pdf_content += tmp_pdf_content;
                var tmp = new StringNode(pdf_content, "pdf", "");
                mdppSet.push(tmp);
                flag_pdf = false;

            }
            if (flag_set == true) {
                var set_content = "";
                set_content += tmp_set_content;
                var tmp = new StringNode(set_content, "set", "");
                mdppSet.push(tmp);
                flag_set = false;

            }
            if (flag_jog == true) {
                var jog_content = "";
                jog_content += tmp_jog_content;
                var tmp = new StringNode(jog_content, "jog", "");
                mdppSet.push(tmp);
                flag_jog = false;

            }
            if (flag_print == true) {
                var print_content = "";
                print_content += tmp_print_content;
                var tmp = new StringNode(print_content, "print", "");
                mdppSet.push(tmp);
                flag_print = false;

            }
            if (flag_whos == true) {
                var whos_content = "";
                whos_content += tmp_whos_content;
                var tmp = new StringNode(whos_content, "whos", "");
                mdppSet.push(tmp);
                flag_whos = false;

            }
            if (flag_plot == true) {
                var plot_content = "";
                plot_content += tmp_plot_content;
                var tmp = new StringNode(plot_content, "plot", "");
                mdppSet.push(tmp);
                flag_plot = false;

            }
            if (flag_u2b == true) {
                var forfun = "<iframe width='600' height='450' src='";
                forfun += tmp_u2b_content;
                forfun += "'></iframe>";
                var tmp = new StringNode(forfun, "u2b", "");
                mdppSet.push(tmp);
                flag_u2b = false;

            }
            if (flag_flowchart == true) {
                var flowchart_content = "";
                flowchart_content += tmp_flowchart_content;
                var tmp = new StringNode(flowchart_content, "flowchart", "");
                mdppSet.push(tmp);
                flag_flowchart = false;

            }
            if (flag_sequence == true) {
                var sequence_content = "";
                sequence_content += tmp_sequence_content;
                var tmp = new StringNode(sequence_content, "sequence", "");
                mdppSet.push(tmp);
                flag_sequence = false;

            }
            if (flag_mp3 == true) {
                var mp3_content = "<audio controls><source src=\"https://drive.google.com/uc?export=view&id=";
                mp3_content += tmp_mp3_content;
                mp3_content += "\"\" type=\"audo/mpeg\"></audio>"
                var tmp = new StringNode(mp3_content, "mp3", "");
                mdppSet.push(tmp);
                flag_mp3 = false;


            }
            if (flag_image == true) {
                var image_content = "<img src=\"https://drive.google.com/uc?export=view&id=";
                image_content += tmp_image_content;
                image_content += "\"/>"
                var tmp = new StringNode(image_content, "image", "");
                mdppSet.push(tmp);
                flag_image = false;


            }
            if (flag_list_ref == true) {
                var list_ref_content = "";
                list_ref_content += tmp_list_ref_content;
                var tmp = new StringNode(list_ref_content, "list_ref", "");
                mdppSet.push(tmp);
                flag_list_ref = false;


            }
            if (flag_ref == true) {

                var ref_content = "";
                ref_content += tmp_ref_content;

                var tmp = new StringNode(ref_content, "ref", "");
                mdppSet.push(tmp);
                flag_ref = false;


            }
            if (flag_list == true) {

                var list_content = "";
                list_content += tmp_list_content;

                var tmp = new StringNode(list_content, "list", "");
                mdppSet.push(tmp);
                flag_list = false;


            }
            if (flag_menu == true) {

                var menu_content = "";
                menu_content += tmp_menu_content;

                var tmp = new StringNode(menu_content, "menu", "");
                mdppSet.push(tmp);
                flag_menu = false;


            }
            if (flag_ls == true) {
                var ls_content = "";
                ls_content += tmp_ls_content;
                var tmp = new StringNode(ls_content, "ls", "");
                mdppSet.push(tmp);
                flag_ls = false;


            }

            if (flag_data2div == true) {
                var data2div_content = "";
                data2div_content += tmp_data2div_content;
                var tmp = new StringNode(data2div_content, "data2div", "");
                mdppSet.push(tmp);
                flag_data2div = false;


            }
            continue;
        }

        if (flag_code) {
            tmp_html_content += each_content;
        } else if (flag_u2b) {
            tmp_u2b_content += each_content;
        } else if (flag_flowchart) {
            tmp_flowchart_content += each_content;
        } else if (flag_sequence) {
            tmp_sequence_content += each_content;
        } else if (flag_image) {
            tmp_image_content += each_content;
        } else if (flag_mp3) {
            tmp_mp3_content += each_content;
        } else if (flag_data2div) {
            tmp_data2div_content += each_content;
        } else if (flag_ref) {
            tmp_ref_content += each_content;
        } else if (flag_list) {
            tmp_list_content += each_content + "\n";
        } else if (flag_menu) {
            tmp_menu_content += each_content + "\n";
        } else if (flag_ls) {
            tmp_ls_content += each_content;
        } else if (flag_list_ref) {
            tmp_list_ref_content += each_content;
        } else if (flag_plot) {
            tmp_plot_content += each_content;
        } else if (flag_set) {
            tmp_set_content += each_content;
        } else if (flag_jog) {
            tmp_jog_content += each_content;
        } else if (flag_ui_slidebar) {
            tmp_ui_slidebar_content += each_content;
        } else if (flag_marked) {
            tmp_marked_content += each_content;
        } else if (flag_print) {
            tmp_print_content += each_content;
        } else if (flag_whos) {
            tmp_whos_content += each_content;
        } else if (flag_pdf) {
            tmp_pdf_content += each_content;
        } else {
            output += each_content + '\n';
            tmp_content += each_content + '\n';
            //		console.log(tmp_content);

        }


    }
    if (tmp_content != "") {
        //console.log(tmp_content);
        var tmp = new StringNode(tmp_content, "markdown_input", "");
        mdppSet.push(tmp);
    }
    //	console.log('parse_result.code:'+mdppSet);
    return mdppSet
}
