let nummeme = document.querySelector("input");
let btn = document.querySelector("button");
let result = document.querySelector(".result");
let myerror = document.querySelector(".error");
nummeme.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    btn.click();
  }
});
btn.addEventListener("click", () => {
  let num = Number(nummeme.value);

  result.textContent = "";
  nummeme.value = "";
  if (num < 0 || num > 99) {
    myerror.textContent = "Please enter a number from 0 to 99";
    return;
  } else {
    myerror.textContent = "";

    fetch("https://api.imgflip.com/get_memes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API Error");
        }

        return response.json();
      })
      .then((data) => {
        let memes = data.data.memes;
        let meme = memes[num];

        result.innerHTML = `
                <h3>${meme.name}</h3>
                <img src="${meme.url}" width="300">
            `;
        nummeme.value = "";
      })
      .catch(() => {
        myerror.textContent = "Something went wrong. Please try again.";
      });
  }
});
