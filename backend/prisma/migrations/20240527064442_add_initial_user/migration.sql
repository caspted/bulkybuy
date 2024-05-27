WITH inserted_user AS (
  INSERT INTO "User" (name, email, password, date_registered) 
  VALUES ('newuser', 'test@email.com', '$2b$10$2KqqW887/4kFa1gbxKR4C.jGrGk1djvJz6HFkMwgAc.y4eWdXYp66', NOW())
  RETURNING id AS user_id, name, email, password, date_registered
)
INSERT INTO "Product" (name, description, image_url, listed_at, category, "sellerId") 
  SELECT 'Burger', 'it is delicious', '', NOW(), 'food', user_id
  FROM inserted_user