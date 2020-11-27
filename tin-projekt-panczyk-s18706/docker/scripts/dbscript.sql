CREATE SCHEMA IF NOT EXISTS `tin-s18706`;

CREATE TABLE IF NOT EXISTS `tin-s18706`.`Visitor`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `firstName` VARCHAR(50) NOT NULL ,
      `lastName` VARCHAR(50) NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `visitor_id_UNIQUE` (`_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-s18706`.`Meal`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `name` VARCHAR(50) NOT NULL ,
      `description` VARCHAR(100) NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `meal_id_UNIQUE` (`_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-s18706`.`Review`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `rate` INT UNSIGNED NOT NULL ,
      `date` DATE NOT NULL ,
      `message` VARCHAR(100) ,
      `visitor_id` INT UNSIGNED NOT NULL ,
      `meal_id` INT UNSIGNED NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `review_id_UNIQUE` (`_id` ASC),
      CONSTRAINT `visitor_fk` FOREIGN KEY (`visitor_id`) REFERENCES `tin-s18706`.`Visitor` (`_id`),
      CONSTRAINT `meal_fk` FOREIGN KEY (`meal_id`) REFERENCES `tin-s18706`.`Meal` (`_id`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin-s18706`.`Visitor` (`_id`, `firstName`, `lastName`) VALUES
  (1, 'Krzysztof', 'Nowak'),
  (2, 'Adam', 'Kowalski'),
  (3, 'Anna', 'Kowalczyk')
;

INSERT IGNORE INTO `tin-s18706`.`Meal` (`_id`, `name`, `description`) VALUES
  (1, 'Pizza Pepperoni', 'Pizza z pepperoni'),
  (2, 'Pizza Margeritta', 'Pizza z serem')
;

INSERT IGNORE INTO `tin-s18706`.`Review` (`_id`, `visitor_id`, `meal_id`, `date`, `rate`, `message`) VALUES
  (1, 1, 1, '2020-10-01', 4, 'Polecam'),
  (2, 2, 1, '2020-11-01', 5, 'Bardzo dobra'),
  (3, 1, 2, '2020-09-02', 5, null)
;