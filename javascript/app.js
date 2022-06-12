console.log("hello");
let content = document.querySelector(".content");
let param = document.querySelector(".param");
let json_request = document.querySelector(".json_request");
content.style.display = "none";
param.style.display = "none";
json_request.style.display = "none";

const postradio = document.getElementById("post");
postradio.addEventListener("click", () => {
  content.style.display = "";
  json_request.style.display = "";
});

const getradio = document.getElementById("get");
getradio.addEventListener("click", () => {
    let added_param = document.getElementById("addedparams");
    added_param.style.display = "none";
  content.style.display = "none";
  json_request.style.display = "none";
  param.style.display = "none";
  paramshow.checked = false;
  jsonshow.checked = true;
});

const paramshow = document.getElementById("params");
paramshow.addEventListener("click", () => {
    let added_param = document.getElementById("addedparams");
    added_param.style.display = "";
  param.style.display = "";
  json_request.style.display = "none";
});

const jsonshow = document.getElementById("json");
jsonshow.addEventListener("click", () => {
    let added_param = document.getElementById("addedparams");
    added_param.style.display = "none";
  json_request.style.display = "";
  param.style.display = "none";
});
let plus_btn_click = 0;
const plus_btn = document.getElementById("plus-btn");
plus_btn.addEventListener("click", () => {
    let string = `<div class="row param my-3">
                    <legend class="col-form-label col-sm-3 pt-0">Parameter ${plus_btn_click + 2}:</legend>
                    <div class="col">
                        <div class="form-check">
                            <input type="text" class="form-control" id="key ${plus_btn_click + 2}" placeholder="Enter parameter ${plus_btn_click + 2} key" />
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input type="text" class="form-control" id="value ${plus_btn_click + 2}" placeholder="Enter parameter ${plus_btn_click + 2} value" />
                        </div>
                    </div>
                    <div class="col-2 p-0">
                        <button type="button" class="btn btn-danger minus-btn">&minus;</button>
                    </div>
                </div>`;
    let dom = elementfromstring(string);
    document.getElementById("addedparams").appendChild(dom);
plus_btn_click++;
let minus_btn = document.getElementsByClassName("minus-btn");
for(item of minus_btn){
    item.addEventListener("click", (e)=>{
        let parent =e.target.parentElement;
        parent.parentElement.remove();
    })
}
});

function elementfromstring(string){
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
    
};

let submit_btn = document.getElementById("submit-btn");
submit_btn.addEventListener("click", ()=>{
    document.getElementById("response").innerHTML = "Please wait...!"
    Prism.highlightAll();
    let url = document.getElementById("url").value;
    let req_type = document.querySelector("input[name='gridRadios']:checked").value;
    let cont_type = document.querySelector("input[name='gridRadios1']:checked").value;
    let data = {};
    if(cont_type == "param"){
        for(let i=0; i<plus_btn_click+1; i++){
            if(document.getElementById(`key ${i+1}`) != undefined){
                data[document.getElementById(`key ${i+1}`).value] = document.getElementById(`value ${i+1}`).value;
            }
        }
        data = JSON.stringify(data);
        console.log(data);
    }
    else{
        data = document.getElementById("textarea").value;
        data = data.replace(/\s+/g, '');
        console.log(data);
    }

    if(req_type == "GET"){
        fetch(url, {
            method: req_type,
        }).then(response => response.text()).then((text)=>{
            document.getElementById("response").textContent = text;
            Prism.highlightAll();
        })
    }
    else{
        fetch(url, {
        method: req_type,
        body: data,
        headers:{"Content-type": "application/json; charset=UTF-8"}
    }).then(response=> response.text()).then(text=>{
            document.getElementById("response").textContent = text;
            Prism.highlightAll();
    })
    }
})

