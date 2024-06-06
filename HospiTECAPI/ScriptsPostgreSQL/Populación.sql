-- patologías
INSERT INTO Patologia (nombrePatologia, descripcion) VALUES
('Hipertensión', 'Presión arterial alta crónica.'),
('Diabetes', 'Enfermedad que afecta la regulación de glucosa.'),
('Asma', 'Enfermedad respiratoria que causa dificultad para respirar.'),
('Insuficiencia renal', 'Disminución de la función de los riñones.'),
('Artritis', 'Inflamación de las articulaciones.');

-- Patologias
INSERT INTO Patologia (nombrePatologia, descripcion) 
VALUES
('Apendicitis', 'Inflamación del apéndice.'),
('Cáncer de mama', 'Crecimiento anormal de células en el tejido mamario.'),
('Cataratas', 'Opacidad en la lente del ojo que afecta la visión.'),
('Embarazo', 'Estado en el cual una mujer lleva un embrión o feto en su útero.'),
('Problemas uterinos', 'Trastornos que afectan al útero.'),
('Dolor de espalda baja', 'Dolor o malestar en la parte inferior de la espalda.'),
('Amígdalas inflamadas', 'Inflamación de las amígdalas, generalmente debido a una infección.');

-- Patologias
INSERT INTO Patologia (nombrePatologia, descripcion) 
VALUES
('Apendicitis', 'Inflamación del apéndice.'),
('Cáncer de mama', 'Crecimiento anormal de células en el tejido mamario.'),
('Cataratas', 'Opacidad en la lente del ojo que afecta la visión.'),
('Embarazo', 'Estado en el cual una mujer lleva un embrión o feto en su útero.'),
('Problemas uterinos', 'Trastornos que afectan al útero.'),
('Dolor de espalda baja', 'Dolor o malestar en la parte inferior de la espalda.'),
('Amígdalas inflamadas', 'Inflamación de las amígdalas, generalmente debido a una infección.');


--  salones
INSERT INTO Salon (capacidadCamas, nombreSalon, tipoDeSalon, numeroDePiso) VALUES
(10, 'Sala A', 'Mujeres', 1),
(8, 'Sala B', 'Hombres', 1),
(12, 'Sala C', 'Pediatría', 2),
(6, 'Sala D', 'Urgencias', 2),
(15, 'Sala E', 'UCI', 3);

-- tratamientos
INSERT INTO Tratamiento (nombrePatologia, nombreTratamiento, descripcion) VALUES
('Hipertensión', 'Tratamiento A', 'Tratamiento para hipertensión.'),
('Diabetes', 'Tratamiento B', 'Tratamiento para diabetes.'),
('Asma', 'Tratamiento C', 'Tratamiento para asma.'),
('Insuficiencia renal', 'Tratamiento D', 'Tratamiento para insuficiencia renal.'),
('Artritis', 'Tratamiento E', 'Tratamiento para artritis.');

--  procedimientos
INSERT INTO Procedimientos (nombrePatologia, procedNombre, descripcion, duracionDias) VALUES
('Hipertensión', 'Procedimiento 1', 'Procedimiento para hipertensión.', 5),
('Diabetes', 'Procedimiento 2', 'Procedimiento para diabetes.', 3),
('Asma', 'Procedimiento 3', 'Procedimiento para asma.', 4),
('Insuficiencia renal', 'Procedimiento 4', 'Procedimiento para insuficiencia renal.', 6),
('Artritis', 'Procedimiento 5', 'Procedimiento para artritis.', 1);

INSERT INTO Procedimientos (nombrePatologia, procedNombre, descripcion, duracionDias) 
VALUES
('Apendicitis', 'Apendicectomía', 'Procedimiento para tratar la apendicitis.', 2),
('Cáncer de mama', 'Biopsia de mama', 'Procedimiento para obtener muestras de tejido mamario para su análisis.', 1),
('Cataratas', 'Cirugía de cataratas', 'Procedimiento para remover cataratas en el ojo.', 1),
('Embarazo', 'Cesárea', 'Procedimiento quirúrgico para el parto.', 3),
('Problemas uterinos', 'Histerectomía', 'Procedimiento para extirpar el útero.', 4),
('Dolor de espalda baja', 'Cirugía para la lumbalgia', 'Procedimiento para tratar el dolor de espalda baja.', 1),
('Cáncer de mama', 'Mastectomía', 'Procedimiento quirúrgico para extirpar una o ambas mamas.', 5),
('Amígdalas inflamadas', 'Amigdalectomía', 'Procedimiento para extirpar las amígdalas.', 2);

-- Población de la tabla Cama
INSERT INTO Cama (nombreSalon, estadoUCI) VALUES
('Sala A', TRUE),
('Sala A', TRUE),
('Sala A', TRUE),
('Sala A', TRUE),
('Sala B', FALSE),
('Sala B', TRUE),
('Sala C', FALSE),
('Sala C', TRUE),
('Sala D', FALSE),
('Sala D', TRUE),
('Sala D', FALSE),
('Sala D', FALSE);

-- personal
INSERT INTO Personal (cedula, fechaNacimiento, direccion, nombre, apellido1, apellido2, fechaIngreso) VALUES
('11223344', '1975-03-03', 'Calle Larga 789', 'Carlos', 'Lopez', 'Gonzalez', '2020-01-15'),
('44332211', '1985-04-04', 'Avenida Corta 321', 'Ana', 'Martinez', 'Lopez', '2019-05-20'),
('55667799', '1980-06-06', 'Calle Central 303', 'Jose', 'Rodriguez', 'Martinez', '2018-07-25'),
('66778899', '1990-07-07', 'Avenida Secundaria 404', 'Laura', 'Fernandez', 'Garcia', '2021-08-30'),
('77889900', '1982-08-08', 'Calle Tercera 505', 'Miguel', 'Garcia', 'Perez', '2017-09-10');

-- Población de la tabla Rol
INSERT INTO Rol (personalCedula, descripcion) VALUES
('11223344', 'Medico General'),
('44332211', 'Enfermera'),
('55667799', 'Cirujano'),
('66778899', 'Pediatra'),
('77889900', 'Cardiologo');

-- teléfonos de personal
INSERT INTO Personal_Telefono (personalCedula, telefono) VALUES
('11223344', '555-8765'),
('44332211', '555-4321'),
('55667799', '555-2233'),
('66778899', '555-4455'),
('77889900', '555-6677');



-- Insertar equipos
INSERT INTO Equipo (idCama, proveedor, nombre, cantidad) VALUES
(1, 'Proveedor A', 'Monitor', 5),
(2, 'Proveedor B', 'Respirador', 2),
(3, 'Proveedor C', 'Monitor', 4),
(4, 'Proveedor D', 'Respirador', 3),
(5, 'Proveedor F', 'luces quirúrgicas', 1),
(6, 'Proveedor G', 'ultrasonidos', 1),
(7, 'Proveedor H', 'esterilizadores', 1),
(8, 'Proveedor U', 'desfibriladores', 1),
(9, 'Proveedor A', 'Monitor', 1),
(10, 'Proveedor A', ' electrocardiógrafos', 1);








