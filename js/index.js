
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");

selectTag.forEach((tag, id) => {
    for (const code in countries) {
        let selected;
        if(id==0 && code == "en-GB"){
            selected="selected"
        }else if(id==1 && code == "hi-IN"){
            selected="selected"
        }
        let option = `<option value=${code} ${selected}>${countries[code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});


translateBtn.addEventListener("click", ()=>{
    let text = fromText.value;
    const from_lan = selectTag[0].value;
    const to_lan = selectTag[1].value;
    // console.log(text, from_lan, to_lan);
    fetch(`https://api.mymemory.translated.net/get?q=${text}&de=h2641526@gmail.com&langpair=${from_lan}|${to_lan}`)
    .then(res => res.json())
    .then(data => {
        toText.value=data.responseData.translatedText
    })
})



