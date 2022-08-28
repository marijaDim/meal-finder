
const mealByName=`https://www.themealdb.com/api/json/v1/1/search.php?s=`;
const search=document.getElementById("search");
const wraper=document.querySelector(".mealShow");
let url=mealByName;

const mealByID= `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`;
const random=`https://www.themealdb.com/api/json/v1/1/random.php`;




document.getElementById("forma").addEventListener("submit", function(e){
    e.preventDefault();
    let userInput = search.value;
let myAPICall = mealByName + userInput;
if(userInput){
    getMealsName(url);
}
})


async function getMealsName(url){
try{
    let userInput = search.value;
    let myAPICall = mealByName + userInput;

    const response = await fetch(myAPICall);
    const respData = await response.json();
    showMeals(respData);
}
catch(err){
    console.log(err);
}
}

//SHOW MEALS

function showMeals(respData){ 
    let data=respData.meals;
    //console.log(data)
    let userInput=search.value;
    wraper.innerHTML="";
    let ispis=``;
    if (data === null) {
        document.querySelector(".searchMeal").innerHTML = `<h3>There are no search results. Try again!</h3>`;
    }else {
        document.querySelector(".searchMeal").innerHTML = `<h3>Search results for '${userInput}':</h3>`;
    data.forEach(element => {
        ispis="";
        const div = document.createElement("div");
        div.classList.add("one");
ispis+= `<img src="${element.strMealThumb}" alt="${element.strMeal}" data-id="${element.idMeal}" /><h2>${element.strMeal}</h2>`
        div.innerHTML=ispis;
        wraper.appendChild(div);
    });
}

const images=document.querySelectorAll(".one img");
images.forEach(element=>{
    element.addEventListener("click",function(e){
        let id=e.target.dataset.id;
        //console.log(id)
    findMealID(id);
    })
})
}


//FIND AND SHOW MEAL BY ID



async function findMealID(id){
    const res=await fetch(mealByID + id);
    const respData=await res.json();
    //  console.log(respData)

    showMealByID(respData);
}

async function showMealByID(respData){
    let data=respData;
    let myMeal=data.meals[0];

    //let meal_array = Object.keys(myMeal);
//console.log(meal_array)


let ispis="";
ispis = `<h2>${myMeal.strMeal}</h2><img src="${myMeal.strMealThumb}" alt="${myMeal.strMeal}" data-id="${myMeal.idMeal}">
<h3>Recipe:</h3> <p> ${myMeal.strInstructions}</p>
<h3>Ingredients:</h3><div id="sastojci">`;

for (let i = 1; i < 21; i++) {

        let sastojci = myMeal["strIngredient" + i];
        let mere = myMeal["strMeasure" + i];


        if(sastojci !== null && sastojci !== ""){
            console.log(sastojci)
            //console.log(typeof sastojci);
            ispis += `<span class="ispis">${sastojci}:${mere}</span>`
        }
}

ispis+= "</div>"
document.getElementById("mealDes").innerHTML = ispis;
}



/**
 * SHOW RANDOM MEAL
 */
document.getElementById("random").addEventListener("click",getRandomMeal);

async function getRandomMeal(){
    const response=await fetch(random);
    
    const respData=await response.json();

    showRandomMeal(respData);
}

function showRandomMeal(respData){

    let data=respData;
    let myMeal=data.meals[0];

document.querySelector(".searchMeal").innerHTML= `<h3> Our random meal:</h3>`;
document.querySelector(".mealShow").innerHTML= `<div class="one"><img src="${myMeal.strMealThumb}" alt="${myMeal.strMeal}" data-id="${myMeal.idMeal}" /><h2>${myMeal.strMeal}</h2></div>`;

const images=document.querySelectorAll(" .mealShow img");
images.forEach(element=>{
    element.addEventListener("click",function(e){
        let id=e.target.dataset.id;
        // console.log(id)
    findMealID(id);
    })
})

}


