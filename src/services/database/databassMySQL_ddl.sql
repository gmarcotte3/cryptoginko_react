create database cyberginko;


create table addresspublic (
  address varchar(255) not null,
  currency varchar(20) not null,
  walletname varchar(30) not null,
  coinbalance float(24) default 0.0,
  memo varchar(255),
  lastupdate timestamp,
  primary key (address,currency)
  );

create table currentprice (
  currency varchar(20) not null,
  jpy float(24) default 0.0,
  usd float(24) default 0.0,
  nzd float(24) default 0.0,
  gbp float(24) default 0.0,
  eur float(24) default 0.0,
  aud float(24) default 0.0,
  lastupdate timestamp,
  primary key (currency)
);