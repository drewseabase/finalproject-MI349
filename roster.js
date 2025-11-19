 document.addEventListener("DOMContentLoaded", function(){
        const featuredSection = document.querySelector(".roster-profile.featured");
        const featuredImg = document.getElementById("featured-photo");
        const featuredName = document.getElementById("featured-name");
        const featuredMeta = document.getElementById("featured-meta");
        const featuredBio = document.getElementById("featured-bio");
        const featuredPRs = document.getElementById("featured-prs");
        const featuredFacts = document.getElementById("featured-facts");

        const featuredPRList = document.querySelector("#featured-prs ul");
        const featuredFactsList = document.querySelector("#featured-facts ul");
        const cards = document.querySelectorAll(".roster-card");

        function updateFeaturedFromCard(card){
            const name = card.dataset.name;
            const meta = card.dataset.meta;
            const bio = card.dataset.bio;
            const img = card.dataset.img;
            const prs = card.dataset.prs;

            featuredName.textContent = name;
            featuredMeta.textContent = meta;
            featuredBio.textContent = bio;
            featuredImg.src = img;
            featuredImg.alt = name+"headshot";

            if(prs && featuredPRlist){
                featuredPRList.innerHTML ="";
                prs.split("|").forEach(pr =>{
                    const li = document.createElement("li");
                    li.textContent = pr.trim();
                    featuredPRList.appendChild(li);
                });
            }
            if(facts && featuredFactsList){
                featuredFactsList.innerHTML="";

                const factsArray = facts.split("|");

                factsArray.forEach(facts =>{
                    const li = document.createElement("li");
                    li.textContent = facts.trim();
                    featuredFactsList.appendChild(li);
                })
            }
        }
        if (cards.length > 0){
            const randomIndex = Math.floor(Math.random() * cards.length);
            updateFeaturedFromCard(cards[randomIndex]);
        }
        cards.forEach(card => {
            card.addEventListener("click" ,()=>{
                const name = card.dataset.name;
                const meta = card.dataset.meta;
                const bio = card.dataset.bio;
                const img = card.dataset.img;
                const prs = card.dataset.prs;
                const facts = card.dataset.facts;

                featuredName.textContent = name;
                featuredMeta.textContent = meta;
                featuredBio.textContent = bio;
                featuredImg.src = img;
                featuredImg.alt = name + "headshot";
                
                if(prs && featuredPRList){
                    featuredPRList.innerHTML="";

                    const prArray = prs.split("|");

                    prArray.forEach(pr =>{
                        const li = document.createElement("li");
                        li.textContent = pr.trim();
                        featuredPRList.appendChild(li);
                    })
                }
                if(facts && featuredFactsList){
                    featuredFactsList.innerHTML="";

                    const factsArray = facts.split("|");

                    factsArray.forEach(facts =>{
                        const li = document.createElement("li");
                        li.textContent = facts.trim();
                        featuredFactsList.appendChild(li);
                    })
                }

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
        });

    });