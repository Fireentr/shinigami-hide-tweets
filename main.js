const observer = new MutationObserver(myFunction);

const config = { attributes: true, childList: true, subtree: true};

let listoflinks = []

observer.observe(document.body, config);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function myFunction(mutationsList, observer) {
    mutationsList.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(addedNode => {
                let links = addedNode.querySelectorAll('a')
                for (i = 0; i < links.length; i++){
                    sleep(700).then(() => { 
                        if(links[i].classList.contains("assigned-label-transphobic")){
                            addedNode.style.display = "none";
                            if(!listoflinks.includes(links[i].getAttribute("href").replace("/", ""))){
                                listoflinks += links[i].getAttribute("href").replace("/", "");
                                attemptBlock(links[i].getAttribute("href").replace("/", ""))
                            }
                        }
                     });
                }
            });
        }
    });
}

async function attemptBlock(user){
    console.log("Hiding: " + user)
}