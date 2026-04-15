--USERS TABLE DATA INSERTION
INSERT INTO users (email, user_password)values ('anna@hyf.dk','mypassword');
INSERT INTO users (email, user_password)values ('test_honey@gmail.com','testHoney@123');
insert into users(email,user_password) values('test@gmail.com','tester@8989');
--EVENTS TABLE DATA INSERTION
INSERT INTO events (title, description, event_location, event_date, price, available_tickets)
VALUES
('Rock Music Concert', 'Live music event', 'Royal Arena Copenhagen', '2026-06-01 20:00', 150.00, 100),
('Tech Conference', 'Tech talks and networking', 'Bella Center', '2026-07-15 09:00', 120.00, 200),
('Telugu Stand-up Comedy', 'Comedy night', 'Herlev Bio Theatre', '2026-10-10 19:00', 30.00, 50);
INSERT INTO events (title, description, event_location, event_date, price, available_tickets)
VALUES('ITDAY Copenhagen','IT DAY','DGI Byen','2027-03-09 10:00',0.00,200);

select * from events where id=4;
SELECT * FROM users;
