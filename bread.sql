CREATE TABLE bread (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    String VARCHAR(255) NOT NULL,
    Integer INTEGER,
    Float FLOAT,
    Date DATE,
    Boolean BOOLEAN

);

INSERT INTO bread(id,String,Integer,Float,Date,Boolean)
VALUES(1,"rifqi",15,15.15,"2023-05-01","false"),
(2,"gema",19,1.15,"2023-05-02","true"),
(3,"fahmi",88,19.1,"2023-05-03","false"),
(4,"gilang",22,2.12,"2023-05-04","true"),
(5,"yurza",29,2.1,"2023-05-05","false"),
(6,"ian",77,2.44,"2023-05-06","false"),
(7,"yudi",11,1.16,"2023-05-07","true"),
(8,"ali",12,1.22,"2023-05-22","false"),
(9,"abi",13,1.77,"2023-05-23","true"),
(10,"andi",15,1.7,"2023-05-25","true");