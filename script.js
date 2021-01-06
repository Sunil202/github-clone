let search = document.getElementById('search');
let template = document.getElementById('template');

search.addEventListener('keyup', (e)=>{
   let searchText = e.target.value;
   SearchGithubProfiles(searchText);
   
})
let searchByVoice = document.querySelector('#speechIcon');
searchByVoice.addEventListener('click', (e)=>{
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.addEventListener('result' , (e)=>{
        let transcript = [...e.results]
        .map((result)=>result[0])
        .map((result) =>result.transcript)
        .join("").replace(/\s/g,"");
        console.log(transcript);
        search.value = transcript;
        let searchText = transcript;
        SearchGithubProfiles(searchText);
    })
    recognition.start();
});

function SearchGithubProfiles(searchText){
   
    let Client_Id ="b32d2dda7b397557e954";
    let Client_Secret = "39c58e07c22be752b595c097321875a3846e778f";
    let BASE_URL =`https://api.github.com/users/${searchText}?client_id=${Client_Id}&client_secret=${Client_Secret}`;
    window.fetch(BASE_URL)
    .then(data =>{
        data.json().then(users =>{
            let output = "";
            if(users.message ==="Not Found"){
             template.innerHTML = `<p style="color:red">User Not Found</p>`
            }else{
                output +=`
            <section id="profileBlock">
            <article>
            <div class="leftblock">
            <img src="${users.avatar_url}" alt="man">
            <h3>${users.name}</h3>
            <h4>${users.login}</h4>
            </div>
            <div class="rightblock">
            <h4>${users.starred_url}</h4></div>
            </article>
            </section>`;
            template.innerHTML = output; 

            }
        })
        .catch((err)=>console.log(err))
    })
     .catch((err)=>console.log(err));
}

  
        

// let header = document.getElementById("header");
//  let button =  document.querySelector('.button');
// button.addEventListener('click' , (e) =>{
//     button.innerHTML = "Speak Now";
//     window.SpeechRecognition = 
//     window.SpeechRecognition || window.webkitSpeechRecognition;
    
//     let recognition = new SpeechRecognition();
//     recognition.interimResults = true;
//     recognition.addEventListener("result" , (e)=>{
        
//       let transcript = [...e.results]
//       .map((result) => result[0])
//       .map((result) => result.transcript)
//       .join("");
//       let p = document.createElement('p');
      
//       header.appendChild(p);
//       p.textContent = transcript;
       
//     });
    
    
//     recognition.start();
// });

