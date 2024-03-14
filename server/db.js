import mysql from "mysql"
const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'task-world'
})
db.connect(()=>{
console.log('connected to database')
})
export default db