CREATE TABLE data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataString VARCHAR(255) NOT NULL,
    dataInteger INTEGER,
    dataFloat FLOAT,
    tanggal DATE,
    dataBoolean BOOLEAN
);

INSERT INTO data(id,dataString,dataInteger,dataFloat,tanggal,dataBoolean)
VALUES(1,"rifqi",15,15.15,"2003-05-01","false"),
(2,"yudi",11,1.15,"2000-01-05","true");