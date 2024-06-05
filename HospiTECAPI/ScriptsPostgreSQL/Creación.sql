-- Creación de tablas
CREATE TABLE Paciente (
    cedula VARCHAR(20) PRIMARY KEY,
    direccion VARCHAR(255),
    fechaNacimiento DATE,
    nombre VARCHAR(50),
    apellido1 VARCHAR(50),
    apellido2 VARCHAR(50)
);

CREATE TABLE Historial (
    idHistorial SERIAL PRIMARY KEY,
    idProced INT,
    idTratamiento INT,
    pacienteCedula VARCHAR(20),
    fechaProcedimiento DATE
);

CREATE TABLE Reserva (
    idReservacion SERIAL PRIMARY KEY,
    pacienteCedula VARCHAR(20),
    idCama INT,
    idProced INT,
    fechaIngreso DATE,
    fechaSalida DATE
);

CREATE TABLE Procedimientos (
    idProced SERIAL PRIMARY KEY,
    nombrePatologia VARCHAR(100),
    procedNombre VARCHAR(100),
	descripcion VARCHAR(100),
    duracionDias INT
);

CREATE TABLE Cama (
    idCama SERIAL PRIMARY KEY,
    nombreSalon varchar(100),
    estadoUCI BOOLEAN
);

CREATE TABLE HorariosCamas (
    idHorario SERIAL PRIMARY KEY,
    idCama INT,
    dialinicio DATE,
    diaFinal DATE,
    dni VARCHAR(20)
);

CREATE TABLE Salon (
    nombreSalon varchar(100)  PRIMARY KEY,
    capacidadCamas INT,
    tipoDeSalon VARCHAR(50),
    numeroDePiso INT
);

CREATE TABLE Equipo (
    idEquipo SERIAL PRIMARY KEY,
    idCama INT,
    proveedor VARCHAR(100),
    nombre VARCHAR(100),
    cantidad INT
);

CREATE TABLE Patologia (
    nombrePatologia VARCHAR(100) PRIMARY KEY,
    descripcion VARCHAR(255)
);

CREATE TABLE Tratamiento (
    idTratamiento SERIAL PRIMARY KEY,
    nombrePatologia VARCHAR(100),
    nombreTratamiento VARCHAR(100),
    descripcion VARCHAR(255)
);

CREATE TABLE Personal (
    cedula VARCHAR(20) PRIMARY KEY,
    fechaNacimiento DATE,
    direccion VARCHAR(255),
    nombre VARCHAR(50),
    apellido1 VARCHAR(50),
    apellido2 VARCHAR(50),
    fechaIngreso DATE
);

CREATE TABLE Rol (
    idRol SERIAL PRIMARY KEY,
    personalCedula VARCHAR(20),
    descripcion VARCHAR(255)
);

-- Creación de tablas de relación
CREATE TABLE Personal_Telefono (
    item SERIAL PRIMARY KEY,
    personalCedula VARCHAR(20),
    telefono VARCHAR(20)
);

CREATE TABLE Paciente_Telefono (
    item SERIAL PRIMARY KEY,
    pacienteCedula VARCHAR(20),
    telefono VARCHAR(20)
);

CREATE TABLE patologiaspresentes (
    idPatPresente SERIAL PRIMARY KEY,
    pacienteCedula VARCHAR(20),
	nombrePatologia VARCHAR(100),
    descripcionTratamiento VARCHAR(200)
);

-- Alter table para claves foráneas

ALTER TABLE patologiaspresentes
ADD CONSTRAINT fk_patologiapresentes_paciente FOREIGN KEY (pacienteCedula) REFERENCES Paciente (cedula),
ADD CONSTRAINT fk_patologiapresentes_patologia FOREIGN KEY (nombrePatologia) REFERENCES Patologia (nombrePatologia);

ALTER TABLE Historial
ADD CONSTRAINT fk_historial_proced FOREIGN KEY (idProced) REFERENCES Procedimientos (idProced),
ADD CONSTRAINT fk_historial_tratamiento FOREIGN KEY (idTratamiento) REFERENCES Tratamiento (idTratamiento),
ADD CONSTRAINT fk_historial_paciente FOREIGN KEY (pacienteCedula) REFERENCES Paciente (cedula);

ALTER TABLE Reserva
ADD CONSTRAINT fk_reserva_paciente FOREIGN KEY (pacienteCedula) REFERENCES Paciente (cedula),
ADD CONSTRAINT fk_reserva_cama FOREIGN KEY (idCama) REFERENCES Cama (idCama),
ADD CONSTRAINT fk_reserva_procedimiento FOREIGN KEY (idProced) REFERENCES Procedimientos (idProced);

ALTER TABLE Procedimientos
ADD CONSTRAINT fk_procedimientos_patologia FOREIGN KEY (nombrePatologia) REFERENCES Patologia (nombrePatologia);

ALTER TABLE Cama
ADD CONSTRAINT fk_cama_salon FOREIGN KEY (nombreSalon) REFERENCES Salon (nombreSalon);

ALTER TABLE HorariosCamas
ADD CONSTRAINT fk_horarioscamas_cama FOREIGN KEY (idCama) REFERENCES Cama (idCama);

ALTER TABLE Equipo
ADD CONSTRAINT fk_equipo_cama FOREIGN KEY (idCama) REFERENCES Cama (idCama);

ALTER TABLE Tratamiento
ADD CONSTRAINT fk_tratamiento_patologia FOREIGN KEY (nombrePatologia) REFERENCES Patologia (nombrePatologia);


ALTER TABLE Rol
ADD CONSTRAINT fk_rol_personal FOREIGN KEY (personalCedula) REFERENCES Personal (cedula);

ALTER TABLE Personal_Telefono
ADD CONSTRAINT fk_personal_telefono_personal FOREIGN KEY (personalCedula) REFERENCES Personal (cedula);

ALTER TABLE Paciente_Telefono
ADD CONSTRAINT fk_paciente_telefono_paciente FOREIGN KEY (pacienteCedula) REFERENCES Paciente (cedula);

