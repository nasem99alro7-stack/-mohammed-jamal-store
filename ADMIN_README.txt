Syria Online V15 — Admin menu + owner-only protection

1) The admin shortcut is removed from the storefront header and kept only inside the side menu.
2) /admin.html is protected by Supabase Auth and a database-side owner policy.
3) Only the owner account configured in Supabase can read/change products, categories, orders and customers through the admin panel.
4) Public storefront access and public order creation remain available.
5) Do not put a Supabase service_role key in the website.
