

function displayContent(response) { 
    console.log("Content generated");
    new Typewriter("#content", {
        strings: response.data.answer,
        autoStart: true,
        delay: 50, 
        cursor: "",
    });
}

function generateContent(event) { 
    event.preventDefault();
    
    const instructionsInput = document.querySelector("#user-instructions").value;
    const contentType = document.querySelector("#content-type").value; 
    const apiKey = "b2ftbed3f683eac832c6c0ec983o4a40";
    
    // Define prompts and contexts based on content type
    let prompt = `Generate a ${contentType} about ${instructionsInput}`;
    let context = "";

    switch(contentType) {
        case "poem":
            context = "You are a romantic poem expert and you love to write short poems. Your mission is to generate a four-line poem in basic HTML and separate each line with a <br>. Do NOT write the word 'HTML' at all on the poem page, just start generating the poem itself without saying anything else. Sign the poem saying Emily's AI poem generator with a <strong> it should be italic. Make sure to follow the user instructions.";
            break;
        case "joke":
            context = "You are a stand-up comedian expert. Generate a funny joke based on the topic provided. The joke should be in basic HTML, Dont add the word html at all in the poem.DO NOT write the word 'HTML' at all on the poem page, just start generating the poem itself without saying anything else";
            break;
        case "recipe":
            context = "You are a culinary expert. Generate a simple recipe based on the provided ingredients or dish name. Format it in basic HTML with clear instructions.Do NOT write the word 'HTML' at all on the poem page, just start generating the poem itself without saying anything else";
            break;
        case "quote":
            context = "You are a motivational speaker. Generate an inspiring quote based on the provided theme. Format it in basic HTML.Do NOT write the word 'HTML' at all on the poem page, just start generating the poem itself without saying anything else";
            break;
        case "travel":
            context = "You are a travel guide expert. Generate a travel destination description based on the provided location. Include interesting facts and tips in basic HTML.Do NOT write the word 'HTML' at all on the poem page, just start generating the poem itself without saying anything else";
            break;
        case "baby-name":
            context = "You are a baby naming expert. Generate a list of unique baby names based on the provided criteria or theme. Format the list in basic HTML.Do NOT write the word 'HTML' at all on the poem page, just start generating the poem itself without saying anything else";
            break;
        default:
            context = "Generate content based on the user's instructions.Do NOT write the word 'HTML' at all on the poem page, just start generating the poem itself without saying anything else";
    }

    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;
    
    let contentElement = document.querySelector("#content");
    contentElement.classList.remove("hidden");
    contentElement.innerHTML = `<div class="generating">⏳ Generating the ${contentType} for you...</div>`;

    console.log("Generating content");
    console.log(`Prompt: ${prompt}`);
    console.log(`Context: ${context}`);

    axios.get(apiUrl)
        .then(displayContent)
        .catch(error => {
            console.error("Error generating content:", error);
            contentElement.innerHTML = `<div class="error">❌ Failed to generate content. Please try again later.</div>`;
        });
}

let formElement = document.querySelector("#content-generator-form"); // Updated selector
formElement.addEventListener("submit", generateContent);
