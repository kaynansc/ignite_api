import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `
    INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXX')
  `
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));
