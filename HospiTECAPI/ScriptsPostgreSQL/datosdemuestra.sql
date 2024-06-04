-- Población de la tabla Paciente
INSERT INTO Paciente (cedula, direccion, fechaNacimiento, nombre, apellido1, apellido2) VALUES
('1234567890', 'Calle 1', '1990-01-01', 'Juan', 'Perez', 'Lopez'),
('2234567890', 'Calle 2', '1991-02-02', 'Maria', 'Gonzalez', 'Fernandez'),
('3234567890', 'Calle 3', '1992-03-03', 'Pedro', 'Martinez', 'Garcia'),
('4234567890', 'Calle 4', '1993-04-04', 'Ana', 'Rodriguez', 'Sanchez'),
('5234567890', 'Calle 5', '1994-05-05', 'Luis', 'Hernandez', 'Ramirez'),
('6234567890', 'Calle 6', '1995-06-06', 'Laura', 'Lopez', 'Diaz'),
('7234567890', 'Calle 7', '1996-07-07', 'Carlos', 'Martinez', 'Ruiz');

-- Población de la tabla Patologia
INSERT INTO Patologia (nombrePatologia, descripcion) VALUES
('Patologia 1', 'Descripcion de Patologia 1'),
('Patologia 2', 'Descripcion de Patologia 2'),
('Patologia 3', 'Descripcion de Patologia 3'),
('Patologia 4', 'Descripcion de Patologia 4'),
('Patologia 5', 'Descripcion de Patologia 5'),
('Patologia 6', 'Descripcion de Patologia 6'),
('Patologia 7', 'Descripcion de Patologia 7');

-- Población de la tabla Salon
INSERT INTO Salon (capacidadCamas, nombreSalon, tipoDeSalon, numeroDePiso) VALUES
(10, 'Salon 1', 'Tipo 1', 1),
(20, 'Salon 2', 'Tipo 2', 2),
(30, 'Salon 3', 'Tipo 3', 3),
(40, 'Salon 4', 'Tipo 4', 4),
(50, 'Salon 5', 'Tipo 5', 5),
(60, 'Salon 6', 'Tipo 6', 6),
(70, 'Salon 7', 'Tipo 7', 7);

-- Población de la tabla Tratamiento
INSERT INTO Tratamiento (nombrePatologia, nombreTratamiento, descripcion) VALUES
('Patologia 1', 'Tratamiento 1', 'Descripcion 1'),
('Patologia 3', 'Tratamiento 2', 'Descripcion 2'),
('Patologia 6', 'Tratamiento 3', 'Descripcion 3'),
('Patologia 1', 'Tratamiento 4', 'Descripcion 4'),
('Patologia 2', 'Tratamiento 5', 'Descripcion 5'),
('Patologia 3', 'Tratamiento 6', 'Descripcion 6'),
('Patologia 5', 'Tratamiento 7', 'Descripcion 7');

-- Población de la tabla Procedimientos
INSERT INTO Procedimientos (nombrePatologia, procedNombre,descripcion, duracionDias) VALUES
('Patologia 1', 'Procedimiento 1', 'Descripcion 1',1),
('Patologia 2', 'Procedimiento 2', 'Descripcion 2', 2),
('Patologia 6', 'Procedimiento 3', 'Descripcion 3', 3),
('Patologia 5', 'Procedimiento 4', 'Descripcion 4', 4),
('Patologia 4', 'Procedimiento 5', 'Descripcion 5', 5),
('Patologia 3', 'Procedimiento 6', 'Descripcion 6', 6),
('Patologia 2', 'Procedimiento 7', 'Descripcion 7', 7);

-- Población de la tabla Cama
INSERT INTO Cama (nombreSalon, estadoUCI) VALUES
('Sala A', TRUE),
('Sala A', FALSE),
('Sala A', TRUE),
('Sala B', FALSE),
('Sala B', TRUE),
('Sala B', FALSE),
('Sala B', TRUE);

