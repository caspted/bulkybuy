-- This is an empty migration.
INSERT INTO "User" (name, email, password, date_registered) VALUES 
('newuser', 'test@email.com', '$2b$10$2KqqW887/4kFa1gbxKR4C.jGrGk1djvJz6HFkMwgAc.y4eWdXYp66', NOW());