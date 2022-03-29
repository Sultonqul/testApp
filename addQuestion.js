const readline = require('readline')
const fs = require('fs')

const app = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const questions = [
    'Savol matnini kiriting:',
    'A:',
    'B:',
    'C:',
    "to'g'ri variantni kiriting:"
]
const qqq = [
    "Question_text",
    "A",
    "B",
    "C"
]
const answer = {}
const ans = {}

function ques(count){
    let users1 = fs.readFileSync('database/table1.json')
    let users2 = fs.readFileSync('database/table2.json')
    users1 = JSON.parse(users1)
    users2 = JSON.parse(users2)
    app.question(`${questions[count]}`, (data) => {
        if(count == 0){answer[qqq[count]] = data}
        if(count > 0 && count < 4){
            ans[qqq[count]] = data
            answer["Question_v"] = [ans]
        }
        if(count == 4){
            users1.push(answer)
            fs.writeFileSync('database/table1.json',JSON.stringify(users1,null,4))
            let users11 = fs.readFileSync('database/table1.json')
            users11 = JSON.parse(users11)
            // console.log(users11[users11.length-1]["Question_v"][0][data]);
            let user = {
                "number": users2.length+1,
                "answer_text":users11[users11.length-1]["Question_v"][0][data],
                "correct_option": data,
                "your_option": "B",
                "result": false
            }
            users2.push(user)
            fs.writeFileSync('database/table2.json',JSON.stringify(users2,null,4))
            console.log("Malumot qoshildi");
            return app.close()
        }
        return ques(count +=1)
    })
}
ques(0)