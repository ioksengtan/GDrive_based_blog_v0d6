function keyPressEvent() {
  let lKeyCode = navigator.appname == "Netscape" ? event.which : event.keyCode;
  switch (lKeyCode) {
    case 13:
      CreateNewRow();
      break;
  }
}

function keyUpEvent(e) {
  let lKeyCode = navigator.appname == "Netscape" ? event.which : event.keyCode;
  switch (lKeyCode) {
    case 38:
    case 40:
      setCaretPosition(e, caretPos, direction);
      break;
    default:
      editContent(e);
      break;
  }
}

function keyDownEvent(e) {
  let lKeyCode = navigator.appname == "Netscape" ? event.which : event.keyCode;
  switch (lKeyCode) {
    case 8:
      RowRemove(e);
      break;
    case 38:
    case 40:
      caretPos = getCaretPosition(e);
      direction = lKeyCode === 38 ? -1 : 1;
      break;
  }
}

function CreateNewRow() {
  let objDivEdit = document.getElementById("divEditContent");
  let objDivPreview = document.getElementById("divPreview");
  let idx = objDivEdit.children.length + 1;

  let divEditRow = document.createElement("div");
  divEditRow.setAttribute("class", "divEditRow");
  divEditRow.addEventListener("paste", async e => {
    e.preventDefault();
    getClipboardContents(idx - 1);
  });

  let divEditNo = document.createElement("span");
  divEditNo.setAttribute("class", "spEditNo");
  divEditNo.innerHTML = idx;
  divEditRow.appendChild(divEditNo);

  let divEditRowContent = document.createElement("div");
  divEditRowContent.setAttribute("class", "divNewEdit");
  divEditRowContent.setAttribute("contenteditable", "true");
  divEditRowContent.addEventListener("keyup", async () => {
    keyUpEvent(divEditRowContent);
  });
  divEditRowContent.addEventListener("keydown", async () => {
    keyDownEvent(divEditRowContent);
  });
  divEditRow.appendChild(divEditRowContent);

  let divEditImgSize = document.createElement("img");
  divEditImgSize.setAttribute("class", "img-sizectrl");
  divEditImgSize.setAttribute("src", "maximise.png");
  divEditImgSize.addEventListener("mousedown", async () => {
    setEditDivMouseDown(divEditRowContent);
  });
  divEditRow.appendChild(divEditImgSize);

  objDivEdit.appendChild(divEditRow);

  objDivPreview.innerHTML += '<div class="divNewPreview"></div>';

  objDivEdit.children[objDivEdit.children.length - 1].children[1].focus();
}

var caretPos = 0, //chart position
  direction = 0; //keybord row dir
function getCaretPosition(editableDiv) {
  let sel, range;
  caretPos = 0;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}

