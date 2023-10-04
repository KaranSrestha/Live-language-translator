const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchange = document.querySelector(".exchange");
const copyBtn = document.querySelector(".copyBtn");
const pasteBtn = document.querySelector(".pasteBtn");
const speakTransBtn = document.querySelector(".sayTranslation");
const speakOrigBtn = document.querySelector(".sayOriginal");

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

function speakText(text, lan) {
    console.log(text, lan);
    const speechSynthesis = window.speechSynthesis;
    const speechUtterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const desiredVoice = voices.find(voice => voice.lang === lan);
    speechUtterance.voice = desiredVoice;
    speechSynthesis.speak(speechUtterance);
}

translateBtn.addEventListener("click", ()=>{
    let text = fromText.value;
    const from_lan = selectTag[0].value;
    const to_lan = selectTag[1].value;
    // console.log(text, from_lan, to_lan);
    fetch(`https://api.mymemory.translated.net/get?q=${text}&de=h2641526@gmail.com&langpair=${from_lan}|${to_lan}`)
    .then(res => res.json())
    .then(data => {
        toText.value=data.responseData.translatedText
    });
});



exchange.addEventListener("click", ()=>{
    let temp = fromText.value;
    let tempLan = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = temp;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLan;
});

copyBtn.addEventListener("click", async ()=>{
    const copyText = toText.value;
    try{
        await navigator.clipboard.writeText(copyText);
        copyBtn.innerHTML = "<i class='fa-solid fa-copy' style='display: none'></i> <span style='color: #9f9f9f; font-size: 14px;'>Copied</span>";
        setTimeout(()=>{
            copyBtn.innerHTML = "<i class='fa-solid fa-copy'></i>";
        }, 500);
    }catch(err){
        console.log(err);
    }
});
pasteBtn.addEventListener("click", async ()=>{
    try{
        const text = await navigator.clipboard.readText();
        fromText.value = text;
        pasteBtn.innerHTML = "<i class='fa-solid fa-paste' style='display: none'></i> <span style='color: #9f9f9f; font-size: 14px;'>Pasted</span>";
        setTimeout(()=>{
            pasteBtn.innerHTML = "<i class='fa-solid fa-paste'></i>";
        }, 500);
    }catch(err){
        console.log(err);
    }
});

speakTransBtn.addEventListener("click", ()=>{
    if ('speechSynthesis' in window) {
        let text = toText.value;
        speakText(text, selectTag[1].value);
    } else {
        alert("Not Supported");
    }
    
});
speakOrigBtn.addEventListener("click", ()=>{
    if ('speechSynthesis' in window) {
        let text = fromText.value;
        speakText(text, selectTag[0].value);
    } else {
        alert("Not Supported");
    }
});