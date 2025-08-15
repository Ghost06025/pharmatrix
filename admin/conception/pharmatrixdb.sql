drop database if exists pharmatrixdb;
create database pharmatrixdb;
use pharmatrixdb;

create table users (
    users_id int not null auto_increment,
    first_name varchar(128),
    last_name varchar(128),
    phone varchar(128),
    `location` varchar(128),
    email varchar(128),
    `password` varchar(128),
    `role` varchar(128),
    photo text,
    primary key(users_id)
);

insert into users (first_name, last_name, phone, `location`, email, `password`, `role`, photo)
values
('admin', 'admin', '693909121', 'PK13', 'admin@yahoo.com', 'admin', 'Administrateur', null);



create table pharmacie (
    pharmacie_id int not null auto_increment,
    name varchar(128),
    `location` text,
    phone varchar(128),
    primary key(pharmacie_id)
);

create table all_medicament (
    all_medicament_id int not null auto_increment,
    name varchar(128),
    `description` text,
    photo text,
    primary key(all_medicament_id)
);

create table medicament (
    medicament_id int not null auto_increment,
    all_medicament_id int not null,
    pharmacie_id int not null,
    price real,
    quantite int,
    primary key(medicament_id),
    foreign key(all_medicament_id) references all_medicament(all_medicament_id),
    foreign key(pharmacie_id) references pharmacie(pharmacie_id)
);

create table coupon (
    coupon_id int not null auto_increment,
    users_id int not null,
    reference varchar(128) unique,
    create_at date,
    primary key(coupon_id),
    foreign key(users_id) references users(users_id)
);

create table users_pharmacie (
    users_id int not null,
    pharmacie_id int not null,
    primary key(users_id, pharmacie_id),
    foreign key(users_id) references users(users_id),
    foreign key(pharmacie_id) references pharmacie(pharmacie_id)
);

create table coupon_medicament (
    coupon_id int not null,
    medicament_id int not null,
    primary key(coupon_id, medicament_id),
    foreign key(coupon_id) references coupon(coupon_id),
    foreign key(medicament_id) references medicament(medicament_id)
);