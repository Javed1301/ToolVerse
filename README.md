## setup Daisy ui
-add the import daisyui in global.css --> according to the docs .

## setup the clerk
1. Wrap up the clerk provider in the layout.
2. define an array of public route.
3. coustomise your access to the public and protected route.
## setup the Prisma and neondb 
-add or import the dotenv in the prisma.config.ts
-setup the DATABASE_URL (connection string) from neonDb.
-run --> npx prisma migrate dev --name init
-after successfull syncing with Db
-run-->npm install @prisma/client
-keep in mind i am using one older version of prisma (
    npm install prisma@6.19.0 @prisma/client@6.19.0 --force
).

## Problem during The Prisma Connection (connection string).
1. always create new DB.
2. toggle the pooler option to off in neondb connect option in the project.
Sure — short, direct, technical points for README:

---

### **Issues Faced & Fixes**

* Prisma Client runtime files were missing because it was previously generated in a custom output folder.
* Prisma CLI and `@prisma/client` versions were mismatched (6.x vs 7.x), causing engine load failures.
* Old corrupted builds inside `.next` caused repeated runtime crashes.
* Clerk authentication redirected Postman requests to a sign-in page, returning HTML instead of JSON.
* Postman did not specify JSON headers, so Next.js returned SSR HTML.

### **Resolutions**

* Removed custom Prisma Client output and regenerated to the default `node_modules/@prisma/client`.
* Aligned versions: installed `prisma@6.19.0` and `@prisma/client@6.19.0`.
* Deleted `.next` and corrupted Prisma files, then performed a clean install and `prisma generate`.
* Temporarily disabled auth for testing and added `Accept: application/json` header in Postman.

---

