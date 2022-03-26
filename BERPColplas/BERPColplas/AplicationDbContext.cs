using BERPColplas.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BERPColplas
{
    public class AplicationDbContext : DbContext
    {
        public DbSet<CorridaExtrusion> CorridaExtrusion { get; set; }
        public DbSet<MaterialSalida> MaterialSalida { get; set; }
        public DbSet<OrdenProduccion> OrdenProduccion { get; set; }
        public DbSet<ComponenteOrdenProduccion> ComponenteOrdenProduccion { get; set; }
        public DbSet<Reproceso> Reproceso { get; set; }
        public DbSet<TiempoParoExtrusion> TiempoParoExtrusion { get; set; }
        public DbSet<NotaExtrusion> NotaExtrusion { get; set; }
        public DbSet<Torta> Torta { get; set; }
        public DbSet<TortaExtrusion> TortaExtrusion { get; set; }
        public DbSet<RetalExtrusion> RetalExtrusion { get; set; }
        public DbSet<RetalExtrusionCantidad> RetalExtrusionCantidad { get; set; }
        public DbSet<MPriExtrusion> MPriExtrusion { get; set; }
        public DbSet<Devolucion> Devolucion { get; set; }
        public DbSet<ConsumoMPriExtrusion> ConsumoMPriExtrusion { get; set; }
        public DbSet<CorridaRefilado> CorridaRefilado { get; set; }
        public DbSet<NotaRefilado> NotaRefilado { get; set; }
        public DbSet<RetalRefilado> RetalRefilado { get; set; }
        public DbSet<RetalRefiladoCantidad> RetalRefiladoCantidad { get; set; }
        public DbSet<TiempoParoRefilado> TiempoParoRefilado { get; set; }
        public DbSet<MaterialEntradaRefilado> MaterialEntradaRefilado { get; set; }
        public DbSet<MaterialSalidaRefilado> MaterialSalidaRefilado { get; set; }
        public DbSet<EntradaSalidaRefilado> EntradaSalidaRefilado { get; set; }
        public DbSet<TiempoMontaje> TiempoMontaje { get; set; }
        public DbSet<CorridaImpresion> CorridaImpresion { get; set; }
        public DbSet<Operario> Operario { get; set; }
        public DbSet<OperarioMontaje> OperarioMontaje { get; set; }
        public DbSet<NotaImpresion> NotaImpresion { get; set; }
        public DbSet<TiempoParoImpresion> TiempoParoImpresion { get; set; }
        public DbSet<RetalImpresion> RetalImpresion { get; set; }
        public DbSet<RetalImpresionCantidad> RetalImpresionCantidad { get; set; }
        public DbSet<MaterialEntradaImpresion> MaterialEntradaImpresion { get; set; }
        public DbSet<MaterialSalidaImpresion> MaterialSalidaImpresion { get; set; }
        public DbSet<EntradaSalidaImpresion> EntradaSalidaImpresion { get; set; }
        public DbSet<EstadoOrdenProduccion> EstadoOrdenProduccion { get; set; }
        public DbSet<OperarioCorridaExtrusion> OperarioCorridaExtrusion { get; set; }
        public DbSet<OperarioCorridaImpresion> OperarioCorridaImpresion { get; set; }
        public DbSet<OperarioCorridaRefilado> OperarioCorridaRefilado { get; set; }
        public DbSet<ProcesoOrdenProduccion> ProcesoOrdenProduccion { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Rol> Rol { get; set; }
        public DbSet<Transferencia> Transferencia { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            //__________Relaciones OrdenProduccion__________
            modelBuilder.Entity<OrdenProduccion>()
                .HasMany(cop => cop.ComponenteOrdenProduccions)
                .WithOne(jcid => jcid.ordenProduccion)
                .HasForeignKey(p => p.Fk_OrdenProduccion);

            modelBuilder.Entity<OrdenProduccion>()
                .HasMany(cop => cop.EstadoOrdenProduccions)
                .WithOne(jcid => jcid.ordenProduccion)
                .HasForeignKey(p => p.Fk_OrdenProduccion);

            modelBuilder.Entity<OrdenProduccion>()
                .HasMany(cop => cop.ProcesoOrdenProduccions)
                .WithOne(jcid => jcid.ordenProduccion)
                .HasForeignKey(p => p.Fk_OrdenProduccion);
            
            modelBuilder.Entity<OrdenProduccion>()
                .HasMany(cop => cop.Devolucions)
                .WithOne(jcid => jcid.ordenProduccion)
                .HasForeignKey(p => p.Fk_OrdenProduccion);
            
            modelBuilder.Entity<OrdenProduccion>()
                .HasMany(cop => cop.CorridaExtrusions)
                .WithOne(jcid => jcid.ordenProduccion)
                .HasForeignKey(p => p.Fk_OrdenProduccion);

            modelBuilder.Entity<OrdenProduccion>()
                .HasMany(cop => cop.CorridaImpresions)
                .WithOne(jcid => jcid.ordenProduccion)
                .HasForeignKey(p => p.Fk_OrdenProduccion);
            
            modelBuilder.Entity<OrdenProduccion>()
                .HasMany(cop => cop.CorridaRefilados)
                .WithOne(jcid => jcid.ordenProduccion)
                .HasForeignKey(p => p.Fk_OrdenProduccion);

            modelBuilder.Entity<OrdenProduccion>()
                .HasMany(cop => cop.Transferencias)
                .WithOne(jcid => jcid.ordenProduccion)
                .HasForeignKey(p => p.Fk_OrdenProduccion);

            //__________Relaciones CorridaExtrusion__________
            modelBuilder.Entity<CorridaExtrusion>()
                .HasMany(acc => acc.MaterialSalidas)
                .WithOne(jcid => jcid.corridaExtrusion)
                .HasForeignKey(p => p.Fk_CorridaExtrusion);

            modelBuilder.Entity<CorridaExtrusion>()
                .HasMany(cop => cop.Reprocesos)
                .WithOne(jcid => jcid.corridaExtrusion)
                .HasForeignKey(p => p.Fk_CorridaExtrusion);
            
            modelBuilder.Entity<CorridaExtrusion>()
                .HasMany(cop => cop.TiempoParoExtrusions)
                .WithOne(jcid => jcid.corridaExtrusion)
                .HasForeignKey(p => p.Fk_CorridaExtrusion);
            
            modelBuilder.Entity<CorridaExtrusion>()
                .HasMany(cop => cop.NotaExtrusions)
                .WithOne(jcid => jcid.corridaExtrusion)
                .HasForeignKey(p => p.Fk_CorridaExtrusion);
            
            modelBuilder.Entity<CorridaExtrusion>()
                .HasMany(cop => cop.TortaExtrusions)
                .WithOne(jcid => jcid.corridaExtrusion)
                .HasForeignKey(p => p.Fk_CorridaExtrusion);
            
            modelBuilder.Entity<CorridaExtrusion>()
                .HasMany(cop => cop.RetalExtrusionCantidads)
                .WithOne(jcid => jcid.corridaExtrusion)
                .HasForeignKey(p => p.Fk_CorridaExtrusion);
            
            modelBuilder.Entity<CorridaExtrusion>()
                .HasMany(cop => cop.ConsumoMPriExtrusions)
                .WithOne(jcid => jcid.corridaExtrusion)
                .HasForeignKey(p => p.Fk_CorridaExtrusion);

            modelBuilder.Entity<CorridaExtrusion>()
                .HasMany(cop => cop.OperarioCorridaExtrusions)
                .WithOne(jcid => jcid.corridaExtrusion)
                .HasForeignKey(p => p.Fk_CorridaExtrusion);


            //__________Relaciones Torta__________
            modelBuilder.Entity<Torta>()
                .HasMany(acc => acc.TortaExtrusions)
                .WithOne(jcid => jcid.torta)
                .HasForeignKey(p => p.Fk_Torta);

            //__________Relaciones MPriExtrusion__________
            modelBuilder.Entity<MPriExtrusion>()
                .HasMany(acc => acc.Devolucions)
                .WithOne(jcid => jcid.mPriExtrusion)
                .HasForeignKey(p => p.Fk_MPri);

            modelBuilder.Entity<MPriExtrusion>()
                .HasMany(acc => acc.ConsumoMPriExtrusions)
                .WithOne(jcid => jcid.mPriExtrusion)
                .HasForeignKey(p => p.Fk_MPri);

            //__________Relaciones CorridaRefilado__________
            modelBuilder.Entity<CorridaRefilado>()
                .HasMany(acc => acc.NotaRefilados)
                .WithOne(jcid => jcid.corridaRefilado)
                .HasForeignKey(p => p.Fk_CorridaRefilado);

            modelBuilder.Entity<CorridaRefilado>()
                .HasMany(cop => cop.TiempoParoRefilados)
                .WithOne(jcid => jcid.corridaRefilado)
                .HasForeignKey(p => p.Fk_CorridaRefilado);

            modelBuilder.Entity<CorridaRefilado>()
                .HasMany(cop => cop.MaterialEntradaRefilados)
                .WithOne(jcid => jcid.corridaRefilado)
                .HasForeignKey(p => p.Fk_CorridaRefilado);

            modelBuilder.Entity<CorridaRefilado>()
                .HasMany(cop => cop.OperarioCorridaRefilados)
                .WithOne(jcid => jcid.corridaRefilado)
                .HasForeignKey(p => p.Fk_CorridaRefilado);

            modelBuilder.Entity<CorridaRefilado>()
                .HasMany(cop => cop.RetalRefiladoCantidads)
                .WithOne(jcid => jcid.corridaRefilado)
                .HasForeignKey(p => p.Fk_CorridaRefilado);

            //__________Relaciones MaterialSalidaRefilado__________
            modelBuilder.Entity<MaterialSalidaRefilado>()
                .HasMany(acc => acc.EntradaSalidaRefilados)
                .WithOne(jcid => jcid.materialSalidaRefilado)
                .HasForeignKey(p => p.Fk_NoLoteSalida);

            //__________Relaciones MaterialEntradaRefilado__________
            modelBuilder.Entity<MaterialEntradaRefilado>()
                .HasMany(acc => acc.EntradaSalidaRefilados)
                .WithOne(jcid => jcid.materialEntradaRefilado)
                .HasForeignKey(p => p.Fk_NoLoteRolloMadreRefilado);

            //__________Relaciones TiempoMontaje__________
            modelBuilder.Entity<TiempoMontaje>()
                .HasMany(acc => acc.CorridaImpresions)
                .WithOne(jcid => jcid.tiempoMontaje)
                .HasForeignKey(p => p.Fk_TiempoMontaje);

            modelBuilder.Entity<TiempoMontaje>()
                .HasMany(acc => acc.OperarioMontajes)
                .WithOne(jcid => jcid.tiempoMontaje)
                .HasForeignKey(p => p.Fk_TiempoMontaje);

            //__________Relaciones Operario__________
            modelBuilder.Entity<Operario>()
                .HasMany(acc => acc.OperarioMontajes)
                .WithOne(jcid => jcid.operario)
                .HasForeignKey(p => p.Fk_Operario);

            modelBuilder.Entity<Operario>()
                .HasMany(acc => acc.OperarioCorridaExtrusions)
                .WithOne(jcid => jcid.operario)
                .HasForeignKey(p => p.Fk_Operario);

            modelBuilder.Entity<Operario>()
                .HasMany(acc => acc.OperarioCorridaImpresions)
                .WithOne(jcid => jcid.operario)
                .HasForeignKey(p => p.Fk_Operario);

            modelBuilder.Entity<Operario>()
                .HasMany(acc => acc.OperarioCorridaRefilados)
                .WithOne(jcid => jcid.operario)
                .HasForeignKey(p => p.Fk_Operario);


            //__________Relaciones CorridaImpresion__________
            modelBuilder.Entity<CorridaImpresion>()
                .HasMany(acc => acc.NotaImpresions)
                .WithOne(jcid => jcid.corridaImpresion)
                .HasForeignKey(p => p.Fk_CorridaImpresion);

            modelBuilder.Entity<CorridaImpresion>()
                .HasMany(cop => cop.OperarioCorridaImpresions)
                .WithOne(jcid => jcid.corridaImpresion)
                .HasForeignKey(p => p.Fk_CorridaImpresion);

            modelBuilder.Entity<CorridaImpresion>()
                .HasMany(cop => cop.TiempoParoImpresions)
                .WithOne(jcid => jcid.corridaImpresion)
                .HasForeignKey(p => p.Fk_CorridaImpresion);

            modelBuilder.Entity<CorridaImpresion>()
                .HasMany(cop => cop.RetalImpresionCantidads)
                .WithOne(jcid => jcid.corridaImpresion)
                .HasForeignKey(p => p.Fk_CorridaImpresion);

            modelBuilder.Entity<CorridaImpresion>()
                .HasMany(cop => cop.MaterialEntradaImpresions)
                .WithOne(jcid => jcid.corridaImpresion)
                .HasForeignKey(p => p.Fk_CorridaImpresion);


            //__________Relaciones MaterialSalidaImpresion__________
            modelBuilder.Entity<MaterialSalidaImpresion>()
                .HasMany(acc => acc.EntradaSalidaImpresions)
                .WithOne(jcid => jcid.materialSalidaImpresion)
                .HasForeignKey(p => p.Fk_NoLoteSalida);

            //__________Relaciones MaterialEntradaImpresion__________
            modelBuilder.Entity<MaterialEntradaImpresion>()
                .HasMany(acc => acc.EntradaSalidaImpresions)
                .WithOne(jcid => jcid.materialEntradaImpresion)
                .HasForeignKey(p => p.Fk_NoLoteRolloMadre);

            //__________Relaciones RetalExtrusion__________
            modelBuilder.Entity<RetalExtrusion>()
                .HasMany(acc => acc.RetalExtrusionCantidads)
                .WithOne(jcid => jcid.retalExtrusion)
                .HasForeignKey(p => p.Fk_RetalExtrusion);

            //__________Relaciones RetalRefilado__________
            modelBuilder.Entity<RetalRefilado>()
                .HasMany(acc => acc.RetalRefiladoCantidads)
                .WithOne(jcid => jcid.retalRefilado)
                .HasForeignKey(p => p.Fk_RetalRefilado);

            //__________Relaciones RetalImpresion__________
            modelBuilder.Entity<RetalImpresion>()
                .HasMany(cop => cop.RetalImpresionCantidads)
                .WithOne(jcid => jcid.retalImpresion)
                .HasForeignKey(p => p.Fk_RetalImpresion);

            //__________Relaciones Rol__________
            modelBuilder.Entity<Rol>()
                .HasMany(cop => cop.usuarios)
                .WithOne(jcid => jcid.rol)
                .HasForeignKey(p => p.Fk_Rol);

            ////__________Relaciones ComponenteOrdenProduccion__________
            //modelBuilder.Entity<ProcesoOrdenProduccion>()
            //    .HasMany(cop => cop.CorridaExtrusions)
            //    .WithOne(jcid => jcid.procesoOrdenProduccion)
            //    .HasForeignKey(p => p.Fk_ProcesoOrdenProduccion);

            //modelBuilder.Entity<ProcesoOrdenProduccion>()
            //    .HasMany(cop => cop.CorridaRefilados)
            //    .WithOne(jcid => jcid.procesoOrdenProduccion)
            //    .HasForeignKey(p => p.Fk_ProcesoOrdenProduccion);

            //modelBuilder.Entity<ProcesoOrdenProduccion>()
            //    .HasMany(cop => cop.CorridaImpresions)
            //    .WithOne(jcid => jcid.procesoOrdenProduccion)
            //    .HasForeignKey(p => p.Fk_ProcesoOrdenProduccion);
        }


        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {

        }
    }
}
