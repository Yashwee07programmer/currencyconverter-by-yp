
const dropdowns=document.querySelectorAll("form select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
   for(currcode in country_list){
    let newoption=document.createElement("option");
    newoption.innerText=currcode;
    newoption.value=currcode;
    if(select.name==="from" && currcode==="USD")
        {newoption.selected="selected";}
    else if(select.name==="to" && currcode==="INR")
        {newoption.selected="selected";}
    select.append(newoption);
   } 
   select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
   });
}
const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=country_list[currcode];
    let newsrc= `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}
btn.addEventListener("click",evt=>{
    evt.preventDefault();
    updaterate();
});
window.addEventListener("load",()=>{
    updaterate();
});
function updaterate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .msg");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal <= "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/c0d57627c7d695802010f2d5/latest/${fromcurr.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[tocurr.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromcurr.value} = ${totalExRate} ${tocurr.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something went wrong";
    });
}