function displayPoem(response){
    console.log("poem generated");
    new Typewriter("#poem", {
        strings: response.data.answer,
        autoStart: true,
        delay: 1,
        cursor: "",
      });
}




function generatePoem(event){
    event.preventDefault();
    
    let instructionsInput = document.querySelector("#user-instructions");
    let apiKey ="b2ftbed3f683eac832c6c0ec983o4a40";
    let prompt =`User instructions: Generate a English poem about flowers ${instructionsInput.value}`;
    let context ="You are a romantic poem expert and you love to write short poems. your mission is to generate a four line poem in basic HTML and separate each line with a <br>. DO NOT write the word html at all on the poem page, just start generating the poem itself without saying anything else.sign the poem saying by Emily's AI poem generator with a <strong> it should be italic. make sure to follow the user instructions";
    let apiUrl =`https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;
    let poemElement = document.querySelector("#poem");
    poemElement.classList.remove("hidden");
    poemElement.innerHTML = `<div class="generating"> ⏳ Generating the English Poem for you about ${instructionsInput.value}</div>`;


    console.log("Generating poem");
    console.log(`Prompt: ${prompt}`);
    console.log(`Context: ${context}`);

    axios.get(apiUrl).then(displayPoem);

   

    
}

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);