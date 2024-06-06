import { Component } from '@angular/core';
import { CommonModule, DatePipe, NgForOf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComunicationService } from "../../Servicios/comunication.service";
import { forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface Personal {
  cedula: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  fechaNacimiento: Date | null;
  direccion: string;
  fechaIngreso: Date | null;
  telefono?: string[];
  rolDescripcion?: string; // Nuevo campo para la descripción del rol
}

export interface PersonalTelefono {
  item: number;
  personalCedula: string;
  telefono: string;
}

export interface Rol {
  idRol: number;
  personalCedula: string;
  descripcion: string;
}

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    CommonModule, // Asegúrate de importar CommonModule
    NgForOf,
    ReactiveFormsModule,
    DatePipe,
    FormsModule
  ],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent {
  constructor(private servicio: ComunicationService) {
    this.obtenerPersonal();
  }

  dataSource: Personal[] = [];
  originalDataSource: Personal[] = [];
  cedula = '';
  modalVisible = false;
  tipoModal = 2;
  isReadonly = true;

  // Variables para el formulario
  nombre = '';
  apellido1 = '';
  apellido2 = '';
  fechaNacimiento: Date | null = null;
  direccion = '';
  fechaIngreso: Date | null = null;
  telefonos: string[] = [''];
  rolDescripcion = '';
  rolId: number | null = null; // ID del rol para la modificación
  telefonoItems: number[] = []; // Items de los teléfonos para la modificación

  modificarPersonal(index: number, tipoModal: number) {
    this.tipoModal = tipoModal;
    this.isReadonly = true;
    const personalSeleccionado = this.dataSource[index];
    this.cedula = personalSeleccionado.cedula;
    this.nombre = personalSeleccionado.nombre;
    this.apellido1 = personalSeleccionado.apellido1;
    this.apellido2 = personalSeleccionado.apellido2;
    this.fechaNacimiento = personalSeleccionado.fechaNacimiento;
    this.direccion = personalSeleccionado.direccion;
    this.fechaIngreso = personalSeleccionado.fechaIngreso;
    this.telefonos = personalSeleccionado.telefono || [''];
    this.rolDescripcion = personalSeleccionado.rolDescripcion || '';
    this.modalVisible = true;

    // Obtener IDs necesarios para las modificaciones

    this.servicio.getAllRoles().subscribe(roles => {
      const rol = roles.find((r: { personalCedula: string; }) => r.personalCedula === personalSeleccionado.cedula);
      this.rolId = rol ? rol.idRol : null;
    });

    this.servicio.getAllPersonalTelefonos().subscribe(telefonos => {
      const telefonosDelPersonal = telefonos.filter((t: { personalCedula: string; }) => t.personalCedula === personalSeleccionado.cedula);
      this.telefonoItems = telefonosDelPersonal.map((t: { item: any; }) => t.item);
    });


    console.log('modificarPersonal:', personalSeleccionado);
  }

  eliminarPersonal(index: number) {
    const personalSeleccionado = this.dataSource[index];

    // Obtener IDs necesarios para la eliminación
    this.servicio.getAllRoles().subscribe(roles => {
      const rol = roles.find((r: { personalCedula: string; }) => r.personalCedula === personalSeleccionado.cedula);
      const rolId = rol ? rol.idRol : null;

      this.servicio.getAllPersonalTelefonos().subscribe(telefonos => {
        const telefonosDelPersonal = telefonos.filter((t: { personalCedula: string; }) => t.personalCedula === personalSeleccionado.cedula);
        const telefonoItems = telefonosDelPersonal.map((t: { item: number }) => t.item);

        // Verificar si se han obtenido los IDs necesarios para la eliminación
        if (rolId === null || telefonoItems.length === 0) {
          console.error('No se han obtenido correctamente los IDs necesarios para la eliminación.');
          return;
        }

        // Primero eliminar los teléfonos del personal
        const eliminarTelefonos = telefonoItems.map((item: number) =>
          this.servicio.deletePersonalTelefono(item).pipe(
            catchError(error => {
              console.error(`Error al eliminar el teléfono con item ${item}:`, error);
              return throwError(error);
            })
          )
        );

        forkJoin(eliminarTelefonos).subscribe(
          () => {
            console.log('Teléfonos eliminados correctamente.');

            // Luego eliminar el rol del personal
            if (rolId !== null) {
              this.servicio.deleteRol(rolId).pipe(
                catchError(error => {
                  console.error(`Error al eliminar el rol con id ${rolId}:`, error);
                  return throwError(error);
                })
              ).subscribe(
                () => {
                  console.log('Rol eliminado correctamente.');

                  // Finalmente eliminar el personal
                  this.servicio.deletePersonal(personalSeleccionado.cedula).pipe(
                    catchError(error => {
                      console.error(`Error al eliminar el personal con cédula ${personalSeleccionado.cedula}:`, error);
                      return throwError(error);
                    })
                  ).subscribe(
                    () => {
                      console.log('Personal eliminado correctamente.');
                      this.obtenerPersonal(); // Actualizar la lista después de eliminar el personal
                    },
                    error => {
                      console.error('Error al eliminar el personal:', error);
                    }
                  );
                },
                error => {
                  console.error('Error al eliminar el rol:', error);
                }
              );
            }
          },
          error => {
            console.error('Error al eliminar los teléfonos:', error);
          }
        );
      });
    });
  }

  guardarCambios() {
    const cedula1 = (document.getElementById('cedula') as HTMLInputElement).value.trim();
    const nombre1 = (document.getElementById('nombre') as HTMLInputElement).value;
    const apellido11 = (document.getElementById('apellido1') as HTMLInputElement).value;
    const apellido21 = (document.getElementById('apellido2') as HTMLInputElement).value;
    const fechaNacimiento1 = (document.getElementById('fechaNacimiento') as HTMLInputElement).value;
    const direccion1 = (document.getElementById('direccion') as HTMLInputElement).value;
    const fechaIngreso1 = (document.getElementById('fechaIngreso') as HTMLInputElement).value;

    const datatoSend1= {
      Cedula: cedula1,
      Nombre: nombre1,
      Apellido1: apellido11,
      Apellido2: apellido21,
      Fechanacimiento: fechaNacimiento1 ? new Date(fechaNacimiento1) : null,
      Direccion: direccion1,
      fechaIngreso: fechaIngreso1 ? new Date(fechaIngreso1) : null
    };

    console.log('guardarCambios - datatoSend1:', datatoSend1);

    if (this.tipoModal === 1) { // Si el tipo de modal es 1 entonces es un post
      console.log('guardarCambios - realizando POST');
      this.servicio.postPersonal(datatoSend1).subscribe(
        response => {
          console.log('Datos enviados a posgress en POST:', response);
          const rolData = { personalCedula: cedula1, descripcion: this.rolDescripcion };
          this.servicio.postRol(rolData).subscribe(
            rolResponse => {
              console.log('Rol asignado:', rolResponse);
              const telefonoRequests = this.telefonos.map(telefono => {
                const telefonoData = { personalCedula: cedula1, telefono: telefono };
                return this.servicio.postPersonalTelefono(telefonoData);
              });
              forkJoin(telefonoRequests).subscribe(
                telefonoResponses => {
                  console.log('Teléfonos asignados:', telefonoResponses);
                  this.obtenerPersonal(); // Actualiza la lista después de agregar un personal
                  this.resetForm();
                },
                error => {
                  console.error('Error al asignar teléfonos:', error);
                }
              );
            },
            error => {
              console.error('Error al asignar rol:', error);
            }
          );
        },
        error => {
          console.error('POST - Error al enviar datos al servidor:', error);
        }
      );
    } else { // PUT para cuando hago el update
      console.log('guardarCambios - realizando PUT');
      this.servicio.putPersonal(datatoSend1.Cedula, datatoSend1).subscribe(
        () => {
          console.log('Update PUT - personal se actualizó correctamente.');

          // Actualizar el rol si se ha cambiado
          if (this.rolId !== null) {
            const rolData = { personalCedula: cedula1, descripcion: this.rolDescripcion };
            this.servicio.putRol(this.rolId, rolData).subscribe(
              rolResponse => {
                console.log('Rol actualizado:', rolResponse);

                // Actualizar los teléfonos
                const telefonoRequests = this.telefonos.map((telefono, index) => {
                  const telefonoData = { personalCedula: cedula1, telefono: telefono };
                  return this.servicio.putPersonalTelefono(this.telefonoItems[index], telefonoData);
                });
                forkJoin(telefonoRequests).subscribe(
                  telefonoResponses => {
                    console.log('Teléfonos actualizados:', telefonoResponses);
                    this.obtenerPersonal(); // Actualiza la lista después de modificar un personal
                    this.resetForm();
                  },
                  error => {
                    console.error('Error al actualizar teléfonos:', error);
                  }
                );
              },
              error => {
                console.error('Error al actualizar rol:', error);
              }
            );
          }
        },
        error => {
          console.error('PUT - Error al actualizar el personal:', error);
        }
      );
    }
  }

  addRegistro(numero: number) {
    this.tipoModal = numero;
    this.cedula = '';
    this.nombre = '';
    this.apellido1 = '';
    this.apellido2 = '';
    this.fechaNacimiento = null;
    this.direccion = '';
    this.fechaIngreso = null;
    this.telefonos = [''];
    this.rolDescripcion = '';
    this.rolId = null;
    this.telefonoItems = [];
    this.isReadonly = false;
    this.modalVisible = true;
    console.log('addRegistro - tipoModal:', numero);
  }

  obtenerPersonal() {
    this.servicio.getPersonal().subscribe(
      personalResponse => {
        const personalList: Personal[] = personalResponse;

        forkJoin({
          telefonos: this.servicio.getAllPersonalTelefonos(),
          roles: this.servicio.getAllRoles()
        }).subscribe(
          ({ telefonos, roles }) => {
            const telefonosList: PersonalTelefono[] = telefonos;
            const rolesList: Rol[] = roles;

            this.dataSource = personalList.map(personal => {
              const telefono = telefonosList.filter(t => t.personalCedula === personal.cedula).map(t => t.telefono);
              const rolDescripcion = rolesList.find(r => r.personalCedula === personal.cedula)?.descripcion || 'No disponible';
              return { ...personal, telefono, rolDescripcion };
            });

            // Guardar una copia del dataSource original
            this.originalDataSource = [...this.dataSource];
          },
          error => {
            console.error('Error al obtener los datos adicionales del personal:', error);
          }
        );
      },
      error => {
        console.error('GET - Error al obtener datos del servidor:', error);
      }
    );
  }

  agregarTelefono() {
    this.telefonos.push('');
  }

  eliminarTelefono(index: number) {
    this.telefonos.splice(index, 1);
    this.telefonoItems.splice(index, 1); // Asegúrate de que también se elimine el item correspondiente
  }

  resetForm() {
    this.cedula = '';
    this.nombre = '';
    this.apellido1 = '';
    this.apellido2 = '';
    this.fechaNacimiento = null;
    this.direccion = '';
    this.fechaIngreso = null;
    this.telefonos = [''];
    this.rolDescripcion = '';
    this.rolId = null;
    this.telefonoItems = [];
  }

  filtrarPersonal(rol: string) {
    if (rol === 'Administrativo') {
      this.dataSource = this.originalDataSource.filter(personal => personal.rolDescripcion === 'Administrativo');
    } else if (rol === 'Medico') {
      this.dataSource = this.originalDataSource.filter(personal => personal.rolDescripcion === 'Enfermero' || personal.rolDescripcion === 'Doctor');
    }
  }

  mostrarPersonalCompleto() {
    this.dataSource = [...this.originalDataSource];
  }
}