function setCaretPosition(editableDiv, caretPosition, direction) {
  let idx =
    parseInt(editableDiv.parentElement.children[0].innerHTML) - 1 + direction;
  if (editableDiv.parentElement.parentElement.children[idx]) {
    let objParent = editableDiv.parentElement.parentElement.children[idx];
    let el = objParent.children[1].childNodes[0];
    if (el) {
      el.focus;
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(el, el.length > caretPosition ? caretPosition : el.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      objParent.children[1].focus();
    }
  }
}

function editContent(e) {
  //Array.prototype.indexOf.call(objParent.children, e)
  let objParent = e.parentElement,
    idx = parseInt(objParent.children[0].innerHTML),
    objDivPreview = document.getElementById("divPreview"),
    objElementPreview = objDivPreview.children[idx - 1];
  objElementPreview.innerHTML = e.innerHTML;
  objDivPreview.scrollTo({
    top:
      objElementPreview.offsetHeight * idx -
      objElementPreview.offsetHeight +
      ((objElementPreview.offsetHeight - objElementPreview.clientHeight) *
        (idx - 1)) /
        2,
    behavior: "smooth"
  });

  let lKeyCode = navigator.appname == "Netscape" ? event.which : event.keyCode;
  if (lKeyCode === 13) clearBrDiv();
}

function clearBrDiv() {
  let objEdit = document.getElementById("divEditContent");
  for (i = 0; i < objEdit.children.length; i++) {
    let objRow = objEdit.children[i];
    if (objRow.children[1].children.length > 1)
      objRow.children[1].innerHTML = "";
  }
}

function RowRemove(e) {
  if (e.innerHTML === "") {
    let objEditArea = document.getElementById("divEditContent");
    let objPreviewArea = document.getElementById("divPreview");
    if (objEditArea.children.length === 1) {
      alert("can't remove the last row.");
    } else {
      let objEditRow = e.parentElement;
      let idx = parseInt(objEditRow.children[0].innerHTML) - 1;
      objEditArea.removeChild(objEditRow);
      objPreviewArea.removeChild(objPreviewArea.children[idx]);

      for (i = 0; i < objEditArea.children.length; i++) {
        objEditArea.children[i].children[0].innerHTML = i + 1;
      }

      objEditArea.children[
        objEditArea.children[idx] ? idx : idx - 1
      ].children[1].focus();
    }
  }
}

async function getClipboardContents(idx) {
  try {
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

function getToken() {
  path = `https://api.imgur.com/oauth2/authorize?client_id=${$(
    "#fun6_clientId"
  ).val()}&response_type=token&state=imgurUpdate`;
  let win = window.open(path, "_blank");
}

function post_to_imgur(idx, path, imgData) {
  let token = $("#fun6_clientId").val();
  if (token && token !== "") {
    $.ajax({
      type: "POST",
      url: path,
      headers: {
        Authorization: "Client-ID " + token //放置你剛剛申請的Client-ID
        //Authorization: "Bearer " + token
      },
      mimeType: "multipart/form-data",
      data: { image: imgData.split(",")[1] },
      form: {
        image: imgData,
        type: "base64"
      },
      success: function(data) {
        let objEdit = document.getElementById("divEditContent").children[idx]
          .children[1];
        let jsonData = JSON.parse(data);
        objEdit.innerHTML = jsonData.data.link;
        editContent(objEdit);
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

window.onload = function() {
  let objDivEdit = document.getElementById("divEditContent");
  objDivEdit.addEventListener("keypress", keyPressEvent);
  objDivEdit.children[0].addEventListener("paste", async e => {    
    getClipboardContents(0);
  });

  //default row set
  objDivEdit.children[0].children[1].addEventListener("keyup", async () => {
    keyUpEvent(objDivEdit.children[0].children[1]);
  });
  objDivEdit.children[0].children[2].addEventListener("mousedown", async () => {
    setEditDivMouseDown(objDivEdit.children[0].children[1]);
  });
  objDivEdit.children[0].children[1].addEventListener("keydown", async () => {
    keyDownEvent(objDivEdit.children[0].children[1]);
  });

  let objButtonFun1 = document.getElementById("btnFun1");
  objButtonFun1.addEventListener("click", async () => {
    set_edit_div_with_id();
  });
  let objButtonFun2 = document.getElementById("btnFun2");
  objButtonFun2.addEventListener("click", async () => {
    set_edit_div();
  });
  let objButtonFun3 = document.getElementById("btnFun3");
  objButtonFun3.addEventListener("click", async () => {
    set_preview_div();
  });
  let objButtonFun4 = document.getElementById("btnFun4");
  objButtonFun4.addEventListener("click", async () => {
    get_edit_div_content();
  });
  let objButtonFun5 = document.getElementById("btnFun5");
  objButtonFun5.addEventListener("click", async () => {
    get_edit_div_all_content();
  });
};

function set_edit_div_with_id() {
  let idx = parseInt($("#fun1_no").val()) - 1;
  let content = $("#fun1_content").val();
  let objDivEdit = document.getElementById("divEditContent");
  if (objDivEdit.children[idx]) {
    let objElementEdit = objDivEdit.children[idx].children[1];

    objElementEdit.innerHTML = content;
    objDivEdit.scrollTo({
      top:
        objElementEdit.offsetHeight * idx +
        (objElementEdit.offsetHeight - objElementEdit.clientHeight) * idx,
      behavior: "smooth"
    });
    editContent(objElementEdit);
  } else {
    alert("cant't find this row index");
  }
}

function set_edit_div() {
  let content = $("#fun2_content").val();
  let objDivEdit = document.getElementById("divEditContent");
  for (i = 0; i < objDivEdit.children.length; i++) {
    objDivEdit.children[i].children[1].innerHTML = content;
    editContent(objDivEdit.children[i].children[1]);
  }
}

function set_preview_div() {
  let content = $("#fun3_content").val();
  let objDivPreview = document.getElementById("divPreview");
  for (i = 0; i < objDivPreview.children.length; i++) {
    objDivPreview.children[i].innerHTML = content;
  }
}

function get_edit_div_content() {
  let idx = parseInt($("#fun4_no").val()) - 1;
  let objDivEdit = document.getElementById("divEditContent");
  if (objDivEdit.children[idx]) {
    let objElementEdit = objDivEdit.children[idx].children[1];
    $("#fun4_content").html(objElementEdit.innerHTML);
    $("#fun4_RtnArea").css("display", "block");
    objDivEdit.scrollTo({
      top:
        objElementEdit.offsetHeight * idx +
        (objElementEdit.offsetHeight - objElementEdit.clientHeight) * idx,
      behavior: "smooth"
    });
  } else {
    alert("cant't find this row index");
  }
}

function get_edit_div_all_content() {
  let objDivEdit = document.getElementById("divEditContent");
  let aryContent = [];
  for (i = 0; i < objDivEdit.children.length; i++) {
    aryContent.push(objDivEdit.children[i].children[1].innerHTML);
  }
  $("#fun5_content").html(JSON.stringify(aryContent));
  $("#fun5_RtnArea").css("display", "block");
}

//set div's height
var src_posi_Y = 0,
  dest_posi_Y = 0,
  move_Y = 0,
  is_mouse_down = false,
  destHeight = 30,
  editIdx;
function setEditDivMouseDown(e) {
  let objParent = e.parentElement;
  editIdx = parseInt(objParent.children[0].innerHTML) - 1;
  src_posi_Y = e.pageY;
  is_mouse_down = true;
}

$(function() {
  $(document)
    .bind("click mouseup", function(e) {
      if (is_mouse_down) {
        is_mouse_down = false;
      }
    })
    .mousemove(function(e) {
      if (is_mouse_down) {
        dest_posi_Y = e.pageY;
        move_Y = src_posi_Y - dest_posi_Y;
        src_posi_Y = dest_posi_Y;
        let objEditDiv = $(
          ".divNewEdit",
          $("#divEditContent").children(".divEditRow")[editIdx]
        );
        destHeight = objEditDiv.height() - move_Y;

        objEditDiv.css("height", destHeight);
      }
    });
});
