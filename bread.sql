CREATE TABLE bread (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    String VARCHAR(255) NOT NULL,
    Integer INTEGER,
    Float FLOAT,
    Date DATE,
    Boolean BOOLEAN

);

INSERT INTO bread(id,String,Integer,Float,Date,Boolean)
VALUES(1,"rifqi",15,15.15,"2003-05-01","false"),
(2,"gema",19,1.15,"1999-11-12","true"),
(3,"fahmi",88,19.1,"1995-02-11","false"),
(4,"gilang",22,2.12,"1997-12-11","true"),
(5,"yurza",29,2.1,"2000-11-19","false"),
(6,"ian",77,2.44,"2004-03-11","false"),
(7,"yudi",11,1.15,"1995-01-05","true");