--Stores procedures Hospitec

--sp de personal join de 3 tablas
CREATE OR REPLACE FUNCTION get_personal_and_role(cedula_personal VARCHAR)
RETURNS TABLE (
    cedula VARCHAR,
    fechaNacimiento DATE,
    direccion VARCHAR,
    nombre VARCHAR,
    apellido1 VARCHAR,
    apellido2 VARCHAR,
    fechaIngreso DATE,
    rolDescripcion VARCHAR,
    telefono VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.cedula,
        p.fechaNacimiento,
        p.direccion,
        p.nombre,
        p.apellido1,
        p.apellido2,
        p.fechaIngreso,
        r.descripcion AS rolDescripcion,
        pt.telefono
    FROM 
        Personal p
    JOIN 
        Rol r ON p.cedula = r.personalCedula
    LEFT JOIN 
        Personal_Telefono pt ON p.cedula = pt.personalCedula
    WHERE 
        p.cedula = cedula_personal;
END;
$$ LANGUAGE plpgsql;

-- Llamar al procedimiento almacenado get personal and role
SELECT * FROM get_personal_and_role('test');


--sp de historial
CREATE OR REPLACE FUNCTION get_historial_by_paciente_cedula(paciente_cedula VARCHAR)
RETURNS TABLE (
    idHistorial INT,
    nombrePatologia VARCHAR,
    procedNombre VARCHAR,
    nombreTratamiento VARCHAR,
    fechaProcedimiento DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        h.idHistorial,
        p.nombrePatologia,
        p.procedNombre,
        t.nombreTratamiento,
        h.fechaProcedimiento
    FROM 
        Historial h
    JOIN 
        Procedimientos p ON h.idProced = p.idProced
    JOIN 
        Tratamiento t ON h.idTratamiento = t.idTratamiento
    WHERE 
        h.pacienteCedula = paciente_cedula;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM get_historial_by_paciente_cedula('305370401');


--store procedure de historial POST
CREATE OR REPLACE PROCEDURE insert_historial(
    nombre_procedimiento TEXT,
    nombre_tratamiento TEXT,
    paciente_cedula TEXT,
    fecha_procedimiento TIMESTAMP WITHOUT TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO historial (idproced, idtratamiento, pacientecedula, fechaprocedimiento)
    VALUES (
        (SELECT idproced FROM procedimientos WHERE procednombre = nombre_procedimiento),
        (SELECT idtratamiento FROM tratamiento WHERE nombretratamiento = nombre_tratamiento),
        paciente_cedula,
        fecha_procedimiento
    );
END;
$$;

CALL insert_historial('Procedimiento 1', 'Tratamiento A', '305370403', '2024-05-22');
select * from historial;



--store procedure para PUT historal por id
CREATE OR REPLACE PROCEDURE update_historial(
    historial_id INT,
    nombre_procedimiento TEXT,
    nombre_tratamiento TEXT,
    fecha_procedimiento TIMESTAMP WITHOUT TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE historial
    SET 
        idproced = (SELECT idproced FROM procedimientos WHERE procednombre = nombre_procedimiento),
        idtratamiento = (SELECT idtratamiento FROM tratamiento WHERE nombretratamiento = nombre_tratamiento),
        fechaprocedimiento = COALESCE(fecha_procedimiento, fechaprocedimiento)
    WHERE idhistorial = historial_id;
END;
$$;

CALL update_historial(1, 'Nuevo Procedimiento', 'Nuevo Tratamiento', '2024-06-01');
--tienen que ser procedimientos y tratamientos que ya existen en la base de datos


--sp para las camas y los equipos relacioandos
CREATE OR REPLACE FUNCTION get_cama_y_equipos()
RETURNS TABLE(
    idCama INT,
    nombreSalon VARCHAR,
    estadoUCI BOOLEAN,
    idEquipo INT,
    nombre VARCHAR,
    cantidad INT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.idCama,
        c.nombreSalon,
        c.estadoUCI,
        e.idEquipo,
        e.nombre,
        e.cantidad
    FROM Cama c
    LEFT JOIN Equipo e ON c.idCama = e.idCama;
END;
$$;



SELECT * FROM get_cama_y_equipos();


--sp de post personal ignorar el nombre de paciente, error confusion
CREATE OR REPLACE PROCEDURE insertar_paciente(
    cedula_personal VARCHAR(20),
    nombre_personal VARCHAR(50),
    apellido1_personal VARCHAR(50),
    apellido2_personal VARCHAR(50),
    fechanacimiento_personal TIMESTAMP WITHOUT TIME ZONE,
    direccion_personal VARCHAR(255),
    fechaingreso_personal TIMESTAMP WITHOUT TIME ZONE,
    telefono1 VARCHAR(20),
    telefono2 VARCHAR(20),
    rol_descripcion VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
DECLARE
    personal_id varchar(20);
BEGIN
    INSERT INTO Personal(cedula, nombre, apellido1, apellido2, fechanacimiento, direccion, fechaingreso)
    VALUES(cedula_personal, nombre_personal, apellido1_personal, apellido2_personal, fechanacimiento_personal, direccion_personal, fechaingreso_personal)
    RETURNING cedula INTO personal_id;

    INSERT INTO Rol(personalCedula, descripcion)
    VALUES(cedula_personal, rol_descripcion);

    INSERT INTO Personal_Telefono(personalCedula, telefono)
    VALUES(cedula_personal, telefono1);

    IF telefono2 IS NOT NULL THEN
        INSERT INTO Personal_Telefono(personalCedula, telefono)
        VALUES(cedula_personal, telefono2);
    END IF;

    COMMIT;
END;
$$;
CALL insertar_paciente('123456789', 'Nombre', 'Apellido1', 'Apellido2', '1990-01-01', 'Dirección', '2024-01-01', '555-1234', '555-5678', 'Doctor');


--sp para el PUT de personal ignorar el nombre de paciente, error, confusion
CREATE OR REPLACE FUNCTION actualizar_paciente(
    cedula_personal VARCHAR,
    nombre_personal VARCHAR,
    apellido1_personal VARCHAR,
    apellido2_personal VARCHAR,
    fecha_nacimiento DATE,
    direccion_personal VARCHAR,
    fecha_ingreso DATE,
    telefono1 VARCHAR,
    telefono2 VARCHAR,
    rol_descripcion VARCHAR
)
RETURNS VOID AS $$
BEGIN
    -- Actualizar la tabla Personal
    UPDATE Personal
    SET 
        nombre = COALESCE(nombre_personal, nombre),
        apellido1 = COALESCE(apellido1_personal, apellido1),
        apellido2 = COALESCE(apellido2_personal, apellido2),
        fechaNacimiento = COALESCE(fecha_nacimiento, fechaNacimiento),
        direccion = COALESCE(direccion_personal, direccion),
        fechaIngreso = COALESCE(fecha_ingreso, fechaIngreso)
    WHERE cedula = cedula_personal;

    -- Actualizar la tabla Personal_Telefono para telefono1
    IF telefono1 IS NOT NULL THEN
        UPDATE Personal_Telefono
        SET telefono = telefono1
        WHERE personalCedula = cedula_personal
        AND telefono != telefono1; -- Evitar actualizaciones innecesarias
    END IF;

    -- Actualizar la tabla Personal_Telefono para telefono2
    IF telefono2 IS NOT NULL THEN
        UPDATE Personal_Telefono
        SET telefono = telefono2
        WHERE personalCedula = cedula_personal
        AND telefono != telefono2; -- Evitar actualizaciones innecesarias
    END IF;

    -- Actualizar la tabla Rol
	IF rol_descripcion IS NOT NULL THEN
	    UPDATE Rol
	    SET descripcion = rol_descripcion
	    WHERE personalCedula = cedula_personal;
END IF;

END;
$$ LANGUAGE plpgsql;

CALL actualizar_paciente('123456789', 'Nuevo Nombre', 'Nuevo Apellido1', 'Nuevo Apellido2', '1990-01-01', 'Nueva Dirección', '2024-01-01', '555-1234', '555-5678', 'Jefe');


--dropear el procedue anterior
--DROP FUNCTION IF EXISTS actualizar_paciente( cedula_personal VARCHAR, nombre_personal VARCHAR,apellido1_personal VARCHAR, apellido2_personal VARCHAR,fecha_nacimiento DATE, direccion_personal VARCHAR,
--    fecha_ingreso DATE,
--    telefono1 VARCHAR,
 --   telefono2 VARCHAR,
  --  rol_descripcion VARCHAR
--);




--sp de paciente informacion por cedula
CREATE OR REPLACE FUNCTION obtener_informacion_paciente(cedula_paciente VARCHAR)
RETURNS TABLE (
    cedula VARCHAR(20),
    direccion VARCHAR(255),
    fechaNacimiento DATE,
    nombre VARCHAR(50),
    apellido1 VARCHAR(50),
    apellido2 VARCHAR(50),
    telefonos VARCHAR [],
    patologias_patentes VARCHAR [],
    descripciones VARCHAR[]
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.cedula,
        p.direccion,
        p.fechaNacimiento,
        p.nombre,
        p.apellido1,
        p.apellido2,
        array_agg(DISTINCT t.telefono) AS telefonos,
        array_agg(DISTINCT pp.nombrePatologia) AS patologias_patentes,
        array_agg(DISTINCT pp.descripcionTratamiento) AS descripciones
    FROM 
        Paciente p
    LEFT JOIN 
        patologiaspresentes pp ON p.cedula = pp.pacienteCedula
    LEFT JOIN 
        Paciente_Telefono t ON p.cedula = t.pacienteCedula
    WHERE 
        p.cedula = cedula_paciente
    GROUP BY
        p.cedula, p.direccion, p.fechaNacimiento, p.nombre, p.apellido1, p.apellido2;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM obtener_informacion_paciente('305370401');

DROP FUNCTION obtener_informacion_paciente(character varying)

CREATE OR REPLACE FUNCTION camas_disponibles(fecha TIMESTAMP WITHOUT TIME ZONE)
RETURNS TABLE(idCama INT, nombreSalon VARCHAR, estadoUCI BOOLEAN) AS $$
BEGIN
    RETURN QUERY
    SELECT c.idCama, c.nombreSalon, c.estadoUCI
    FROM Cama c
    WHERE NOT EXISTS (
        SELECT 1
        FROM Reserva r
        WHERE r.idCama = c.idCama
        AND (
            (r.fechaIngreso <= fecha AND r.fechaSalida >= fecha)
            OR (r.fechaIngreso <= fecha + INTERVAL '3 days' AND r.fechaSalida >= fecha)
        )
    );
END;
$$ LANGUAGE plpgsql;


	
SELECT * FROM camas_disponibles('2024-06-10');



DROP FUNCTION IF EXISTS camas_disponibles(TIMESTAMP WITHOUT TIME ZONE);
DROP FUNCTION IF EXISTS camas_disponibles(DATE);





--dropear el procedure
--DROP PROCEDURE insertar_paciente(character varying,character varying,character varying,character varying,timestamp without time zone,character varying,timestamp without time zone,character varying,character varying,character varying);

--triggers


-- Crear función trigger para aumentar la capacidad de camas
CREATE OR REPLACE FUNCTION aumentar_capacidad_camas()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Salon
    SET capacidadCamas = capacidadCamas + 1
    WHERE nombreSalon = NEW.nombreSalon;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger
CREATE TRIGGER trigger_aumentar_capacidad_camas
AFTER INSERT ON Cama
FOR EACH ROW EXECUTE FUNCTION aumentar_capacidad_camas();

-- prueba del trigger para aumentar la capacidad de camas
INSERT INTO Salon (nombreSalon, capacidadCamas, tipoDeSalon, numeroDePiso)
VALUES ('Salon A', 0, 'General', 1);

INSERT INTO Cama (nombreSalon, estadoUCI)
VALUES ('Salon A', FALSE);

INSERT INTO Cama (nombreSalon, estadoUCI)
VALUES ('Salon A', FALSE);

SELECT * FROM Salon WHERE nombreSalon = 'Salon A';


-- función para el trigger para validar la fecha de ingreso
CREATE OR REPLACE FUNCTION validar_fecha_ingreso()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.fechaIngreso > NEW.fechaSalida THEN
        RAISE EXCEPTION 'La fecha de ingreso no puede ser posterior a la fecha de salida.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger para validar la fecha de ingreso
CREATE TRIGGER trigger_validar_fecha_ingreso
BEFORE INSERT OR UPDATE ON Reserva
FOR EACH ROW EXECUTE FUNCTION validar_fecha_ingreso();


-- función para el trigger para asegurar integridad referencial en Personal_Telefono
CREATE OR REPLACE FUNCTION validar_telefono_unico_paciente()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Paciente_Telefono WHERE telefono = NEW.telefono) THEN
        RAISE EXCEPTION 'El número de teléfono ya está registrado en Paciente_Telefono.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- función para el trigger para asegurar integridad referencial en Paciente_Telefono
CREATE OR REPLACE FUNCTION validar_telefono_unico_personal()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Personal_Telefono WHERE telefono = NEW.telefono) THEN
        RAISE EXCEPTION 'El número de teléfono ya está registrado en Personal_Telefono.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



-- trigger para Personal_Telefono
CREATE TRIGGER trigger_validar_telefono_unico_paciente
BEFORE INSERT OR UPDATE ON Paciente_Telefono
FOR EACH ROW EXECUTE FUNCTION validar_telefono_unico_paciente();

-- trigger para Paciente_Telefono
CREATE TRIGGER trigger_validar_telefono_unico_personal
BEFORE INSERT OR UPDATE ON Personal_Telefono
FOR EACH ROW EXECUTE FUNCTION validar_telefono_unico_personal();

--Pruebas para los triggers de fechas y telefonos

INSERT INTO Reserva (pacienteCedula, idCama, idProced, fechaIngreso, fechaSalida)
VALUES ('305370404', 65, 13, '2024-06-01', '2024-06-05');

INSERT INTO Reserva (pacienteCedula, idCama, idProced, fechaIngreso, fechaSalida)
VALUES ('305370404', 65, 13, '2024-06-10', '2024-06-05');


-- Insertar un teléfono para un personal
INSERT INTO Personal_Telefono (personalCedula, telefono)
VALUES ('test', '555-1234');

-- Insertar otro teléfono diferente para el mismo personal
INSERT INTO Personal_Telefono (personalCedula, telefono)
VALUES ('test', '555-5678');

-- Insertar un teléfono para un paciente
INSERT INTO Paciente_Telefono (pacienteCedula, telefono)
VALUES ('305370404', '555-8765');

-- Insertar otro teléfono diferente para el mismo paciente
INSERT INTO Paciente_Telefono (pacienteCedula, telefono)
VALUES ('305370404', '555-4321');


-- Intentar insertar un teléfono duplicado en Personal_Telefono
INSERT INTO Personal_Telefono (personalCedula, telefono)
VALUES ('test', '555-1234');

-- Intentar insertar un teléfono duplicado en Paciente_Telefono
INSERT INTO Paciente_Telefono (pacienteCedula, telefono)
VALUES ('987654321', '555-8765');




