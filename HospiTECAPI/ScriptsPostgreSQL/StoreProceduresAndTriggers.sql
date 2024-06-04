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


--sp para las camas y los equipos relacioandos

CREATE OR REPLACE FUNCTION get_cama_y_equipos(id_cama INT)
RETURNS TABLE(
    idCama INT,
    nombreSalon VARCHAR,
    estadoUCI BOOLEAN,
    idEquipo INT,
    proveedor VARCHAR,
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
        e.proveedor,
        e.nombre,
        e.cantidad
    FROM Cama c
    LEFT JOIN Equipo e ON c.idCama = e.idCama
    WHERE c.idCama = id_cama;
END;
$$;


SELECT * FROM get_cama_y_equipos(15);


--sp de post personal
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




--dropear el procedure
--DROP PROCEDURE insertar_paciente(character varying,character varying,character varying,character varying,timestamp without time zone,character varying,timestamp without time zone,character varying,character varying,character varying);






--triggers


