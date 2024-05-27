using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HospiTECAPI.Models;

public partial class HospitecContext : DbContext
{
    public HospitecContext()
    {
    }

    public HospitecContext(DbContextOptions<HospitecContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cama> Camas { get; set; }

    public virtual DbSet<Equipo> Equipos { get; set; }

    public virtual DbSet<Historial> Historials { get; set; }

    public virtual DbSet<Horarioscama> Horarioscamas { get; set; }

    public virtual DbSet<Paciente> Pacientes { get; set; }

    public virtual DbSet<PacienteTelefono> PacienteTelefonos { get; set; }

    public virtual DbSet<Patologium> Patologia { get; set; }

    public virtual DbSet<Personal> Personals { get; set; }

    public virtual DbSet<PersonalTelefono> PersonalTelefonos { get; set; }

    public virtual DbSet<Procedimiento> Procedimientos { get; set; }

    public virtual DbSet<Reserva> Reservas { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<Salon> Salons { get; set; }

    public virtual DbSet<Tratamiento> Tratamientos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Server=hospitecdb.postgres.database.azure.com;Database=hospitec;Port=5432;User Id=administrador;Password={password};Ssl Mode=Require;\n");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cama>(entity =>
        {
            entity.HasKey(e => e.Idcama).HasName("cama_pkey");

            entity.ToTable("cama");

            entity.Property(e => e.Idcama).HasColumnName("idcama");
            entity.Property(e => e.Estadouci).HasColumnName("estadouci");
            entity.Property(e => e.Nombresalon)
                .HasMaxLength(100)
                .HasColumnName("nombresalon");

            entity.HasOne(d => d.NombresalonNavigation).WithMany(p => p.Camas)
                .HasForeignKey(d => d.Nombresalon)
                .HasConstraintName("fk_cama_salon");
        });

        modelBuilder.Entity<Equipo>(entity =>
        {
            entity.HasKey(e => e.Idequipo).HasName("equipo_pkey");

            entity.ToTable("equipo");

            entity.Property(e => e.Idequipo).HasColumnName("idequipo");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.Idcama).HasColumnName("idcama");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.Proveedor)
                .HasMaxLength(100)
                .HasColumnName("proveedor");

            entity.HasOne(d => d.IdcamaNavigation).WithMany(p => p.Equipos)
                .HasForeignKey(d => d.Idcama)
                .HasConstraintName("fk_equipo_cama");
        });

        modelBuilder.Entity<Historial>(entity =>
        {
            entity.HasKey(e => e.Idhistorial).HasName("historial_pkey");

            entity.ToTable("historial");

            entity.Property(e => e.Idhistorial).HasColumnName("idhistorial");
            entity.Property(e => e.Fechaprocedimiento).HasColumnName("fechaprocedimiento");
            entity.Property(e => e.Idproced).HasColumnName("idproced");
            entity.Property(e => e.Idtratamiento).HasColumnName("idtratamiento");
            entity.Property(e => e.Pacientecedula)
                .HasMaxLength(20)
                .HasColumnName("pacientecedula");

            entity.HasOne(d => d.IdprocedNavigation).WithMany(p => p.Historials)
                .HasForeignKey(d => d.Idproced)
                .HasConstraintName("fk_historial_proced");

            entity.HasOne(d => d.IdtratamientoNavigation).WithMany(p => p.Historials)
                .HasForeignKey(d => d.Idtratamiento)
                .HasConstraintName("fk_historial_tratamiento");

            entity.HasOne(d => d.PacientecedulaNavigation).WithMany(p => p.Historials)
                .HasForeignKey(d => d.Pacientecedula)
                .HasConstraintName("fk_historial_paciente");
        });

        modelBuilder.Entity<Horarioscama>(entity =>
        {
            entity.HasKey(e => e.Idhorario).HasName("horarioscamas_pkey");

            entity.ToTable("horarioscamas");

            entity.Property(e => e.Idhorario).HasColumnName("idhorario");
            entity.Property(e => e.Diafinal).HasColumnName("diafinal");
            entity.Property(e => e.Dialinicio).HasColumnName("dialinicio");
            entity.Property(e => e.Dni)
                .HasMaxLength(20)
                .HasColumnName("dni");
            entity.Property(e => e.Idcama).HasColumnName("idcama");

            entity.HasOne(d => d.IdcamaNavigation).WithMany(p => p.Horarioscamas)
                .HasForeignKey(d => d.Idcama)
                .HasConstraintName("fk_horarioscamas_cama");
        });

        modelBuilder.Entity<Paciente>(entity =>
        {
            entity.HasKey(e => e.Cedula).HasName("paciente_pkey");

            entity.ToTable("paciente");

            entity.Property(e => e.Cedula)
                .HasMaxLength(20)
                .HasColumnName("cedula");
            entity.Property(e => e.Apellido1)
                .HasMaxLength(50)
                .HasColumnName("apellido1");
            entity.Property(e => e.Apellido2)
                .HasMaxLength(50)
                .HasColumnName("apellido2");
            entity.Property(e => e.Direccion)
                .HasMaxLength(255)
                .HasColumnName("direccion");
            entity.Property(e => e.Fechanacimiento).HasColumnName("fechanacimiento");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<PacienteTelefono>(entity =>
        {
            entity.HasKey(e => e.Item).HasName("paciente_telefono_pkey");

            entity.ToTable("paciente_telefono");

            entity.Property(e => e.Item).HasColumnName("item");
            entity.Property(e => e.Pacientecedula)
                .HasMaxLength(20)
                .HasColumnName("pacientecedula");
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .HasColumnName("telefono");

            entity.HasOne(d => d.PacientecedulaNavigation).WithMany(p => p.PacienteTelefonos)
                .HasForeignKey(d => d.Pacientecedula)
                .HasConstraintName("fk_paciente_telefono_paciente");
        });

        modelBuilder.Entity<Patologium>(entity =>
        {
            entity.HasKey(e => e.Nombrepatologia).HasName("patologia_pkey");

            entity.ToTable("patologia");

            entity.Property(e => e.Nombrepatologia)
                .HasMaxLength(100)
                .HasColumnName("nombrepatologia");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .HasColumnName("descripcion");
        });

        modelBuilder.Entity<Personal>(entity =>
        {
            entity.HasKey(e => e.Cedula).HasName("personal_pkey");

            entity.ToTable("personal");

            entity.Property(e => e.Cedula)
                .HasMaxLength(20)
                .HasColumnName("cedula");
            entity.Property(e => e.Apellido1)
                .HasMaxLength(50)
                .HasColumnName("apellido1");
            entity.Property(e => e.Apellido2)
                .HasMaxLength(50)
                .HasColumnName("apellido2");
            entity.Property(e => e.Direccion)
                .HasMaxLength(255)
                .HasColumnName("direccion");
            entity.Property(e => e.Fechaingreso).HasColumnName("fechaingreso");
            entity.Property(e => e.Fechanacimiento).HasColumnName("fechanacimiento");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<PersonalTelefono>(entity =>
        {
            entity.HasKey(e => e.Item).HasName("personal_telefono_pkey");

            entity.ToTable("personal_telefono");

            entity.Property(e => e.Item).HasColumnName("item");
            entity.Property(e => e.Personalcedula)
                .HasMaxLength(20)
                .HasColumnName("personalcedula");
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .HasColumnName("telefono");

            entity.HasOne(d => d.PersonalcedulaNavigation).WithMany(p => p.PersonalTelefonos)
                .HasForeignKey(d => d.Personalcedula)
                .HasConstraintName("fk_personal_telefono_personal");
        });

        modelBuilder.Entity<Procedimiento>(entity =>
        {
            entity.HasKey(e => e.Idproced).HasName("procedimientos_pkey");

            entity.ToTable("procedimientos");

            entity.Property(e => e.Idproced).HasColumnName("idproced");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(100)
                .HasColumnName("descripcion");
            entity.Property(e => e.Duraciondias).HasColumnName("duraciondias");
            entity.Property(e => e.Nombrepatologia)
                .HasMaxLength(100)
                .HasColumnName("nombrepatologia");
            entity.Property(e => e.Procednombre)
                .HasMaxLength(100)
                .HasColumnName("procednombre");

            entity.HasOne(d => d.NombrepatologiaNavigation).WithMany(p => p.Procedimientos)
                .HasForeignKey(d => d.Nombrepatologia)
                .HasConstraintName("fk_procedimientos_patologia");
        });

        modelBuilder.Entity<Reserva>(entity =>
        {
            entity.HasKey(e => e.Idreservacion).HasName("reserva_pkey");

            entity.ToTable("reserva");

            entity.Property(e => e.Idreservacion).HasColumnName("idreservacion");
            entity.Property(e => e.Fechaingreso).HasColumnName("fechaingreso");
            entity.Property(e => e.Fechasalida).HasColumnName("fechasalida");
            entity.Property(e => e.Idcama).HasColumnName("idcama");
            entity.Property(e => e.Idproced).HasColumnName("idproced");
            entity.Property(e => e.Pacientecedula)
                .HasMaxLength(20)
                .HasColumnName("pacientecedula");

            entity.HasOne(d => d.IdcamaNavigation).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.Idcama)
                .HasConstraintName("fk_reserva_cama");

            entity.HasOne(d => d.IdprocedNavigation).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.Idproced)
                .HasConstraintName("fk_reserva_procedimiento");

            entity.HasOne(d => d.PacientecedulaNavigation).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.Pacientecedula)
                .HasConstraintName("fk_reserva_paciente");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.Idrol).HasName("rol_pkey");

            entity.ToTable("rol");

            entity.Property(e => e.Idrol).HasColumnName("idrol");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .HasColumnName("descripcion");
            entity.Property(e => e.Personalcedula)
                .HasMaxLength(20)
                .HasColumnName("personalcedula");

            entity.HasOne(d => d.PersonalcedulaNavigation).WithMany(p => p.Rols)
                .HasForeignKey(d => d.Personalcedula)
                .HasConstraintName("fk_rol_personal");
        });

        modelBuilder.Entity<Salon>(entity =>
        {
            entity.HasKey(e => e.Nombresalon).HasName("salon_pkey");

            entity.ToTable("salon");

            entity.Property(e => e.Nombresalon)
                .HasMaxLength(100)
                .HasColumnName("nombresalon");
            entity.Property(e => e.Capacidadcamas).HasColumnName("capacidadcamas");
            entity.Property(e => e.Numerodepiso).HasColumnName("numerodepiso");
            entity.Property(e => e.Tipodesalon)
                .HasMaxLength(50)
                .HasColumnName("tipodesalon");
        });

        modelBuilder.Entity<Tratamiento>(entity =>
        {
            entity.HasKey(e => e.Idtratamiento).HasName("tratamiento_pkey");

            entity.ToTable("tratamiento");

            entity.Property(e => e.Idtratamiento).HasColumnName("idtratamiento");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .HasColumnName("descripcion");
            entity.Property(e => e.Nombrepatologia)
                .HasMaxLength(100)
                .HasColumnName("nombrepatologia");
            entity.Property(e => e.Nombretratamiento)
                .HasMaxLength(100)
                .HasColumnName("nombretratamiento");

            entity.HasOne(d => d.NombrepatologiaNavigation).WithMany(p => p.Tratamientos)
                .HasForeignKey(d => d.Nombrepatologia)
                .HasConstraintName("fk_tratamiento_patologia");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
