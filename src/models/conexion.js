import mysql2 from 'mysql2';
class connDb {
    constructor() {
    }
    con = this.conectar();
    conectar() {
        mysql2.createConnection({
            host: 'mysql-raffarraffa.alwaysdata.net',
            user: '321087_rafa',
            database: 'raffarraffa_web2',
            password: 'Web_2_20230'
        });
    }
    conectar2() {
        this.conn =
            mysql2.createConnection({
                host: 'mysql-raffarraffa.alwaysdata.net',
                user: '321087_rafa',
                database: 'raffarraffa_web2',
                password: 'Web_2_20230'
            });
    }
    conect =
        mysql2.createConnection({
            host: 'mysql-raffarraffa.alwaysdata.net',
            user: '321087_rafa',
            database: 'raffarraffa_web2',
            password: 'Web_2_20230'
        });
}
export default connDb;