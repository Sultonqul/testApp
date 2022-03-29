const readline = require('readline')
const fs = require('fs')
const {table} = require('table')

const app = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

function ques(count){
    let users2 = fs.readFileSync('database/table2.json')
    let users1 = fs.readFileSync('database/table1.json')
    users2 = JSON.parse(users2) || []
    users1 = JSON.parse(users1) || []

    app.question(`\n>${users2[count].number}. ${users1[count].Question_text}
    A:${users1[count].Question_v[0].A}
    B:${users1[count].Question_v[0].B}
    C:${users1[count].Question_v[0].C}
    Enter your answer: `, 
    (data) => {
        users2[count].your_option = data
        if(users2[count].correct_option == users2[count].your_option){users2[count].result = true}
        if(users2[count].correct_option != users2[count].your_option){users2[count].result = false}

        fs.writeFileSync('database/table2.json',JSON.stringify(users2,null,4))
        if(count == users2.length-1){
            let a = users2.map(el => {
                return[el.number,el.answer_text,el.correct_option,el.your_option,el.result ? '✅':'❌' ]
            })
            console.log(table(a));

            let data = [{
                "total questions":"total questions",
                "total correct answers":"total correct answers",
                "total wrong answers" :"total wrong answers"
            },{
                "total questions":users1.length,
                "total correct answers":users2.filter(el => el.result == true).length,
                "total wrong answers" :users2.filter(el => el.result == false).length
            }
            ]
            let b = data.map(el => {
                return[el["total questions"],el["total correct answers"],el["total wrong answers"]]
            })
            console.log(table(b));
            return app.close()
        }
        if((data != 'A' && data != 'B' && data != 'C')){
            count--
        }
        return ques(count +=1)
    })
}
ques(0)