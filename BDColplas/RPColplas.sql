USE [master]
GO
/****** Object:  Database [RPColplas2]    Script Date: 12/27/2021 9:31:27 AM ******/
CREATE DATABASE [RPColplas2]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'RPColplas2', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\RPColplas2.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'RPColplas2_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\RPColplas2_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [RPColplas2] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [RPColplas2].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [RPColplas2] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [RPColplas2] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [RPColplas2] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [RPColplas2] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [RPColplas2] SET ARITHABORT OFF 
GO
ALTER DATABASE [RPColplas2] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [RPColplas2] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [RPColplas2] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [RPColplas2] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [RPColplas2] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [RPColplas2] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [RPColplas2] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [RPColplas2] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [RPColplas2] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [RPColplas2] SET  DISABLE_BROKER 
GO
ALTER DATABASE [RPColplas2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [RPColplas2] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [RPColplas2] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [RPColplas2] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [RPColplas2] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [RPColplas2] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [RPColplas2] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [RPColplas2] SET RECOVERY FULL 
GO
ALTER DATABASE [RPColplas2] SET  MULTI_USER 
GO
ALTER DATABASE [RPColplas2] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [RPColplas2] SET DB_CHAINING OFF 
GO
ALTER DATABASE [RPColplas2] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [RPColplas2] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [RPColplas2] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [RPColplas2] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [RPColplas2] SET QUERY_STORE = OFF
GO
USE [RPColplas2]
GO
/****** Object:  Table [dbo].[ComponenteOrdenProduccion]    Script Date: 12/27/2021 9:31:27 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ComponenteOrdenProduccion](
	[Pk_ComponenteOrdenProduccion] [int] NOT NULL,
	[Fk_OrdenProduccion] [nvarchar](20) NOT NULL,
	[Componente] [nvarchar](20) NOT NULL,
	[Descripcion] [nvarchar](100) NOT NULL,
	[Proceso] [nvarchar](10) NOT NULL,
	[DestinoComponente] [nvarchar](20) NOT NULL,
 CONSTRAINT [Pk_ComponenteOrdenProduccion] PRIMARY KEY CLUSTERED 
(
	[Pk_ComponenteOrdenProduccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ConsumoMPriExtrusion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ConsumoMPriExtrusion](
	[Pk_ConsumoMPriExtrusion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaExtrusion] [int] NOT NULL,
	[Fk_MPri] [nvarchar](20) NOT NULL,
	[CantidadConsumida] [decimal](9, 4) NOT NULL,
 CONSTRAINT [PK_ConsumoMPriExtrusion] PRIMARY KEY CLUSTERED 
(
	[Pk_ConsumoMPriExtrusion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CorridaExtrusion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CorridaExtrusion](
	[Pk_CorridaExtrusion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_ProcesoOrdenProduccion] [int] NULL,
	[TiempoAjuste] [decimal](4, 2) NOT NULL,
	[Estado] [bit] NULL,
	[Maquina] [nvarchar](50) NULL,
 CONSTRAINT [Pk_CorridaExtrusion] PRIMARY KEY CLUSTERED 
(
	[Pk_CorridaExtrusion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CorridaImpresion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CorridaImpresion](
	[Pk_CorridaImpresion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_ProcesoOrdenProduccion] [int] NULL,
	[Fk_TiempoMontaje] [int] NOT NULL,
	[Maquina] [nvarchar](80) NOT NULL,
	[Estado] [bit] NOT NULL,
 CONSTRAINT [Pk_CorridaImpresion] PRIMARY KEY CLUSTERED 
(
	[Pk_CorridaImpresion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CorridaRefilado]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CorridaRefilado](
	[Pk_CorridaRefilado] [int] IDENTITY(1,1) NOT NULL,
	[Fk_ProcesoOrdenProduccion] [int] NULL,
	[Maquina] [nvarchar](20) NOT NULL,
	[TiempoAjuste] [decimal](4, 2) NOT NULL,
	[Estado] [bit] NOT NULL,
 CONSTRAINT [Pk_CorridaRefilado] PRIMARY KEY CLUSTERED 
(
	[Pk_CorridaRefilado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Devolucion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Devolucion](
	[Pk_Devolucion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_OrdenProduccion] [nvarchar](20) NOT NULL,
	[Fk_MPri] [nvarchar](20) NOT NULL,
	[Cantidad] [decimal](9, 4) NOT NULL,
 CONSTRAINT [PK_Devolucion] PRIMARY KEY CLUSTERED 
(
	[Pk_Devolucion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EntradaSalidaImpresion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EntradaSalidaImpresion](
	[Pk_EntradaSalidaImpresio] [int] IDENTITY(1,1) NOT NULL,
	[Fk_NoLoteRolloMadre] [nvarchar](15) NOT NULL,
	[Fk_NoLoteSalida] [nvarchar](15) NOT NULL,
 CONSTRAINT [PK_EntradaSalidaImpresion] PRIMARY KEY CLUSTERED 
(
	[Pk_EntradaSalidaImpresio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EntradaSalidaRefilado]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EntradaSalidaRefilado](
	[Pk_EntradaSalidaRefilado] [int] IDENTITY(1,1) NOT NULL,
	[Fk_NoLoteRolloMadreRefilado] [nvarchar](15) NOT NULL,
	[Fk_NoLoteSalida] [nvarchar](15) NOT NULL,
 CONSTRAINT [PK_EntradaSalidaRefilado] PRIMARY KEY CLUSTERED 
(
	[Pk_EntradaSalidaRefilado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EstadoCorridaExtrusion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstadoCorridaExtrusion](
	[Pk_EstadoCorridaExtrusion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaExtrusion] [int] NOT NULL,
	[Estado] [bit] NOT NULL,
 CONSTRAINT [PK_EstadoCorridaExtrusion] PRIMARY KEY CLUSTERED 
(
	[Pk_EstadoCorridaExtrusion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EstadoCorridaImpresion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstadoCorridaImpresion](
	[Pk_EstadoCorridaImpresion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaImpresion] [int] NOT NULL,
	[Estado] [bit] NOT NULL,
 CONSTRAINT [PK_EstadoCorridaImpresion] PRIMARY KEY CLUSTERED 
(
	[Pk_EstadoCorridaImpresion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EstadoOrdenProduccion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstadoOrdenProduccion](
	[Pk_EstadoOrdenProduccion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_OrdenProduccion] [nvarchar](20) NOT NULL,
	[Estado] [bit] NOT NULL,
 CONSTRAINT [PK_EstadoOrdenProduccion] PRIMARY KEY CLUSTERED 
(
	[Pk_EstadoOrdenProduccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaterialEntradaImpresion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaterialEntradaImpresion](
	[Pk_NoLoteRolloMadreImpresion] [nvarchar](15) NOT NULL,
	[CantidadRolloMadre] [decimal](9, 4) NULL,
	[Fk_CorridaImpresion] [int] NOT NULL,
	[CantidadConsumidaRolloMadre] [decimal](9, 4) NULL,
 CONSTRAINT [Pk_NoLoteRolloMadreImpresion] PRIMARY KEY CLUSTERED 
(
	[Pk_NoLoteRolloMadreImpresion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaterialEntradaRefilado]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaterialEntradaRefilado](
	[Pk_NoLoteRolloMadreRefilado] [nvarchar](15) NOT NULL,
	[CantidadRolloMadre] [decimal](9, 4) NULL,
	[Fk_CorridaRefilado] [int] NOT NULL,
	[CantidadConsumidaRolloMadre] [decimal](9, 4) NULL,
 CONSTRAINT [Pk_NoLoteRolloMadre] PRIMARY KEY CLUSTERED 
(
	[Pk_NoLoteRolloMadreRefilado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaterialSalida]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaterialSalida](
	[Pk_MaterialSalida] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaExtrusion] [int] NOT NULL,
	[PesoNetoRollo] [decimal](9, 4) NULL,
	[NoLote] [nvarchar](15) NULL,
	[UbicacionTipo] [nvarchar](15) NULL,
	[UbicacionNumero] [nvarchar](4) NULL,
 CONSTRAINT [PK_MaterialSalida] PRIMARY KEY CLUSTERED 
(
	[Pk_MaterialSalida] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaterialSalidaImpresion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaterialSalidaImpresion](
	[PK_NoLoteSalidaImpresion] [nvarchar](15) NOT NULL,
	[KgEntregados] [decimal](9, 4) NOT NULL,
	[MetroLineal] [decimal](10, 4) NOT NULL,
	[UbicacionTipo] [nvarchar](15) NULL,
	[UbicacionNumero] [nvarchar](4) NULL,
 CONSTRAINT [PK_NoLoteSalidaInmpresion] PRIMARY KEY CLUSTERED 
(
	[PK_NoLoteSalidaImpresion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaterialSalidaRefilado]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaterialSalidaRefilado](
	[PK_NoLoteSalidaRefilado] [nvarchar](15) NOT NULL,
	[Cantidad] [decimal](9, 4) NOT NULL,
	[UbicacionTipo] [nvarchar](15) NULL,
	[UbicacionNumero] [nvarchar](4) NULL,
 CONSTRAINT [PK_NoLoteSalida] PRIMARY KEY CLUSTERED 
(
	[PK_NoLoteSalidaRefilado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MPriExtrusion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MPriExtrusion](
	[Pk_CodigoProducto] [nvarchar](20) NOT NULL,
	[Descripcion] [nvarchar](100) NOT NULL,
	[OrdenProduccion] [nvarchar](20) NULL,
 CONSTRAINT [Pk_CodigoProducto] PRIMARY KEY CLUSTERED 
(
	[Pk_CodigoProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NotaExtrusion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NotaExtrusion](
	[Pk_NotaExtrusion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaExtrusion] [int] NOT NULL,
	[Descripcion] [nvarchar](250) NOT NULL,
 CONSTRAINT [Pk_Nota] PRIMARY KEY CLUSTERED 
(
	[Pk_NotaExtrusion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NotaImpresion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NotaImpresion](
	[Pk_NotaImpresion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaImpresion] [int] NOT NULL,
	[Descripcion] [nvarchar](250) NOT NULL,
 CONSTRAINT [Pk_NotaImpresion] PRIMARY KEY CLUSTERED 
(
	[Pk_NotaImpresion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NotaRefilado]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NotaRefilado](
	[Pk_NotaRefilado] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaRefilado] [int] NOT NULL,
	[Descripcion] [nvarchar](250) NOT NULL,
 CONSTRAINT [Pk_NotaRefilado] PRIMARY KEY CLUSTERED 
(
	[Pk_NotaRefilado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Operario]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Operario](
	[Pk_Operario] [int] NOT NULL,
	[Nombre] [nvarchar](80) NOT NULL,
 CONSTRAINT [Pk_Operario] PRIMARY KEY CLUSTERED 
(
	[Pk_Operario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OperarioCorridaExtrusion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OperarioCorridaExtrusion](
	[Pk_OperarioCorridaExtrusion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaExtrusion] [int] NOT NULL,
	[Fk_Operario] [int] NOT NULL,
	[FechaHora] [datetime] NOT NULL,
 CONSTRAINT [PK_OperarioCorridaExtrusion] PRIMARY KEY CLUSTERED 
(
	[Pk_OperarioCorridaExtrusion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OperarioCorridaImpresion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OperarioCorridaImpresion](
	[Pk_OperarioCorridaImpresion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaImpresion] [int] NOT NULL,
	[Fk_Operario] [int] NOT NULL,
	[FechaHora] [datetime] NOT NULL,
 CONSTRAINT [PK_OperarioCorridaImpresion] PRIMARY KEY CLUSTERED 
(
	[Pk_OperarioCorridaImpresion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OperarioCorridaRefilado]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OperarioCorridaRefilado](
	[Pk_OperarioCorridaRefilado] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaRefilado] [int] NOT NULL,
	[Fk_Operario] [int] NOT NULL,
	[FechaHora] [datetime] NOT NULL,
 CONSTRAINT [PK_OperarioCorridaRefilado] PRIMARY KEY CLUSTERED 
(
	[Pk_OperarioCorridaRefilado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OperarioMontaje]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OperarioMontaje](
	[Pk_OperarioMontaje] [int] NOT NULL,
	[Fk_TiempoMontaje] [int] NOT NULL,
	[Fk_Operario] [int] NOT NULL,
	[FechaHora] [datetime] NOT NULL,
 CONSTRAINT [Pk_OperarioMontaje] PRIMARY KEY CLUSTERED 
(
	[Pk_OperarioMontaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrdenProduccion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrdenProduccion](
	[Pk_OrdenProduccion] [nvarchar](20) NOT NULL,
	[CodigoProductoERP] [nvarchar](20) NULL,
	[CantidadProgramada] [decimal](10, 4) NULL,
	[Cliente] [nvarchar](80) NULL,
 CONSTRAINT [PK_OrdenProduccion] PRIMARY KEY CLUSTERED 
(
	[Pk_OrdenProduccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProcesoOrdenProduccion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProcesoOrdenProduccion](
	[Pk_ProcesoOrdenProduccion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_OrdenProduccion] [nvarchar](20) NOT NULL,
	[Proceso] [nvarchar](10) NULL,
	[UnidadMedida] [nvarchar](10) NULL,
	[Descripcion] [nvarchar](100) NULL,
	[Maquina] [nvarchar](50) NULL,
 CONSTRAINT [PK_ProcesoOrdenProduccion] PRIMARY KEY CLUSTERED 
(
	[Pk_ProcesoOrdenProduccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reproceso]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reproceso](
	[Pk_Reproceso] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaExtrusion] [int] NOT NULL,
	[PesoNetoRollo] [decimal](9, 4) NULL,
	[NoLote] [nvarchar](15) NULL,
	[UbicacionTipo] [nvarchar](15) NULL,
	[UbicacionNumero] [nvarchar](4) NULL,
 CONSTRAINT [PK_Reproceso] PRIMARY KEY CLUSTERED 
(
	[Pk_Reproceso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RetalExtrusion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RetalExtrusion](
	[Pk_RetalExtrusion] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [nvarchar](20) NOT NULL,
	[Descripcion] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_RetalExtrusion] PRIMARY KEY CLUSTERED 
(
	[Pk_RetalExtrusion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RetalExtrusionCantidad]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RetalExtrusionCantidad](
	[Pk_RetalExtrusionCantidad] [int] IDENTITY(1,1) NOT NULL,
	[Fk_RetalExtrusion] [int] NOT NULL,
	[Fk_CorridaExtrusion] [int] NOT NULL,
	[Cantidad] [decimal](9, 4) NOT NULL,
 CONSTRAINT [PK_RetalExtrusionCantidad] PRIMARY KEY CLUSTERED 
(
	[Pk_RetalExtrusionCantidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RetalImpresion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RetalImpresion](
	[Pk_RetalImpresion] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [nvarchar](20) NOT NULL,
	[Descripcion] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_RetalImpresion] PRIMARY KEY CLUSTERED 
(
	[Pk_RetalImpresion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RetalImpresionCantidad]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RetalImpresionCantidad](
	[Pk_RetalImpresionCantidad] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaImpresion] [int] NOT NULL,
	[Fk_RetalImpresion] [int] NOT NULL,
	[Cantidad] [decimal](9, 4) NOT NULL,
 CONSTRAINT [PK_RetalImpresionCantidad] PRIMARY KEY CLUSTERED 
(
	[Pk_RetalImpresionCantidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RetalRefilado]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RetalRefilado](
	[Pk_RetalRefilado] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [nvarchar](20) NOT NULL,
	[Descripcion] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_RetalRefilado] PRIMARY KEY CLUSTERED 
(
	[Pk_RetalRefilado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RetalRefiladoCantidad]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RetalRefiladoCantidad](
	[Pk_RetalRefiladoCantidad] [int] IDENTITY(1,1) NOT NULL,
	[Fk_RetalRefilado] [int] NOT NULL,
	[Fk_CorridaRefilado] [int] NOT NULL,
	[Cantidad] [decimal](9, 4) NOT NULL,
 CONSTRAINT [PK_RetalRefiladoCantidad] PRIMARY KEY CLUSTERED 
(
	[Pk_RetalRefiladoCantidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TiempoMontaje]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TiempoMontaje](
	[Pk_TiempoMontaje] [int] IDENTITY(1,1) NOT NULL,
	[MetrosCuadre] [decimal](9, 4) NOT NULL,
	[Velocidad] [decimal](10, 4) NOT NULL,
 CONSTRAINT [Pk_TiempoMontaje] PRIMARY KEY CLUSTERED 
(
	[Pk_TiempoMontaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TiempoParoExtrusion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TiempoParoExtrusion](
	[Pk_TiempoParoExtrusion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaExtrusion] [int] NOT NULL,
	[FechaInicio] [datetime] NOT NULL,
	[FechaFinal] [datetime] NOT NULL,
	[CausaDescripcion] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_TiempoParoExtrusion] PRIMARY KEY CLUSTERED 
(
	[Pk_TiempoParoExtrusion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TiempoParoImpresion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TiempoParoImpresion](
	[Pk_TiempoParoImpresion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaImpresion] [int] NOT NULL,
	[FechaInicio] [datetime] NOT NULL,
	[FechaFinal] [datetime] NOT NULL,
	[CausaDescripcion] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_TiempoParoImpresion] PRIMARY KEY CLUSTERED 
(
	[Pk_TiempoParoImpresion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TiempoParoRefilado]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TiempoParoRefilado](
	[Pk_TiempoParoRefilado] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaRefilado] [int] NOT NULL,
	[FechaInicio] [datetime] NOT NULL,
	[FechaFinal] [datetime] NOT NULL,
	[CausaDescripcion] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_TiempoParoRefilado] PRIMARY KEY CLUSTERED 
(
	[Pk_TiempoParoRefilado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Torta]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Torta](
	[Pk_Torta] [nvarchar](20) NOT NULL,
	[Descripcion] [nvarchar](20) NOT NULL,
 CONSTRAINT [Pk_Torta] PRIMARY KEY CLUSTERED 
(
	[Pk_Torta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TortaExtrusion]    Script Date: 12/27/2021 9:31:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TortaExtrusion](
	[Pk_TortaExtrusion] [int] IDENTITY(1,1) NOT NULL,
	[Fk_CorridaExtrusion] [int] NOT NULL,
	[Fk_Torta] [nvarchar](20) NOT NULL,
	[Cantidad] [decimal](9, 4) NOT NULL,
 CONSTRAINT [PK_TortaExtrusion] PRIMARY KEY CLUSTERED 
(
	[Pk_TortaExtrusion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ComponenteOrdenProduccion]  WITH CHECK ADD  CONSTRAINT [FK_ComponenteOrdenProduccion_OrdenProduccion] FOREIGN KEY([Fk_OrdenProduccion])
REFERENCES [dbo].[OrdenProduccion] ([Pk_OrdenProduccion])
GO
ALTER TABLE [dbo].[ComponenteOrdenProduccion] CHECK CONSTRAINT [FK_ComponenteOrdenProduccion_OrdenProduccion]
GO
ALTER TABLE [dbo].[ConsumoMPriExtrusion]  WITH CHECK ADD  CONSTRAINT [FK_ConsumoMPriExtrusion_CorridaExtrusion] FOREIGN KEY([Fk_CorridaExtrusion])
REFERENCES [dbo].[CorridaExtrusion] ([Pk_CorridaExtrusion])
GO
ALTER TABLE [dbo].[ConsumoMPriExtrusion] CHECK CONSTRAINT [FK_ConsumoMPriExtrusion_CorridaExtrusion]
GO
ALTER TABLE [dbo].[ConsumoMPriExtrusion]  WITH CHECK ADD  CONSTRAINT [FK_ConsumoMPriExtrusion_MPriExtrusion] FOREIGN KEY([Fk_MPri])
REFERENCES [dbo].[MPriExtrusion] ([Pk_CodigoProducto])
GO
ALTER TABLE [dbo].[ConsumoMPriExtrusion] CHECK CONSTRAINT [FK_ConsumoMPriExtrusion_MPriExtrusion]
GO
ALTER TABLE [dbo].[CorridaExtrusion]  WITH CHECK ADD  CONSTRAINT [FK_CorridaExtrusion_ProcesoOrdenProduccion] FOREIGN KEY([Fk_ProcesoOrdenProduccion])
REFERENCES [dbo].[ProcesoOrdenProduccion] ([Pk_ProcesoOrdenProduccion])
GO
ALTER TABLE [dbo].[CorridaExtrusion] CHECK CONSTRAINT [FK_CorridaExtrusion_ProcesoOrdenProduccion]
GO
ALTER TABLE [dbo].[CorridaImpresion]  WITH CHECK ADD  CONSTRAINT [FK_CorridaImpresion_ProcesoOrdenProduccion] FOREIGN KEY([Fk_ProcesoOrdenProduccion])
REFERENCES [dbo].[ProcesoOrdenProduccion] ([Pk_ProcesoOrdenProduccion])
GO
ALTER TABLE [dbo].[CorridaImpresion] CHECK CONSTRAINT [FK_CorridaImpresion_ProcesoOrdenProduccion]
GO
ALTER TABLE [dbo].[CorridaImpresion]  WITH CHECK ADD  CONSTRAINT [FK_CorridaImpresion_TiempoMontaje] FOREIGN KEY([Fk_TiempoMontaje])
REFERENCES [dbo].[TiempoMontaje] ([Pk_TiempoMontaje])
GO
ALTER TABLE [dbo].[CorridaImpresion] CHECK CONSTRAINT [FK_CorridaImpresion_TiempoMontaje]
GO
ALTER TABLE [dbo].[CorridaRefilado]  WITH CHECK ADD  CONSTRAINT [FK_CorridaRefilado_ProcesoOrdenProduccion] FOREIGN KEY([Fk_ProcesoOrdenProduccion])
REFERENCES [dbo].[ProcesoOrdenProduccion] ([Pk_ProcesoOrdenProduccion])
GO
ALTER TABLE [dbo].[CorridaRefilado] CHECK CONSTRAINT [FK_CorridaRefilado_ProcesoOrdenProduccion]
GO
ALTER TABLE [dbo].[Devolucion]  WITH CHECK ADD  CONSTRAINT [FK_Devolucion_MPriExtrusion] FOREIGN KEY([Fk_MPri])
REFERENCES [dbo].[MPriExtrusion] ([Pk_CodigoProducto])
GO
ALTER TABLE [dbo].[Devolucion] CHECK CONSTRAINT [FK_Devolucion_MPriExtrusion]
GO
ALTER TABLE [dbo].[Devolucion]  WITH CHECK ADD  CONSTRAINT [FK_Devolucion_OrdenProduccion] FOREIGN KEY([Fk_OrdenProduccion])
REFERENCES [dbo].[OrdenProduccion] ([Pk_OrdenProduccion])
GO
ALTER TABLE [dbo].[Devolucion] CHECK CONSTRAINT [FK_Devolucion_OrdenProduccion]
GO
ALTER TABLE [dbo].[EntradaSalidaImpresion]  WITH CHECK ADD  CONSTRAINT [FK_EntradaSalidaImpresion_MaterialEntradaImpresion] FOREIGN KEY([Fk_NoLoteRolloMadre])
REFERENCES [dbo].[MaterialEntradaImpresion] ([Pk_NoLoteRolloMadreImpresion])
GO
ALTER TABLE [dbo].[EntradaSalidaImpresion] CHECK CONSTRAINT [FK_EntradaSalidaImpresion_MaterialEntradaImpresion]
GO
ALTER TABLE [dbo].[EntradaSalidaImpresion]  WITH CHECK ADD  CONSTRAINT [FK_EntradaSalidaImpresion_MaterialSalidaImpresion] FOREIGN KEY([Fk_NoLoteSalida])
REFERENCES [dbo].[MaterialSalidaImpresion] ([PK_NoLoteSalidaImpresion])
GO
ALTER TABLE [dbo].[EntradaSalidaImpresion] CHECK CONSTRAINT [FK_EntradaSalidaImpresion_MaterialSalidaImpresion]
GO
ALTER TABLE [dbo].[EntradaSalidaRefilado]  WITH CHECK ADD  CONSTRAINT [FK_EntradaSalidaRefilado_MaterialEntradaRefilado] FOREIGN KEY([Fk_NoLoteRolloMadreRefilado])
REFERENCES [dbo].[MaterialEntradaRefilado] ([Pk_NoLoteRolloMadreRefilado])
GO
ALTER TABLE [dbo].[EntradaSalidaRefilado] CHECK CONSTRAINT [FK_EntradaSalidaRefilado_MaterialEntradaRefilado]
GO
ALTER TABLE [dbo].[EntradaSalidaRefilado]  WITH CHECK ADD  CONSTRAINT [FK_EntradaSalidaRefilado_MaterialSalidaRefilado] FOREIGN KEY([Fk_NoLoteSalida])
REFERENCES [dbo].[MaterialSalidaRefilado] ([PK_NoLoteSalidaRefilado])
GO
ALTER TABLE [dbo].[EntradaSalidaRefilado] CHECK CONSTRAINT [FK_EntradaSalidaRefilado_MaterialSalidaRefilado]
GO
ALTER TABLE [dbo].[EstadoCorridaExtrusion]  WITH CHECK ADD  CONSTRAINT [FK_EstadoCorridaExtrusion_CorridaExtrusion] FOREIGN KEY([Fk_CorridaExtrusion])
REFERENCES [dbo].[CorridaExtrusion] ([Pk_CorridaExtrusion])
GO
ALTER TABLE [dbo].[EstadoCorridaExtrusion] CHECK CONSTRAINT [FK_EstadoCorridaExtrusion_CorridaExtrusion]
GO
ALTER TABLE [dbo].[EstadoCorridaImpresion]  WITH CHECK ADD  CONSTRAINT [FK_EstadoCorridaImpresion_CorridaImpresion] FOREIGN KEY([Fk_CorridaImpresion])
REFERENCES [dbo].[CorridaImpresion] ([Pk_CorridaImpresion])
GO
ALTER TABLE [dbo].[EstadoCorridaImpresion] CHECK CONSTRAINT [FK_EstadoCorridaImpresion_CorridaImpresion]
GO
ALTER TABLE [dbo].[EstadoOrdenProduccion]  WITH CHECK ADD  CONSTRAINT [FK_EstadoOrdenProduccion_OrdenProduccion] FOREIGN KEY([Fk_OrdenProduccion])
REFERENCES [dbo].[OrdenProduccion] ([Pk_OrdenProduccion])
GO
ALTER TABLE [dbo].[EstadoOrdenProduccion] CHECK CONSTRAINT [FK_EstadoOrdenProduccion_OrdenProduccion]
GO
ALTER TABLE [dbo].[MaterialEntradaImpresion]  WITH CHECK ADD  CONSTRAINT [FK_MaterialEntradaImpresion_CorridaImpresion] FOREIGN KEY([Fk_CorridaImpresion])
REFERENCES [dbo].[CorridaImpresion] ([Pk_CorridaImpresion])
GO
ALTER TABLE [dbo].[MaterialEntradaImpresion] CHECK CONSTRAINT [FK_MaterialEntradaImpresion_CorridaImpresion]
GO
ALTER TABLE [dbo].[MaterialEntradaRefilado]  WITH CHECK ADD  CONSTRAINT [FK_MaterialEntradaRefilado_CorridaRefilado] FOREIGN KEY([Fk_CorridaRefilado])
REFERENCES [dbo].[CorridaRefilado] ([Pk_CorridaRefilado])
GO
ALTER TABLE [dbo].[MaterialEntradaRefilado] CHECK CONSTRAINT [FK_MaterialEntradaRefilado_CorridaRefilado]
GO
ALTER TABLE [dbo].[MaterialSalida]  WITH CHECK ADD  CONSTRAINT [FK_MaterialSalida_CorridaExtrusion] FOREIGN KEY([Fk_CorridaExtrusion])
REFERENCES [dbo].[CorridaExtrusion] ([Pk_CorridaExtrusion])
GO
ALTER TABLE [dbo].[MaterialSalida] CHECK CONSTRAINT [FK_MaterialSalida_CorridaExtrusion]
GO
ALTER TABLE [dbo].[NotaExtrusion]  WITH CHECK ADD  CONSTRAINT [FK_NotaExtrusion_CorridaExtrusion] FOREIGN KEY([Fk_CorridaExtrusion])
REFERENCES [dbo].[CorridaExtrusion] ([Pk_CorridaExtrusion])
GO
ALTER TABLE [dbo].[NotaExtrusion] CHECK CONSTRAINT [FK_NotaExtrusion_CorridaExtrusion]
GO
ALTER TABLE [dbo].[NotaImpresion]  WITH CHECK ADD  CONSTRAINT [FK_NotaImpresion_CorridaImpresion] FOREIGN KEY([Fk_CorridaImpresion])
REFERENCES [dbo].[CorridaImpresion] ([Pk_CorridaImpresion])
GO
ALTER TABLE [dbo].[NotaImpresion] CHECK CONSTRAINT [FK_NotaImpresion_CorridaImpresion]
GO
ALTER TABLE [dbo].[NotaRefilado]  WITH CHECK ADD  CONSTRAINT [FK_NotaRefilado_CorridaRefilado] FOREIGN KEY([Fk_CorridaRefilado])
REFERENCES [dbo].[CorridaRefilado] ([Pk_CorridaRefilado])
GO
ALTER TABLE [dbo].[NotaRefilado] CHECK CONSTRAINT [FK_NotaRefilado_CorridaRefilado]
GO
ALTER TABLE [dbo].[OperarioCorridaExtrusion]  WITH CHECK ADD  CONSTRAINT [FK_OperarioCorridaExtrusion_CorridaExtrusion] FOREIGN KEY([Fk_CorridaExtrusion])
REFERENCES [dbo].[CorridaExtrusion] ([Pk_CorridaExtrusion])
GO
ALTER TABLE [dbo].[OperarioCorridaExtrusion] CHECK CONSTRAINT [FK_OperarioCorridaExtrusion_CorridaExtrusion]
GO
ALTER TABLE [dbo].[OperarioCorridaExtrusion]  WITH CHECK ADD  CONSTRAINT [FK_OperarioCorridaExtrusion_Operario] FOREIGN KEY([Fk_Operario])
REFERENCES [dbo].[Operario] ([Pk_Operario])
GO
ALTER TABLE [dbo].[OperarioCorridaExtrusion] CHECK CONSTRAINT [FK_OperarioCorridaExtrusion_Operario]
GO
ALTER TABLE [dbo].[OperarioCorridaImpresion]  WITH CHECK ADD  CONSTRAINT [FK_OperarioCorridaImpresion_CorridaImpresion] FOREIGN KEY([Fk_CorridaImpresion])
REFERENCES [dbo].[CorridaImpresion] ([Pk_CorridaImpresion])
GO
ALTER TABLE [dbo].[OperarioCorridaImpresion] CHECK CONSTRAINT [FK_OperarioCorridaImpresion_CorridaImpresion]
GO
ALTER TABLE [dbo].[OperarioCorridaImpresion]  WITH CHECK ADD  CONSTRAINT [FK_OperarioCorridaImpresion_Operario] FOREIGN KEY([Fk_Operario])
REFERENCES [dbo].[Operario] ([Pk_Operario])
GO
ALTER TABLE [dbo].[OperarioCorridaImpresion] CHECK CONSTRAINT [FK_OperarioCorridaImpresion_Operario]
GO
ALTER TABLE [dbo].[OperarioCorridaRefilado]  WITH CHECK ADD  CONSTRAINT [FK_OperarioCorridaRefilado_CorridaRefilado] FOREIGN KEY([Fk_CorridaRefilado])
REFERENCES [dbo].[CorridaRefilado] ([Pk_CorridaRefilado])
GO
ALTER TABLE [dbo].[OperarioCorridaRefilado] CHECK CONSTRAINT [FK_OperarioCorridaRefilado_CorridaRefilado]
GO
ALTER TABLE [dbo].[OperarioCorridaRefilado]  WITH CHECK ADD  CONSTRAINT [FK_OperarioCorridaRefilado_Operario] FOREIGN KEY([Fk_Operario])
REFERENCES [dbo].[Operario] ([Pk_Operario])
GO
ALTER TABLE [dbo].[OperarioCorridaRefilado] CHECK CONSTRAINT [FK_OperarioCorridaRefilado_Operario]
GO
ALTER TABLE [dbo].[OperarioMontaje]  WITH CHECK ADD  CONSTRAINT [FK_OperarioMontaje_Operario] FOREIGN KEY([Fk_Operario])
REFERENCES [dbo].[Operario] ([Pk_Operario])
GO
ALTER TABLE [dbo].[OperarioMontaje] CHECK CONSTRAINT [FK_OperarioMontaje_Operario]
GO
ALTER TABLE [dbo].[OperarioMontaje]  WITH CHECK ADD  CONSTRAINT [FK_OperarioMontaje_TiempoMontaje] FOREIGN KEY([Fk_TiempoMontaje])
REFERENCES [dbo].[TiempoMontaje] ([Pk_TiempoMontaje])
GO
ALTER TABLE [dbo].[OperarioMontaje] CHECK CONSTRAINT [FK_OperarioMontaje_TiempoMontaje]
GO
ALTER TABLE [dbo].[ProcesoOrdenProduccion]  WITH CHECK ADD  CONSTRAINT [FK_ProcesoOrdenProduccion_OrdenProduccion] FOREIGN KEY([Fk_OrdenProduccion])
REFERENCES [dbo].[OrdenProduccion] ([Pk_OrdenProduccion])
GO
ALTER TABLE [dbo].[ProcesoOrdenProduccion] CHECK CONSTRAINT [FK_ProcesoOrdenProduccion_OrdenProduccion]
GO
ALTER TABLE [dbo].[Reproceso]  WITH CHECK ADD  CONSTRAINT [FK_Reproseso_CorridaExtrusion] FOREIGN KEY([Fk_CorridaExtrusion])
REFERENCES [dbo].[CorridaExtrusion] ([Pk_CorridaExtrusion])
GO
ALTER TABLE [dbo].[Reproceso] CHECK CONSTRAINT [FK_Reproseso_CorridaExtrusion]
GO
ALTER TABLE [dbo].[RetalExtrusionCantidad]  WITH CHECK ADD  CONSTRAINT [FK_RetalExtrusionCantidad_CorridaExtrusion] FOREIGN KEY([Fk_CorridaExtrusion])
REFERENCES [dbo].[CorridaExtrusion] ([Pk_CorridaExtrusion])
GO
ALTER TABLE [dbo].[RetalExtrusionCantidad] CHECK CONSTRAINT [FK_RetalExtrusionCantidad_CorridaExtrusion]
GO
ALTER TABLE [dbo].[RetalExtrusionCantidad]  WITH CHECK ADD  CONSTRAINT [FK_RetalExtrusionCantidad_RetalExtrusion] FOREIGN KEY([Fk_RetalExtrusion])
REFERENCES [dbo].[RetalExtrusion] ([Pk_RetalExtrusion])
GO
ALTER TABLE [dbo].[RetalExtrusionCantidad] CHECK CONSTRAINT [FK_RetalExtrusionCantidad_RetalExtrusion]
GO
ALTER TABLE [dbo].[RetalImpresionCantidad]  WITH CHECK ADD  CONSTRAINT [FK_RetalImpresionCantidad_CorridaImpresion] FOREIGN KEY([Fk_CorridaImpresion])
REFERENCES [dbo].[CorridaImpresion] ([Pk_CorridaImpresion])
GO
ALTER TABLE [dbo].[RetalImpresionCantidad] CHECK CONSTRAINT [FK_RetalImpresionCantidad_CorridaImpresion]
GO
ALTER TABLE [dbo].[RetalImpresionCantidad]  WITH CHECK ADD  CONSTRAINT [FK_RetalImpresionCantidad_RetalImpresion] FOREIGN KEY([Fk_RetalImpresion])
REFERENCES [dbo].[RetalImpresion] ([Pk_RetalImpresion])
GO
ALTER TABLE [dbo].[RetalImpresionCantidad] CHECK CONSTRAINT [FK_RetalImpresionCantidad_RetalImpresion]
GO
ALTER TABLE [dbo].[RetalRefiladoCantidad]  WITH CHECK ADD  CONSTRAINT [FK_RetalRefiladoCantidad_CorridaRefilado] FOREIGN KEY([Fk_CorridaRefilado])
REFERENCES [dbo].[CorridaRefilado] ([Pk_CorridaRefilado])
GO
ALTER TABLE [dbo].[RetalRefiladoCantidad] CHECK CONSTRAINT [FK_RetalRefiladoCantidad_CorridaRefilado]
GO
ALTER TABLE [dbo].[RetalRefiladoCantidad]  WITH CHECK ADD  CONSTRAINT [FK_RetalRefiladoCantidad_RetalRefilado] FOREIGN KEY([Fk_RetalRefilado])
REFERENCES [dbo].[RetalRefilado] ([Pk_RetalRefilado])
GO
ALTER TABLE [dbo].[RetalRefiladoCantidad] CHECK CONSTRAINT [FK_RetalRefiladoCantidad_RetalRefilado]
GO
ALTER TABLE [dbo].[TiempoParoExtrusion]  WITH CHECK ADD  CONSTRAINT [FK_TiempoParoExtrusion_CorridaExtrusion] FOREIGN KEY([Fk_CorridaExtrusion])
REFERENCES [dbo].[CorridaExtrusion] ([Pk_CorridaExtrusion])
GO
ALTER TABLE [dbo].[TiempoParoExtrusion] CHECK CONSTRAINT [FK_TiempoParoExtrusion_CorridaExtrusion]
GO
ALTER TABLE [dbo].[TiempoParoImpresion]  WITH CHECK ADD  CONSTRAINT [FK_TiempoParoImpresion_CorridaImpresion] FOREIGN KEY([Fk_CorridaImpresion])
REFERENCES [dbo].[CorridaImpresion] ([Pk_CorridaImpresion])
GO
ALTER TABLE [dbo].[TiempoParoImpresion] CHECK CONSTRAINT [FK_TiempoParoImpresion_CorridaImpresion]
GO
ALTER TABLE [dbo].[TiempoParoRefilado]  WITH CHECK ADD  CONSTRAINT [FK_TiempoParoRefilado_CorridaRefilado] FOREIGN KEY([Fk_CorridaRefilado])
REFERENCES [dbo].[CorridaRefilado] ([Pk_CorridaRefilado])
GO
ALTER TABLE [dbo].[TiempoParoRefilado] CHECK CONSTRAINT [FK_TiempoParoRefilado_CorridaRefilado]
GO
ALTER TABLE [dbo].[TortaExtrusion]  WITH CHECK ADD  CONSTRAINT [FK_TortaExtrusion_CorridaExtrusion] FOREIGN KEY([Fk_CorridaExtrusion])
REFERENCES [dbo].[CorridaExtrusion] ([Pk_CorridaExtrusion])
GO
ALTER TABLE [dbo].[TortaExtrusion] CHECK CONSTRAINT [FK_TortaExtrusion_CorridaExtrusion]
GO
ALTER TABLE [dbo].[TortaExtrusion]  WITH CHECK ADD  CONSTRAINT [FK_TortaExtrusion_Torta] FOREIGN KEY([Fk_Torta])
REFERENCES [dbo].[Torta] ([Pk_Torta])
GO
ALTER TABLE [dbo].[TortaExtrusion] CHECK CONSTRAINT [FK_TortaExtrusion_Torta]
GO
USE [master]
GO
ALTER DATABASE [RPColplas2] SET  READ_WRITE 
GO
