version="v.2.0"

// For the HTML Pannel - - - - - - - - - - -
try {
    var newDiv = document.createElement("div");

    newDiv.innerHTML = `
    <style>
        #cheat-div{
            border-radius: 15px;
            background-color: #131313;
            position: fixed;
            z-index: 1000;
            width: 300px;
            height: 180px;
            left: 30px;
            bottom: 30px;
            box-shadow: 0px 0px 15px rgb(82, 82, 82);
        }
        #cheat-div h1{
            position: relative;
            font-size: 20px;
            font-weight: 700;
            color: rgb(231, 231, 231);
            top: 15px;
            width: 90%;
            left: 50%;
            transform: translate(-50%, 0%);
        }

        #cheat-div h3{
            position: relative;
            font-size: 12px;
            font-weight: 700;
            color: rgb(114, 114, 114);
            padding-bottom: 10px;
            width: 90%;
            left: 50%;
            top: -20px;
            border-bottom: 1px solid rgb(46, 46, 46);
            transform: translate(-50%, 0%);
        }

        #cheat-div button{
            transition: 700ms;
            top: -70px;
            position: relative;
            font-size: 16px;
            font-weight: 700;
            color: #000000;
            background-color: #78be76;
            padding-bottom: 10px;
            padding-top: 10px;
            width: 90%;
            border-radius: 10px;
            border: none;
            transform: translate(-50%, 0%);
            left: 50%;
            overflow: hidden;
            outline: none;
        }
        #cheat-div button:hover{
            transition: 700ms;
            background-color: #5f9b5e;
        }

        #cheat-div .loading{
            transition: 700ms;
            background-color: #414141;
        }
        #cheat-div .loading:hover{
            transition: 700ms;
            background-color: #414141;
        }

        .cheat-loader {
            position: absolute;
            right: 15px;
            top: 12px;
            border: 3px solid transparent; /* Light grey */
            border-top: 3px solid #000000; /* Blue */
            border-radius: 50%;
            width: 18px;
            height: 18px;
            animation: cheat-spin 2s linear infinite;
        }

        @keyframes cheat-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
        }

        #cheat-div p{
            position: relative;
            top: -60px;
            left: 5%;
            font-size: 17px;

            color: #a1a1a1;
            font-weight: 300;
        }

        #cheat-div .response{
            position: relative;
            left: 5%;

            color: #bbbbbb;
            font-weight: 500;
        }

        #cheat-div h2{
            position: absolute;
            top: -35px;
            right: 20px;
            font-size: 13px;
            color: #cecece;
            font-weight: 300;
        }

    </style>

    <div id="cheat-div">
        <h1>Cheat Pannel</h1><br>
        <h3>For QuipoQuiz</h3><br>
        <h2>${version}</h2><br>
        <button onclick="commandGet();" class="">Run the script<div hidden class="cheat-loader"></div></button><br>
        <p><label>Program response : </label><label class="response">Nothing here</label></p>
        
    </div>
    `;

    document.body.appendChild(newDiv);


    // Script

    function commandGet(){
        if(sed_quiz.number_of_questions!=0){
            c_btn = document.querySelector("#cheat-div button")
            c_loader = document.getElementsByClassName('cheat-loader')[0]
            c_response = document.querySelector("#cheat-div .response")
            c_btn.classList.add("loading")
            c_btn.innerHTML='Processing<div class="cheat-loader"></div>'
            c_loader.removeAttribute("hidden")
            trueBtn = document.querySelector('a[onclick="sed_quiz.answer_question(true);"]')
            falseBtn = document.querySelector('a[onclick="sed_quiz.answer_question(false);"]')
            
            
            quizzId = document.getElementsByName('sednove_uid')[0].attributes[1].value
            questionId = sed_quiz.questions[parseInt(sed_quiz.current_question)-1].uid_variation
            var url = 'https://quipoquiz.com/module/sed/quiz/fr/answer_question.snc?quiz='+quizzId+'&answer=false&question='+questionId;
            
            fetch(url)
                .then(function(response) {
                    if (!response.ok) {throw new Error('La requête a échoué');}
                    return response.json();
                })
                .then(function(data){
                    c_btn.innerHTML='Finished<div hidden class="cheat-loader"></div>'
                    c_loader.setAttribute("hidden", "true")
                
                    if(data.answer["real_answer"]=="1"){
                        c_response.innerHTML="True"
                        trueBtn.setAttribute("style", "background-color:#32DD60;border:none;")
                        falseBtn.setAttribute("style", "background-color:grey;border:none;")
                    }else{
                        c_response.innerHTML="False"
                        falseBtn.setAttribute("style", "background-color:#32DD60;border:none;")
                        trueBtn.setAttribute("style", "background-color:grey;border:none;")
                    }

                    continueBtn = document.getElementsByClassName("btn_continue")[0]

                    continueBtn.addEventListener("click", ()=>{
                        trueBtn = document.querySelector('a[onclick="sed_quiz.answer_question(true);"]')
                        falseBtn = document.querySelector('a[onclick="sed_quiz.answer_question(false);"]')
                        c_btn = document.querySelector("#cheat-div button")
                        c_loader = document.getElementsByClassName('cheat-loader')[0]
                        c_response = document.querySelector("#cheat-div .response")
                        setTimeout(() => {
                            document.querySelector('a[onclick="sed_quiz.answer_question(false);"]').removeAttribute('style')
                            document.querySelector('a[onclick="sed_quiz.answer_question(true);"]').removeAttribute('style')
                        }, 700);
                        c_btn.classList.remove("loading")
                        c_btn.innerHTML='Run the script<div hidden class="cheat-loader"></div>'
                        c_loader.removeAttribute("hidden")
                        c_response.innerHTML="Nothing here"
                    })
                    
                }
                ).catch(function(error) {console.error('Erreur lors de la requête:', error);});
            
            
        }else{
            alert('No quizz started yet.')
        }
        
    }
    console.clear()
    console.log(`Pannel : `+`%cDisplayed`, 'color:lightgreen;');
    console.log(`Status : `+`%cReady`, 'color:lightgreen;');
}catch (error) {
    console.clear()
    console.log(`Status : `+`%cFailed`, 'color:#FF6666;');
    console.log(error);
}