-- Población de la tabla Personal
INSERT INTO Personal (cedula, fechaNacimiento, direccion, nombre, apellido1, apellido2, fechaIngreso) VALUES
('1000000001', '1980-01-01', 'Calle A', 'Alberto', 'Gomez', 'Ruiz', '2000-01-01'),
('1000000002', '1981-02-02', 'Calle B', 'Beatriz', 'Garcia', 'Fernandez', '2001-02-02'),
('1000000003', '1982-03-03', 'Calle C', 'Carlos', 'Hernandez', 'Martinez', '2002-03-03'),
('1000000004', '1983-04-04', 'Calle D', 'Diana', 'Rodriguez', 'Lopez', '2003-04-04'),
('1000000005', '1984-05-05', 'Calle E', 'Eduardo', 'Perez', 'Sanchez', '2004-05-05'),
('1000000006', '1985-06-06', 'Calle F', 'Fernanda', 'Lopez', 'Gomez', '2005-06-06'),
('1000000007', '1986-07-07', 'Calle G', 'Gerardo', 'Diaz', 'Ruiz', '2006-07-07');

-- Población de la tabla Rol
INSERT INTO Rol (personalCedula, descripcion) VALUES
('1000000001', 'Medico General'),
('1000000002', 'Enfermera'),
('1000000003', 'Cirujano'),
('1000000004', 'Pediatra'),
('1000000005', 'Cardiologo'),
('1000000006', 'Dermatologo'),
('1000000007', 'Neurologo');

-- Población de la tabla Personal_Telefono
INSERT INTO Personal_Telefono (personalCedula, telefono) VALUES
('1000000001', '555-0001'),
('1000000002', '555-0002'),
('1000000003', '555-0003'),
('1000000004', '555-0004'),
('1000000005', '555-0005'),
('1000000006', '555-0006'),
('1000000007', '555-0007');

-- Población de la tabla Paciente_Telefono
INSERT INTO Paciente_Telefono (pacienteCedula, telefono) VALUES
('1234567890', '666-0001'),
('2234567890', '666-0002'),
('3234567890', '666-0003'),
('4234567890', '666-0004'),
('5234567890', '666-0005'),
('6234567890', '666-0006'),
('7234567890', '666-0007');

-- Población de la tabla HorariosCamas
INSERT INTO HorariosCamas (idCama, dialinicio, diaFinal, dni) VALUES
(1, '2024-01-01', '2024-01-02', '1234567890'),
(2, '2024-01-02', '2024-01-03', '2234567890'),
(3, '2024-01-03', '2024-01-04', '3234567890'),
(4, '2024-01-04', '2024-01-05', '4234567890'),
(5, '2024-01-05', '2024-01-06', '5234567890'),
(6, '2024-01-06', '2024-01-07', '6234567890'),
(7, '2024-01-07', '2024-01-08', '7234567890');

-- Población de la tabla Equipo
INSERT INTO Equipo (idCama, proveedor, nombre, cantidad) VALUES
(1, 'Proveedor 1', 'Equipo 1', 1),
(2, 'Proveedor 2', 'Equipo 2', 2),
(3, 'Proveedor 3', 'Equipo 3', 3),
(4, 'Proveedor 4', 'Equipo 4', 4),
(5, 'Proveedor 5', 'Equipo 5', 5),
(6, 'Proveedor 6', 'Equipo 6', 6),
(7, 'Proveedor 7', 'Equipo 7', 7);

-- Población de la tabla Historial
INSERT INTO Historial (idProced, idTratamiento, pacienteCedula, fechaProcedimiento) VALUES
(1, 1, '1234567890', '2024-01-01'),
(2, 2, '2234567890', '2024-01-02'),
(3, 3, '3234567890', '2024-01-03'),
(4, 4, '4234567890', '2024-01-04'),
(5, 5, '5234567890', '2024-01-05'),
(6, 6, '6234567890', '2024-01-06'),
(7, 7, '7234567890', '2024-01-07');

-- Población de la tabla Reserva
INSERT INTO Reserva (pacienteCedula, idCama, idProced, fechaIngreso, fechaSalida) VALUES
('1234567890', 1, 1, '2024-01-01', '2024-01-02'),
('2234567890', 2, 2, '2024-01-02', '2024-01-03'),
('3234567890', 3, 3, '2024-01-03', '2024-01-04'),
('4234567890', 4, 4, '2024-01-04', '2024-01-05'),
('5234567890', 5, 5, '2024-01-05', '2024-01-06'),
('6234567890', 6, 6, '2024-01-06', '2024-01-07'),
('7234567890', 7, 7, '2024-01-07', '2024-01-08');