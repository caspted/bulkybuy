-- This is an empty migration.
-- Insert a new user and their product with an auction and a bid
WITH inserted_user AS (
  INSERT INTO "User" (name, email, password, date_registered) 
  VALUES ('person', 'person@email.com', '$2b$10$2KqqW887/4kFa1gbxKR4C.jGrGk1djvJz6HFkMwgAc.y4eWdXYp66', NOW())
  RETURNING id AS user_id, name, email, password, date_registered
), inserted_product AS (
  INSERT INTO "Product" (name, description, image_url, listed_at, category, "sellerId") 
  SELECT 'Burger', 'it is delicious', '', NOW(), 'food', user_id
  FROM inserted_user
  RETURNING id AS product_id, "sellerId"
)
INSERT INTO "Auction" (date_started, date_ends, minimum_bid, "productId", "sellerId")
SELECT NOW(), NOW() + INTERVAL '7 days', 100.00, product_id, "sellerId"
FROM inserted_product;
