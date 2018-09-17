CREATE DATABASE KidReads_DB;
USE KidReads_DB;

CREATE TABLE LibraryBooks (
  BookId INT NOT NULL AUTO_INCREMENT,
  ISBN VARCHAR(50) NOT NULL,
  Title VARCHAR(75) NOT NULL,
  Author VARCHAR(40) NULL,
  Description TEXT NULL,
  Available BOOLEAN NULL,
  PageCount INT NULL,
  CoverImageFilePath VARCHAR(200) NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW() NOT NULL,

  PRIMARY KEY (BookId),
  UNIQUE (ISBN)
);

CREATE TABLE LibraryBooks_Setup (
    BookId INT NOT NULL AUTO_INCREMENT,
    ISBN VARCHAR(50) NOT NULL,
    PageNumber VARCHAR(4) NULL,
    PageText TEXT NULL,
    PageFont VARCHAR(50) NULL,
    PageFontColor VARCHAR(50) NULL,
    PageFontSize VARCHAR(3) NULL,
    PageImageFilePath VARCHAR(200),
    PageAudioFilePath VARCHAR(200),
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW() NULL,

    PRIMARY KEY (BookId),
    FOREIGN KEY fk_LBS_ISBN(ISBN)
    REFERENCES LibraryBooks(ISBN)
    ON DELETE RESTRICT
);

CREATE TABLE ParentUsers (
    ParentId INT NOT NULL AUTO_INCREMENT,
    Email VARCHAR(50) NOT NULL,
    Username VARCHAR(20) NULL,
    Password VARCHAR(64) NOT NULL,
    About TEXT NULL,
    FirstName VARCHAR(25) NULL,
    LastName VARCHAR(25) NULL,
    AddressStreet1 VARCHAR(50) NULL,
    AddressStreet2 VARCHAR(50) NULL,
    AddressCity VARCHAR(25) NULL,
    AddressState VARCHAR(2) NULL,
    AddressZip VARCHAR(10) NULL,
    Status ENUM('active', 'inactive') DEFAULT 'active',
    Last_Login DATETIME NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW() NULL,

    PRIMARY KEY (ParentId)
);

CREATE TABLE ChildUsers (
    ChildId INT NOT NULL AUTO_INCREMENT,
    ParentId INT NOT NULL,
    FirstName VARCHAR(25) NULL,
    LastName VARCHAR(25) NULL,
    Birthday DATE NULL,
    FavoriteAnimal VARCHAR(35) NULL,
    SiteTheme VARCHAR(25) NULL,
    LastSignOn DATETIME NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW() NULL,

    PRIMARY KEY (ChildId)
);

ALTER TABLE ChildUsers
    ADD FOREIGN KEY fk_CU_parentId(ParentId)
    REFERENCES ParentUsers(ParentId)
    ON UPDATE CASCADE
    ON DELETE RESTRICT;

DELIMITER #
CREATE TRIGGER populateChildBooks AFTER INSERT ON ChildUsers
FOR EACH ROW
BEGIN
  INSERT INTO ChildBooks (ISBN, ChildId)
  SELECT P.ISBN, C.ChildId
  FROM ChildUsers C JOIN
	   ParentBooks P ON P.ParentId = C.ParentId
  WHERE C.ChildId = NEW.ChildId;
END#

CREATE TABLE ParentBooks (
    BookId INT NOT NULL AUTO_INCREMENT,
    ISBN VARCHAR(50) NOT NULL,
    ParentId INT NOT NULL,
    LastAccessed DATETIME,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW() NULL,

    PRIMARY KEY (BookId),
    FOREIGN KEY fk_PB_ISBN(ISBN)
    REFERENCES LibraryBooks(ISBN)
    ON DELETE RESTRICT,
    FOREIGN KEY fk_PB_parentId(ParentId)
    REFERENCES ParentUsers(ParentId)
    ON DELETE RESTRICT
);

CREATE TABLE ChildBooks (
    BookId INT NOT NULL AUTO_INCREMENT,
    ISBN VARCHAR(50) NOT NULL,
    ChildId INT NOT NULL,
    LastAccessed DATETIME NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW() NULL,

    PRIMARY KEY (BookId),
    FOREIGN KEY fk_CB_ISBN(ISBN)
    REFERENCES LibraryBooks(ISBN)
    ON DELETE RESTRICT,
    FOREIGN KEY fk_CB_childId(ChildId)
    REFERENCES ChildUsers(ChildId)
    ON DELETE RESTRICT
);