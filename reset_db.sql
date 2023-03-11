TRUNCATE TABLE actividad;
TRUNCATE TABLE configuracion;
TRUNCATE TABLE cronjob_log;
TRUNCATE TABLE registro;

INSERT INTO tipo_de_actividad (tipo)
VALUES ('puntual'), ('rutina'), ('nota');