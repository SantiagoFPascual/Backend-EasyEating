USE [db_aa05c5_easyeating]
GO
/****** Object:  User [alumno]    Script Date: 27/10/2023 11:18:29 ******/
CREATE USER [alumno] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [db_aa05c5_easyeating_admin]    Script Date: 27/10/2023 11:18:29 ******/
CREATE USER [db_aa05c5_easyeating_admin] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [EasyEating]    Script Date: 27/10/2023 11:18:29 ******/
CREATE USER [EasyEating] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [db_aa05c5_easyeating_admin]
GO
ALTER ROLE [db_owner] ADD MEMBER [EasyEating]
GO
/****** Object:  Table [dbo].[Limitacion]    Script Date: 27/10/2023 11:18:30 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LimitacionXProducto]    Script Date: 27/10/2023 11:18:31 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LimitacionXRestaurante]    Script Date: 27/10/2023 11:18:31 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Producto]    Script Date: 27/10/2023 11:18:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producto](
	[idProducto] [int] IDENTITY(1,1) NOT NULL,
	[barCode] [varchar](max) NOT NULL,
	[nombre] [varchar](max) NULL,
	[proteinas] [float] NULL,
	[carbohidratos] [float] NULL,
	[grasas] [float] NULL,
	[calorias] [int] NULL,
 CONSTRAINT [PK_Producto] PRIMARY KEY CLUSTERED 
(
	[idProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Restaurante]    Script Date: 27/10/2023 11:18:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Restaurante](
	[idRestaurante] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](max) NULL,
	[direccion] [varchar](max) NULL,
	[latitud] [float] NULL,
	[longitud] [float] NULL,
	[horario] [varchar](max) NULL,
	[telefono] [int] NULL,
 CONSTRAINT [PK_Restaurante] PRIMARY KEY CLUSTERED 
(
	[idRestaurante] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 27/10/2023 11:18:31 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Limitacion] ([idLimitacion], [limitacion]) VALUES (1, N'Celiaquia')
INSERT [dbo].[Limitacion] ([idLimitacion], [limitacion]) VALUES (2, N'Diabetes')
INSERT [dbo].[Limitacion] ([idLimitacion], [limitacion]) VALUES (3, N'Intolerancia a la lactosa')
GO
SET IDENTITY_INSERT [dbo].[LimitacionXProducto] ON 

INSERT [dbo].[LimitacionXProducto] ([idLimitacionXProducto], [idProducto], [idLimitacion]) VALUES (4, 31, 1)
INSERT [dbo].[LimitacionXProducto] ([idLimitacionXProducto], [idProducto], [idLimitacion]) VALUES (5, 32, 1)
INSERT [dbo].[LimitacionXProducto] ([idLimitacionXProducto], [idProducto], [idLimitacion]) VALUES (6, 32, 2)
SET IDENTITY_INSERT [dbo].[LimitacionXProducto] OFF
GO
SET IDENTITY_INSERT [dbo].[Producto] ON 

INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (1, N'7792170000647 ', N'Avena Instantanea - Quaker', 13, 56, 7.9, 347)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (2, N'3017620425035', N'Nutella - Ferrero', 6.3, 57.5, 30.9, 2252)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (3, N'5411188103387', N'Vanilla - Alpro', 3.7, 7.5, 2.2, 280)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (4, N'3045140105502', N'Alpine Milk - Milka,Mondelez', 6.5, 57, 31, 2251)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (5, N'5449000054227', N'Coca-Cola - Coca-Cola,The Coca-Cola Company', 0, 11.2, 0, 190)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (6, N'8412600012185', N'Pan de molde grande - Bimbo', 9.8, 45, 2.7, 1065)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (7, N'7791866001364', N'Mayonesa - Natura', 0, 0.9, 3.7, 38)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (8, N'7790045824893', N'Frutigran chips de chocolate - Granix,Frutigran', 9.6, 65, 17, 1890)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (9, N'75032715', N'Corona Extra - Corona', NULL, NULL, NULL, 176)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (10, N'7790580660000', N'Presto Pronta - Presto Pronta,Arcor', 7, 78, 0.8, 1420)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (15, N'7790742373304', N'Finlandia Light - La Serenísima', 9, 3.8, 16, 804)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (16, N'7790070418203', N'Alfajor de Arroz - Molinos Rio de La Plata', 5, 55, 23, 450)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (21, N'7791337003378', N'Casancrem Light - La Serenísima', 8.67, 7.67, 7, 163)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (22, N'7790040133495', N'Macucas - Arcor', 6.5, 66, 21, 2051)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (23, N'7791337004191', N'Yogur sabor natural - Ser Natur,Ser', 6.5, 7.5, 0.6, 514)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (24, N'7790070416179', N'Gallo Oro PACK AHORRO - Gallo', 7, 76, 0, 697)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (25, N'78600027', N'tic tac naranja - Tic Tac', NULL, NULL, NULL, NULL)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (26, N'7790080031867', N'Dulce de Leche - SanCor', 6, 55, 6.5, 256)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (27, N'7790580421007', N'Rocklets - arcor', 5.1, 70, 19, 477)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (28, N'7790199000013', N'Harina de trigo 000 - morixe', 10, 70, 1, 332)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (30, N'7790045823445', N'Cereal semillas de trigo partido - Granix', 10, 73.3, 11.7, 519)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (31, N'7794820014608', N'Dulce de leche clásico - Milkout', 6.5, 60, 6.5, 65)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (32, N'7791875000020', N'Havanna Luxury Alfajores Mixed Chocolate / Snow X - Havanna', 6.4, 58, 13, 375)
INSERT [dbo].[Producto] ([idProducto], [barCode], [nombre], [proteinas], [carbohidratos], [grasas], [calorias]) VALUES (33, N'8480017006080', N'Leche entera de vaca DIA - Dia', 3.1, 4.6, 3.6, 264)
SET IDENTITY_INSERT [dbo].[Producto] OFF
GO
SET IDENTITY_INSERT [dbo].[Restaurante] ON 

INSERT [dbo].[Restaurante] ([idRestaurante], [nombre], [direccion], [latitud], [longitud], [horario], [telefono]) VALUES (1, N'Green Deli', N'Av. Díaz Vélez 4501', -34.608538372947862, -58.4306551602909, N'11:00–15:00, 19:00–21:30', 0)
INSERT [dbo].[Restaurante] ([idRestaurante], [nombre], [direccion], [latitud], [longitud], [horario], [telefono]) VALUES (2, N'Cocelia Caballito', N'Av. Acoyte 449', -34.613350193004948, -58.437983878097363, N'10:00–19:00', 1149028018)
INSERT [dbo].[Restaurante] ([idRestaurante], [nombre], [direccion], [latitud], [longitud], [horario], [telefono]) VALUES (3, N'Los Orientales', N'Av. Rivadavia 3981', -34.61172463990566, -58.422167399999985, N'09-00', 1149831202)
INSERT [dbo].[Restaurante] ([idRestaurante], [nombre], [direccion], [latitud], [longitud], [horario], [telefono]) VALUES (5, N'Gra Hu', N'Río de Janeiro 320', -34.611538672314765, -58.4303597451144, N'10:30–15:00, 19:00–22:30', 0)
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
