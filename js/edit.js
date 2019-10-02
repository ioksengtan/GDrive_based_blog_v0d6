var currFileID;
var currFolderID;
var logout = function() {
    firebase.auth().signOut();
}



$(document).ready(function(e) {
    //firebase
    var config = {
        apiKey: "AIzaSyAtI63y6oM7PO4p0U2AEMsXrhScPYeC3GA",
        authDomain: "uxapi-74e8b.firebaseapp.com",
        databaseURL: "https://uxapi-74e8b.firebaseio.com",
        projectId: "uxapi-74e8b",
        storageBucket: "",
        messagingSenderId: "1051481601400"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log('hi,' + firebaseUser.email);
            uid = firebaseUser.uid;

        } else {
            console.log('not logged in');
            window.location = "login.html";
        }
    });
	  editor = CodeMirror.fromTextArea(document.getElementById("text-input"), {
		lineNumbers: true,
	  });
	  editor.on("change", function(cm, change) {
			doc = editor.getDoc();
			
			preview.innerHTML = "";
			content = doc.getValue();
			[ListMdppObject, ListDiv] = mdpp2ListDiv(content);

			ListDiv2StaticDisplay(ListMdppObject, ListDiv, $('#preview'));
			for (var i = 0; i < ListMdppObject.length; i++) {
				DynamicDisplay(ListMdppObject, ListDiv, i);
			}
			//$('#preview').html(html_content);
			var preview_height = $('#preview').height();
			if (preview_height < 500) preview_height = 500;

			$('.AutoHeight').height(preview_height);
			$('img').width('70%');
    

			
	})
    //end of firebase
    $('#text').focus(function() {
        $('#text').val("");
    });
    $('#text').val("input your command here\n");

    $('#text').keypress(function(e) {
        //socket.emit('client_data', {
        //  'letter': String.fromCharCode(e.charCode)
        //}i);

        if (e.charCode == 13) { //enter(i.e. return)
            num_input_element = $('#text').val().split('\n').length;
            //		console.log($('#text-input').val());
            var cmd;
            if (num_input_element == 1) {
                cmd = $('#text').val();
            } else {
                cmd = $('#text').val().split('\n')[1];

            }

            $('#text').val('');
        }
    });
    var converter = new showdown.Converter();
    converter.setOption('tables', true);
    converter.setOption('tasklists', true);


    new Editor($$("text-input"), $$("preview"));

    $('#diagram').hide()
	
	if (window.location.search != ""){
		var text_argument_set = window.location.search.split("?")[1].split('&');
		var numArguments = text_argument_set.length;
		arg_set = {};
		text_argument_set.forEach(item => {
			arg_set[item.split('=')[0]] = parseInt(item.split('=')[1]);
			if (arg_set["FileID"]) currFileID = arg_set["FileID"];
			if (arg_set["FolderID"]) currFolderID = arg_set["FolderID"];
			//currFileID = window.location.search.split("?")[1].split('&')[0].split("=")[1];
			//currFolderID = window.location.search.split("?")[1].split('&')[1].split("=")[1];



    $('#folder_selection select').val(currFolderID);
    //console.log(currFileID);
    $.get(appBlogs,

        {
            FileID: currFileID,
            "command": "read"
        },
        function(data) {
            console.log("the result is :" + data);
            title = data.split('$$')[0];
            content = data.split('$$')[1];
            $('#is_draft_id').val(data.split('$$')[2]);
            $('#is_public_id').val(data.split('$$')[3]);
            folderID = parseInt(data.split('$$')[4]);
            $('#StarCheckbox').prop('checked', parseInt(data.split('$$')[5]));
            $('#smallimage').val(data.split('$$')[6]);
            $('#folder_selection select').val(folderID);
            /*
            var mode = content.pop();
            if(mode=="777"){
              $('#is_publicInput').attr('checked', true);
            }else if (mode == "000"){
              $('#is_publicInput').attr('checked', false);
            }
            content.shift();

            $('#text-input').val(content.join());
            */
            $('#text-input').val(content);
            $('#text-input')[0].editor.update()
            $('#titleInput').val(title);
            $('img').width('70%');
        });			
		})		
	}
    


    document.getElementById('text-input').focus();

});

function Delete() {
    console.log(currFileID);
    $.get(appFiles, {

            "command": "commandDeleteFile",
            "FileID": currFileID
        },
        function(data) {
            $(location).attr('href', 'admin.html');
        });

}

function View() {
    var search = window.location.search;
    window.open('blog.html' + search, '_blank');
}

function SendScore() {
    $('#feedback').html('')
    var currFileID = window.location.search.split("?")[1].split('&')[0].split("=")[1];
    //console.log(currFileID);
    var mode;
    if ($("#is_publicInput").prop("checked")) {
        mode = "777"
    } else {
        mode = "000"
    }
    $.post(appFiles, {

            "command": "blog_update",
            "FileID": currFileID,
            "FolderID": parseInt($('#folder_selection select').val()),
            "filename": document.getElementById("titleInput").value,
            "content": document.getElementById("text-input").value,
            "is_public": parseInt($('#is_public_id').val()),
            "is_draft": parseInt($('#is_draft_id').val()),
            "is_star": ($('#StarCheckbox').is(":checked") == true) ? 1 : 0,
            "uid": uid,
            "smallimg": $('#smallimage').val()
        },
        function(data) {
            if (data == "true") {
                $('#feedback').html('done')
            }
        }
    );
    var ResourceContentToSend = "";
    var ResourceNameToSend = "";
    for (var i = 0; i < ListMdppObject.length; i++) {
        switch (ListMdppObject[i].property) {
            case "list":

                var ResourceRawSet = ListMdppObject[i].data.split("\n");

                ResourceNameToSend = ResourceRawSet[0];
                ResourceRawSet.shift();
                ResourceRawSet.pop();

                ResourceContentToSendSet = ResourceRawSet.join("\n");
                //console.log('list');
                ResourceContentToSend += ResourceNameToSend; //name
                ResourceContentToSend += "$$";
                ResourceContentToSend += "list"; //type
                ResourceContentToSend += "$$";
                ResourceContentToSend += ResourceContentToSendSet; //content
                ResourceContentToSend += "||";
                break;
            default:
                break;
        }

    }

    //console.log(ResourceContentToSend);
    $.post(appResources, {
        "command": "commandPostResources",
        "FileID": currFileID,
        "ResourceContent": ResourceContentToSend,
        "ResourceName": ResourceNameToSend
    }, function(data) {

    })

}

function Editor(input, preview) {
    this.update = function() {
        preview.innerHTML = "";
        content = input.value;
        [ListMdppObject, ListDiv] = mdpp2ListDiv(content);

        ListDiv2StaticDisplay(ListMdppObject, ListDiv, $('#preview'));
        for (var i = 0; i < ListMdppObject.length; i++) {
            DynamicDisplay(ListMdppObject, ListDiv, i);
        }
        //$('#preview').html(html_content);
        var preview_height = $('#preview').height();
        if (preview_height < 500) preview_height = 500;

        $('.AutoHeight').height(preview_height);
        $('img').width('70%');
    };
    input.editor = this;
    //	$("#text-input").height($("#preview").height());
    //	input.height(preview.height());
    this.update();
}
var $$ = function(id) {
    return document.getElementById(id);
};