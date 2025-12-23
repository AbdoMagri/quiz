fetch('https://raw.githubusercontent.com/AbdoMagri/quiz/main/quiz.json')
.then(res => {
  if (!res.ok) {
    throw new Error('HTTP error!');
  }
  return res.json()
})
.then(data => {
  let cocontainer = document.querySelector('.cocontainer');
  let choose = document.querySelector(".choose");
  let categoriesDiv = document.querySelector(".categories");
  let categoriesArr = [];
  for (let i = 0 ; i < data["categories"].length; i++) {
    categoriesArr.push(data["categories"][i]["category"]);
  }
  console.log(categoriesArr);
  categoriesArr.forEach(el => {
    let category = document.createElement("div");
    category.classList.add('category');
    category.innerHTML = el;
    categoriesDiv.appendChild(category);
  })
  let selectedCategory;
  let indexCategory;
  let category = document.querySelectorAll('.category');
  category.forEach((element, i) => {
    element.addEventListener('click', e => {
      selectedCategory = e.target.innerHTML;
      indexCategory = i;
      console.log(indexCategory)
      cocontainer.classList.toggle("hidden");
      choose.classList.toggle("hidden");
      loadQuestion();
    })
  });
  let questionBox = document.querySelector(".question-box");
  let options = document.querySelectorAll(".option");

  let current = 0;
  let score = 0;
  function loadQuestion() {
    
    let question = data.categories[indexCategory]["questions"][current]
    questionBox.innerHTML = question.question;

    options.forEach((option, index) => {
        option.textContent = question.options[index];
        option.dataset.index = index;
      });
  }
  options.forEach(option => {
    option.addEventListener('click', e => {
      let selected = Number(e.target.dataset.index);
      let correct = data.categories[indexCategory].questions[current].correct_answer;

      if (selected === correct) {
        score++;
      }
      current++;
      if(current < data.categories[indexCategory].questions.length) {
        loadQuestion();
      }
      else {
        questionBox.textContent = `Quiz finished, Your sore: ${score} / ${data.categories[indexCategory].questions.length}`
        options.forEach(option => {
          option.classList.add('hide');
        })
      }
    })
  })
  
  
})

