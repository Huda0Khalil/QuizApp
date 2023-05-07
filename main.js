const container = document.querySelector(".container");
const question = document.querySelector(".question");
const opt = document.querySelectorAll('input.opt');
const label = document.querySelectorAll("label");
const progress = document.querySelector(".progress");
const bar = document.querySelector(".bar");
const prog  = document.querySelector(".prog");
let sec = document.querySelector(".sec");
let min = document.querySelector(".min");
console.log(opt);
container.style ="display: none;";
progress.style = "visibility:hidden";
const next = document.querySelector("#next");
const finish = document.querySelector("#finish");
finish.style = "display: none";
var c = 0;
/*create array contains numbers of questions */
let arr = GenerateArray([]);
console.log(arr);
let randomNumber = Math.floor(Math.random() * 9 + 1);
console.log(randomNumber);
console.log(question);
console.log("******")

let myRequest = new XMLHttpRequest();
myRequest.open("GET", "info.json");
myRequest.send();
console.log(myRequest);


myRequest.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
        let data = JSON.parse(myRequest.responseText);
function* generateInfo(){
        for(let n = 0; n < 10; n++){
            yield data.Questions[n];
        }     
}
var checkRadio = document.querySelector('input[name="answer"]:checked');

function build(j,exam){
    question.innerHTML = data.Questions[arr[j]].q;
    for (let i = 0; i <label.length; i++ ){
        label[i].innerHTML = data["Questions"][arr[j]].a[i].text;
        opt[i].value = data["Questions"][arr[j]].a[i].isCorrect;
    }
    //reset all radio button
    checkRadio = null;
    for (let i = 0; i<4; i++){
        opt[i].checked = false;
    }

}
        // state  store the state of snawer (correct or wrong) to calculate score  
        var state ;
        var TC;
        let start = document.querySelector("#start");
        start.addEventListener('click',()=>{
            TC = setInterval(timerCounterdown, 1000);

            start.style = "visibility: hidden;";
            var j = 0;
            var barWidth = 9;
            bar.style = `width: ${barWidth}%; transition: 0.3s`;
            prog.innerHTML = `${j+1} / 10`;
            container.style = "display: block;";
            progress.style = "visibility: visible";
            let generator = generateInfo();
            var exam = generator.next().value;
            build(j, exam);
            if (checkRadio == null){
                next.style = "opacity: 0.5; pointer-events: none; "

            }
            for(let i = 0; i < opt.length; i++){
                opt[i].onchange = ()=>{
                    checkRadio =  document.querySelector('input[name="answer"]:checked');
                    console.log(checkRadio.value);
                    state = checkRadio.value;
                    next.style = "opacity: 1.0;"
                }
            }
            
           
            next.addEventListener('click', ()=>{
                next.style = "opacity: 0.5; pointer-events: none;";
                barWidth += 9;
                bar.style = `width: ${barWidth}% ;transition: 0.3s`;
                if(checkRadio != null ){
                console.log("state = " + state);
                // for loop to check on the correct answer 
                for (let i = 0; i < 4; i++){
                    console.log("state = " + state);
                    if (state == "true"){
                        c++;
                       // console.log("c= "+ c);
                        break;
                    }
                }
                j++;
                prog.innerHTML = `${j+1} / 10`;

                if(j == 9){
                    finish.style = "display: block; ";
                    next.style = "display: none";

                    console.log(finish);
                }
                exam = generator.next().value;

                build(j,exam);
                for(let i = 0; i < opt.length; i++){
                    opt[i].onchange = ()=>{
                        checkRadio =  document.querySelector('input[name="answer"]:checked');
                        console.log(checkRadio.value);
                        state = checkRadio.value;
                        next.style = "opacity: 1.0; pointer-events: auto;";
                        if (j == 9){
                            next.style = "display: none";

                        }

                    }
                }}
                

            })
            finish.addEventListener('click', ()=>{
                bar.style = `width: ${100}% ;transition: 0.3s`;
                if(checkRadio != null){
                    for (let i = 0; i < 4; i++){
                        console.log("state = " + state);
                        if (state == "true"){
                            c++;
                           // console.log("c= "+ c);
                            break;
                        }
                    }
                    console.log("c = " + c);
                    console.log(finish);
                    //
                    //finish.style = "pointer-events: none;";
                    progress.style = "visibility: hidden;"
                    //box appear when user finish quiz
                    container.innerHTML = `you are finished the quiz in ${difTime(15, 00, min.innerHTML, sec.innerHTML)} time and your score is ${c} out of 10.`;
                    container.style = "font-size:25px; height: 328px; display: flex; align-items: center; justify-content: center; font-weight: bold;"
                    clearInterval(TC);
                }

                
                
            })
           
           /* let checkRadio =  document.querySelector('input[name="answer"]:checked');
            console.log(checkRadio);*/
    })}}
    
    //
    function timerCounterdown(){
        
        if(min.innerHTML  >= 0 && sec.innerHTML >= 0){
            if (sec.innerHTML == 0 && min.innerHTML > 0){
                sec.innerHTML = 60;
                if( min.innerHTML.length == 2 && min.innerHTML <= 10){
                    min.innerHTML = `0${min.innerHTML - 1}`;
                }
                else
                min.innerHTML -= 1; 
            }
            if(sec.innerHTML <= 60 && sec.innerHTML >= 1){
                if( sec.innerHTML.length == 2 && sec.innerHTML <= 10){
                    sec.innerHTML = `0${sec.innerHTML - 1}`;
                }
                else
                sec.innerHTML -= 1;
            }
           
            if( sec.innerHTML == 0 && min.innerHTML ==0){
                //DEFINE CurrentCheckRadio to get the option selected in last time before click on next or finish
                let CurrentCheckRadio =  document.querySelector('input[name="answer"]:checked');
                console.log(CurrentCheckRadio);
                if (CurrentCheckRadio != null && CurrentCheckRadio.value == "true"){
                    c++;
                }
                container.innerHTML = `Sorry, the time is finished  and your score is ${c} out of 10.`;
                container.style = "font-size:25px; height: 328px; display: flex; align-items: center; justify-content: center; font-weight: bold;"
            }
            
            
        }}

        function difTime(min1, sec1, min2, sec2){
            if(min1 <= 60 && min2 <= 60){
                var MIN0 = min1 - min2;
                var SEC0;
                if(sec1 < sec2){
                    MIN0 -= 1;
                    sec1 += 60 ;
                    SEC0 = sec1 - sec2;
                }
                else{
                    SEC0 = sec1 - sec2;
                }
                if(MIN0 >= 10 && SEC0 >= 10){
                    return `${MIN0}:${SEC0}`;
                }
                else if(MIN0 < 10 && SEC0 < 10){
                    return`0${MIN0}:0${SEC0}`;
                }
                else if( MIN0 < 10 && SEC0 >= 10){
                    return `0${MIN0}:${SEC0}`;
                }
                else if (MIN0 >= 10 && SEC0 < 10 ){
                    return `${MIN0}:0${SEC0}`;
                }
            }
        
        }
           /*
            console.log(generator.next().value.id);
            question.innerHTML = data.Questions[arr[0]].q;
            for (let i = 0; i < 4; i++){
                label[i].innerHTML = data["Questions"][arr[0]].a[i].text;
                opt[i].value = data["Questions"][arr[0]].a[i].isCorrect;
            }*/
            /*
        next.addEventListener('click',()=>{
            j++;
            if(j == 9){
                finish.style = "display: block; ";
                next.style = "display: none";
                console.log(finish);
            }
            var checkRadio = document.querySelector('input[name="answer"]:checked');

            console.log(checkRadio);
          
            
                
                question.innerHTML = data.Questions[arr[j]].q;
                for (let i = 0; i <label.length; i++ ){
                    label[i].innerHTML = data["Questions"][arr[j]].a[i].text;
                    opt[i].value = data["Questions"][arr[j]].a[i].isCorrect;

                }
                if (checkRadio != null){
                    let x = checkRadio.value;
                    console.log("////////////");
                    for (let i = 0; i < 4; i++){
                        console.log("j = " + j);
                        console.log(data["Questions"][arr[j-1]].a[i].isCorrect);
                        console.log(checkRadio);
                        if (data["Questions"][arr[j-1]].a[i].isCorrect && x == true){
                            c++;
                            console.log("c= "+ c);
                            break;
                        }
                    }
                    checkRadio = document.querySelector('input[name="answer"]:checked');

               //reset all radio button
                for (let i = 0; i<4; i++){
                    opt[i].checked = false;
                }
               /*
                opt1.checked = false;
                opt2.checked = false;
                opt3.checked = false;
                opt4.checked = false;


            }
            else{
                console.log("please select any answer");
            }
            console.log("c = " + c);

            
        })
        });

        finish.addEventListener('click', ()=>{
            console.log("c = " + c);
        })
        }
    }


generate array includes 10 random numbers between 0 and 9 */
function GenerateArray(array){
    while (array.length <= 9){
        let randomNumber = Math.floor(Math.random() * 10);
        if (array.length === 0){
            array.push(randomNumber);
        }
        else{
            array = array.filter(el => el != randomNumber);
            array.push(randomNumber);
         }
    }
    return array;
}