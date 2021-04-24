import colors from 'colors'
import pool from './config/db.js'
import bycrpt from 'bcryptjs'

const TABLE_NAME = 'users';
let pass = bycrpt.hashSync('123456', 10)

const insertData = async () => {
    try {
        //* this command only call insert data once
        let sql = `
    
        with data (name, email, password)  as (
            values
            ('Budi', '131fa@gmail.com' , '${pass}' ),
            ('Carlie', '1asdasf13@gmail.com' , '${pass}'),
            ('Delta', '1asfasf13@gmail.com' , '${pass}' )
         ) 
              insert into  ${TABLE_NAME} (name, email, password) 
              select d.name,  d.email, d.password
              from data d
                   WHERE NOT EXISTS (
                  SELECT 1 FROM ${TABLE_NAME} u2 WHERE u2.name= d.name
                 )      

        `;
       await pool.query(sql)
       console.log('data success import'.green.bold)
       process.exit()

    } catch (err) {
        console.error(err)
    }
};


const deleteData = async () => {
    try {
        //* this command only call insert data once
        let sql = `
    
       DELETE FROM ${TABLE_NAME}
       WHERE name IN ('Agung', 'Budi', 'Carlie', 'Delta')

        `;
       await pool.query(sql)
       console.log('data success DELETE'.green.bold)
       process.exit()

    } catch (err) {
        console.error(err)
    }
};




if (process.argv[2] === 'insert') {
    //* call in command line "node seeder.js insert" to create table
    insertData();
  } else if (process.argv[2] === 'delete') {
        //* call in command line "node seeder.js delete" to create table
    deleteData();
      } 
  