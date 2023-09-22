USE [EasyEating]
GO
/****** Object:  User [alumno]    Script Date: 22/9/2023 12:05:03 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [EasyEating]    Script Date: 22/9/2023 12:05:03 ******/
CREATE USER [EasyEating] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [usuario]    Script Date: 22/9/2023 12:05:03 ******/
CREATE USER [usuario] FOR LOGIN [usuario] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [EasyEating]
GO
ALTER ROLE [db_owner] ADD MEMBER [usuario]
GO
/****** Object:  Table [dbo].[Limitacion]    Script Date: 22/9/2023 12:05:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Limitacion](
	[idLimitacion] [int] NOT NULL,
	[limitacion] [varchar](max) NULL,
 CONSTRAINT [PK_Limitacion] PRIMARY KEY CLUSTERED 
(
	[idLimitacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LimitacionXProducto]    Script Date: 22/9/2023 12:05:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LimitacionXProducto](
	[idLimitacionXProducto] [int] IDENTITY(1,1) NOT NULL,
	[idProducto] [int] NOT NULL,
	[idLimitacion] [int] NOT NULL,
 CONSTRAINT [PK_LimitacionXProducto] PRIMARY KEY CLUSTERED 
(
	[idLimitacionXProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LimitacionXRestaurante]    Script Date: 22/9/2023 12:05:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LimitacionXRestaurante](
	[idLimitacionXRestaurante] [int] NOT NULL,
	[idRestaurante] [int] NOT NULL,
	[idLimitacion] [int] NOT NULL,
 CONSTRAINT [PK_LimitacionXRestaurante] PRIMARY KEY CLUSTERED 
(
	[idLimitacionXRestaurante] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Producto]    Script Date: 22/9/2023 12:05:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producto](
	[idProducto] [int] IDENTITY(1,1) NOT NULL,
	[barCode] [varchar](50) NOT NULL,
	[nombre] [varchar](50) NULL,
	[proteinas] [float] NULL,
	[carbohidratos] [float] NULL,
	[grasas] [float] NULL,
	[grasasSaturadas] [float] NULL,
	[calorias] [int] NULL,
 CONSTRAINT [PK_Producto] PRIMARY KEY CLUSTERED 
(
	[idProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Restaurante]    Script Date: 22/9/2023 12:05:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Restaurante](
	[idRestaurante] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](max) NULL,
	[direccion] [varchar](max) NULL,
	[latitud] [varchar](max) NULL,
	[longitud] [varchar](max) NULL,
	[horario] [varchar](max) NULL,
	[telefono] [int] NULL,
 CONSTRAINT [PK_Restaurante] PRIMARY KEY CLUSTERED 
(
	[idRestaurante] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 22/9/2023 12:05:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[apellido] [varchar](50) NULL,
	[correo] [varchar](50) NULL,
	[contrasena] [varchar](50) NULL,
	[idLimitacion] [int] NOT NULL,
	[Token] [varchar](64) NULL,
	[TokenExpirationDate] [datetime] NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Limitacion] ([idLimitacion], [limitacion]) VALUES (1, N'Celiaquia')
INSERT [dbo].[Limitacion] ([idLimitacion], [limitacion]) VALUES (2, N'Diabetes')
INSERT [dbo].[Limitacion] ([idLimitacion], [limitacion]) VALUES (3, N'Intolerancia a la lactosa')
GO
SET IDENTITY_INSERT [dbo].[LimitacionXProducto] ON 

INSERT [dbo].[LimitacionXProducto] ([idLimitacionXProducto], [idProducto], [idLimitacion]) VALUES (1, 4, 2)
SET IDENTITY_INSERT [dbo].[LimitacionXProducto] OFF
GO
SET IDENTITY_INSERT [dbo].[Producto] ON 

INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [grasasSaturadas], [calorias]) VALUES (1, N'7792170000647 ', N'Avena Instantanea - Quaker', 13, 56, 7.9, 1.5, 347)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [grasasSaturadas], [calorias]) VALUES (2, N'3017620425035', N'Nutella - Ferrero', 6.3, 57.5, 30.9, 1.5, 2252)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [grasasSaturadas], [calorias]) VALUES (3, N'5411188103387', N'Vanilla - Alpro', 3.7, 7.5, 2.2, 1.5, 280)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [grasasSaturadas], [calorias]) VALUES (4, N'3045140105502', N'Alpine Milk - Milka,Mondelez', 6.5, 57, 31, 1.5, 2251)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [grasasSaturadas], [calorias]) VALUES (5, N'5449000054227', N'Coca-Cola - Coca-Cola,The Coca-Cola Company', 0, 11.2, 0, 1.5, 190)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [grasasSaturadas], [calorias]) VALUES (6, N'8412600012185', N'Pan de molde grande - Bimbo', 9.8, 45, 2.7, 1.5, 1065)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [grasasSaturadas], [calorias]) VALUES (7, N'7791866001364', N'Mayonesa - Natura', 0, 0.9, 3.7, 1.5, 38)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [grasasSaturadas], [calorias]) VALUES (8, N'7790045824893', N'Frutigran chips de chocolate - Granix,Frutigran', 9.6, 65, 17, 1.5, 1890)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [grasasSaturadas], [calorias]) VALUES (9, N'75032715', N'Corona Extra - Corona', NULL, NULL, NULL, 1.5, 176)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [grasasSaturadas], [calorias]) VALUES (10, N'7790580660000', N'Presto Pronta - Presto Pronta,Arcor', 7, 78, 0.8, 1.5, 1420)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [grasasSaturadas], [calorias]) VALUES (15, N'7790742373304', N'Finlandia Light - La Serenísima', 9, 3.8, 16, 1.5, 804)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [grasasSaturadas], [calorias]) VALUES (16, N'7790070418203', N'Alfajor de Arroz - Molinos Rio de La Plata', 5, 55, 23, 1.5, 450)
SET IDENTITY_INSERT [dbo].[Producto] OFF
GO
SET IDENTITY_INSERT [dbo].[Restaurante] ON 

INSERT [dbo].[Restaurante] ([idRestaurante], [nombre], [direccion], [latitud], [longitud], [horario], [telefono]) VALUES (1, N'Green Deli', N'Av. Díaz Vélez 4501', N'-34.60853837294786', N'-58.4306551602909', N'11:00–15:00, 19:00–21:30', 0)
INSERT [dbo].[Restaurante] ([idRestaurante], [nombre], [direccion], [latitud], [longitud], [horario], [telefono]) VALUES (2, N'Cocelia Caballito', N'Av. Acoyte 449', N'-34.61335019300495', N'-58.43798387809736', N'10:00–19:00', 1149028018)
INSERT [dbo].[Restaurante] ([idRestaurante], [nombre], [direccion], [latitud], [longitud], [horario], [telefono]) VALUES (3, N'Los Orientales', N'Av. Rivadavia 3981', N'-34.61172463990566', N'-58.422167399999985', N'09-00', 1149831202)
INSERT [dbo].[Restaurante] ([idRestaurante], [nombre], [direccion], [latitud], [longitud], [horario], [telefono]) VALUES (5, N'Gra Hu', N'Río de Janeiro 320', N'-34.611538672314765', N'-58.4303597451144', N'10:30–15:00, 19:00–22:30', 0)
SET IDENTITY_INSERT [dbo].[Restaurante] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([idUsuario], [nombre], [apellido], [correo], [contrasena], [idLimitacion], [Token], [TokenExpirationDate]) VALUES (3, N'Martin', N'Israel', N'marto@gmail.com', N'1234', 1, NULL, NULL)
INSERT [dbo].[Usuario] ([idUsuario], [nombre], [apellido], [correo], [contrasena], [idLimitacion], [Token], [TokenExpirationDate]) VALUES (4, N'Santi', N'Pasqui', N'pasqui@gmail.com', N'4321', 2, N'', NULL)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[LimitacionXProducto]  WITH CHECK ADD  CONSTRAINT [FK_LimitacionXProducto_Limitacion] FOREIGN KEY([idLimitacion])
REFERENCES [dbo].[Limitacion] ([idLimitacion])
GO
ALTER TABLE [dbo].[LimitacionXProducto] CHECK CONSTRAINT [FK_LimitacionXProducto_Limitacion]
GO
ALTER TABLE [dbo].[LimitacionXProducto]  WITH CHECK ADD  CONSTRAINT [FK_LimitacionXProducto_Producto] FOREIGN KEY([idProducto])
REFERENCES [dbo].[Producto] ([idProducto])
GO
ALTER TABLE [dbo].[LimitacionXProducto] CHECK CONSTRAINT [FK_LimitacionXProducto_Producto]
GO
ALTER TABLE [dbo].[LimitacionXRestaurante]  WITH CHECK ADD  CONSTRAINT [FK_LimitacionXRestaurante_Limitacion1] FOREIGN KEY([idLimitacion])
REFERENCES [dbo].[Limitacion] ([idLimitacion])
GO
ALTER TABLE [dbo].[LimitacionXRestaurante] CHECK CONSTRAINT [FK_LimitacionXRestaurante_Limitacion1]
GO
ALTER TABLE [dbo].[LimitacionXRestaurante]  WITH CHECK ADD  CONSTRAINT [FK_LimitacionXRestaurante_Restaurante1] FOREIGN KEY([idRestaurante])
REFERENCES [dbo].[Restaurante] ([idRestaurante])
GO
ALTER TABLE [dbo].[LimitacionXRestaurante] CHECK CONSTRAINT [FK_LimitacionXRestaurante_Restaurante1]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Limitacion] FOREIGN KEY([idLimitacion])
REFERENCES [dbo].[Limitacion] ([idLimitacion])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_Limitacion]
GO
