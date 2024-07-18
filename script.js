function element(tag, className, id, text) {
    const tags = document.createElement(tag);
    tags.classList = className;
    tags.id = id;
    tags.innerHTML = text;
    return tags;
  }
  
  const container = element("div", "container", "", "");
  const h1 = element(
    "h1",
    "text-center mt-5 mb-5",
    "title",
    "cartoon card(Poket)"
  );
  const p = element(
    "h3",
    "text-center",
    "para",
    "It's a collection of card. In this database. Don't worry i will update sooner."
  );
  const row = element(
    "div",
    "row align-items-center justify-content-center",
    "",
    ""
  );
  
  const api = fetch(
    `https://api.pokemontcg.io/v2/cards?apiKey=09d37829-10f6-4139-907f-2320952deca3`
  );
  api
    .then((response) => response.json())
    .then((ele) => {
      const cards = ele.data;
      cards.sort(
        (a, b) => a.nationalPokedexNumbers[0] - b.nationalPokedexNumbers[0]
      );
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        // console.log(card.images.small);
        const box = document.createElement("div");
        box.classList = "col-lg-6 col-md-12 col-sm-12 mt-2 mb-4";
        box.innerHTML = `
          <div class="card bg-dark">
              <div class="card-header bg-primary">
                  <h5 class="text-center text-gold">${card.name}</h5>
              </div>
              <div class="row align-items-center justify-content-between d-flex flex-row">
                  <div class="col-lg-5 col-md-6 col-sm-6">
                      <img src="${card.images.small}" class="card-img-top" alt="${card.name}" class="img-fluid">
                  </div>
                  <div class="col-lg-7 col-md-6 col-sm-6">
                      <div class="card-body text-start">
                          <h5 class="text-gold">Type : ${card.types}</h5>
                          <h5 class="text-gold">Card Series : ${card.set.series}</h5>
                          <h5 class="text-gold">Rarity  : ${card.rarity}</h5>
                          <p class="text-gold"><span class="bb-gold mt-5">${card.name}'s fact :</span> ${card.flavorText}</p>
                      </div>
                  </div>
              </div>
          </div>
        `;
  
        row.appendChild(box);
      }
      container.appendChild(h1);
      container.appendChild(p);
      container.appendChild(row);
      document.body.append(container);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });