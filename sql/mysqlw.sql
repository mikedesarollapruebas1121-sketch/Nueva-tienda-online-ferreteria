-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ferresasweb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ferresasweb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ferresasweb` DEFAULT CHARACTER SET utf8 ;
USE `ferresasweb` ;

-- -----------------------------------------------------
-- Table `ferresasweb`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ferresasweb`.`usuarios` (
  `idusuarios` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(120) NOT NULL,
  `contrasenal` VARCHAR(245) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idusuarios`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ferresasweb`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ferresasweb`.`clientes` (
  `idclientes` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `documento` VARCHAR(30) NOT NULL,
  `telefono` VARCHAR(20) NULL,
  PRIMARY KEY (`idclientes`),
  UNIQUE INDEX `documento_UNIQUE` (`documento` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ferresasweb`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ferresasweb`.`categorias` (
  `idcategorias` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcategorias`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ferresasweb`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ferresasweb`.`productos` (
  `idproductos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(125) NOT NULL,
  `descripcion` TEXT(120) NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `stock` INT NOT NULL,
  `categorias_idcategorias` INT NOT NULL,
  PRIMARY KEY (`idproductos`),
  INDEX `fk_productos_categorias_idx` (`categorias_idcategorias` ASC) VISIBLE,
  CONSTRAINT `fk_productos_categorias`
    FOREIGN KEY (`categorias_idcategorias`)
    REFERENCES `ferresasweb`.`categorias` (`idcategorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ferresasweb`.`facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ferresasweb`.`facturas` (
  `idfacturas` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `usuarios_idusuarios` INT NOT NULL,
  `clientes_idclientes` INT NOT NULL,
  PRIMARY KEY (`idfacturas`),
  INDEX `fk_facturas_usuarios1_idx` (`usuarios_idusuarios` ASC) VISIBLE,
  INDEX `fk_facturas_clientes1_idx` (`clientes_idclientes` ASC) VISIBLE,
  CONSTRAINT `fk_facturas_usuarios1`
    FOREIGN KEY (`usuarios_idusuarios`)
    REFERENCES `ferresasweb`.`usuarios` (`idusuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_facturas_clientes1`
    FOREIGN KEY (`clientes_idclientes`)
    REFERENCES `ferresasweb`.`clientes` (`idclientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ferresasweb`.`detalle_factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ferresasweb`.`detalle_factura` (
  `iddetalle_factura` INT NOT NULL AUTO_INCREMENT,
  `cantidad` INT NOT NULL,
  `productos_idproductos` INT NOT NULL,
  `facturas_idfacturas` INT NOT NULL,
  `precio_unitario` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`iddetalle_factura`),
  INDEX `fk_detalle_factura_productos1_idx` (`productos_idproductos` ASC) VISIBLE,
  INDEX `fk_detalle_factura_facturas1_idx` (`facturas_idfacturas` ASC) VISIBLE,
  CONSTRAINT `fk_detalle_factura_productos1`
    FOREIGN KEY (`productos_idproductos`)
    REFERENCES `ferresasweb`.`productos` (`idproductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_factura_facturas1`
    FOREIGN KEY (`facturas_idfacturas`)
    REFERENCES `ferresasweb`.`facturas` (`idfacturas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
