function displayCards() {
  const game = document.getElementById("game");
  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = card.content;
    game.appendChild(div);
  });
}

displayCards();