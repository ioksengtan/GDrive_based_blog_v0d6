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
		lineWrapping: true
    });
	editor.setSize("100%","100%");
    editor.on("change", function(cm, change) {
            doc = editor.getDoc();
            gui_content_update();

        });
	editor.on("paste", async e => {
		//e.preventDefault();
		getClipboardContents(0);
  });
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

    if (window.location.search != "") {
        var text_argument_set = window.location.search.split("?")[1].split('&');
        var numArguments = text_argument_set.length;
        arg_set = {};
        text_argument_set.forEach(item => {
            arg_set[item.split('=')[0]] = parseInt(item.split('=')[1]);
            if (arg_set["FileID"]) currFileID = arg_set["FileID"];
            if (arg_set["FolderID"]) currFolderID = arg_set["FolderID"];
            //currFileID = window.location.search.split("?")[1].split('&')[0].split("=")[1];
            //currFolderID = window.location.search.split("?")[1].split('&')[1].split("=")[1];

            //console.log(currFolderID);
            $('#folder_selection').val(currFolderID);
            //console.log(currFileID);
            $.get(appBlogs,

                {
                    FileID: currFileID,
                    "command": "read"
                },
                function(data) {
                    //console.log("the result is :" + data);
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
                    doc = editor.getDoc();
                    doc.setValue(content);
                    $('#text-input').val(content);
                    $('#text-input')[0].editor.update()
                    $('#titleInput').val(title);
                    $('img').width('70%');
                });
        })
    }

    document.getElementById('text-input').focus();

});

function insertTextAtCursor(editor, text) {
    var doc = editor.getDoc();
    var cursor = doc.getCursor();
    doc.replaceRange(text, cursor);
}

async function getClipboardContents(idx) {
  try {
	 //console.log('getClipboardContents');
    for (var i = 0; i < event.clipboardData.items.length; i++) {
      var item = event.clipboardData.items[i];
      if (item.type.indexOf("image") != -1) {
        const blob = await item.getAsFile();

        ConvertImgToBase64(blob).then(data => {
          post_to_imgur(idx, "https://api.imgur.com/3/image", data);
        });
      } else if (item.type.indexOf("plain") != -1) {
        // ignore not images
        const pasteString = await event.clipboardData.getData("Text");
        //let objDivEdit = document.getElementById("divEditContent");
        //objDivEdit.children[idx].children[1].innerHTML = pasteString;
      }
    }
  } catch (e) {
    console.error(e, e.message);
  }
}
function post_to_imgur(idx, path, imgData) {
  //let token = $("#fun6_clientId").val();
  let client_id = "5c4294468820af1";
  if (client_id && client_id !== "") {
    $.ajax({
      type: "POST",
      url: path,
      headers: {
        Authorization: "Client-ID " + client_id //放置你剛剛申請的Client-ID
        //Authorization: "Bearer " + token
      },
      mimeType: "multipart/form-data",
      data: { image: imgData.split(",")[1] },
      form: {
        image: imgData,
        type: "base64"
      },
      success: function(data) {		  
        //let objEdit = document.getElementById("divEditContent").children[idx]
        // .children[1];
        let jsonData = JSON.parse(data);
        //objEdit.innerHTML = jsonData.data.link;
        //editContent(objEdit);		
		insertTextAtCursor(editor, "![]("+jsonData.data.link+")");
      },
      error: function(data) {
        let result = JSON.parse(data.responseText);
        alert(result.data.error);
      }
    });
  } else {
    alert("Client ID can't be empty");
  }
}

function ConvertImgToBase64(file) {
  var result = new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });
  return result;
}
function gui_content_update() {
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

//
interact('.resize-drag')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

    inertia: true
  })
  .draggable({
    listeners: { move: window.dragMoveListener },
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ]
  })

//

}

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
	console.log('SendScore');
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
            //"content": document.getElementById("text-input").value,
			"content":editor.getDoc().getValue(),
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
