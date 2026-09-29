Syria Online V17 — Admin menu + owner-only protection + login fix

1) The admin shortcut is removed from the storefront header and kept only inside the side menu.
2) /admin.html is protected by Supabase Auth and a database-side owner policy.
3) Only the owner account configured in Supabase can read/change products, categories, orders and customers through the admin panel.
4) Public storefront access and public order creation remain available.
5) Do not put a Supabase service_role key in the website.

6) Fixed the Supabase RPC response handling so admin login correctly reads the boolean returned by is_syria_admin().
7) Fixed the storefront admin-visibility check to use the same RPC response handling.
