create table pet
(
    id               identity primary key,
    microchip_number varchar(20) unique,
    name             varchar(255) not null,
    specie           varchar(20)  not null,
    birthdate        date
);
